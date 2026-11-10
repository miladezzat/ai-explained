// Builds the site in dist/ from the articles in content/*.md.
//   node build.mjs          build dist/
//   node build.mjs check    check every article, build nothing
// Each article is markdown with a front matter block (see README.md). Pages go to dist/<slug>/index.html,
// so links look like https://ai.miladezzat.com/<slug>/.
import {cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {marked} from 'marked';

const here = dirname(fileURLToPath(import.meta.url));
const site = JSON.parse(readFileSync(join(here, 'site.json'), 'utf8'));
const out = join(here, 'dist');
const checkOnly = process.argv[2] === 'check';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const SERIES = site.series;

// Front matter: "key: value" lines between --- markers. Lists are comma separated.
function parse(file) {
	const raw = readFileSync(file, 'utf8');
	const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!m) throw new Error(`${file}: missing front matter`);
	const data = {};
	for (const line of m[1].split('\n')) {
		const i = line.indexOf(':');
		if (i < 0 || !line.trim()) continue;
		data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, '$1');
	}
	data.tags = (data.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean);
	data.episode = data.episode ? Number(data.episode) : null;
	data.body = m[2].trim();
	data.file = file;
	return data;
}

function check(a) {
	const errs = [];
	for (const k of ['title', 'slug', 'description', 'date', 'series', 'youtube']) if (!a[k]) errs.push(`missing ${k}`);
	if (a.slug && !/^[a-z0-9-]+$/.test(a.slug)) errs.push('slug must be lowercase letters, digits and dashes');
	if (a.youtube && !/^[A-Za-z0-9_-]{11}$/.test(a.youtube)) errs.push(`youtube must be the 11-character video id, got "${a.youtube}"`);
	if (a.series && !SERIES[a.series]) errs.push(`unknown series ${a.series}`);
	if (a.date && !/^\d{4}-\d{2}-\d{2}$/.test(a.date)) errs.push('date must be YYYY-MM-DD');
	if (a.description && a.description.length > 200) errs.push(`description is ${a.description.length} chars, keep it under 200`);
	if (a.series === 'mcp-a-to-z' && !a.episode) errs.push('MCP episodes need episode: NN');
	if (!/^## Sources/m.test(a.body)) errs.push('add a "## Sources" section');
	if (a.body.split(/\s+/).length < 250) errs.push('article is under 250 words');
	return errs.map((e) => `${a.file.replace(here + '/', '')}: ${e}`);
}

const dir = join(here, 'content');
const articles = readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => parse(join(dir, f)));
const errors = articles.flatMap(check);
const slugs = new Set();
for (const a of articles) {
	if (slugs.has(a.slug)) errors.push(`duplicate slug ${a.slug}`);
	slugs.add(a.slug);
}
if (errors.length) {
	console.error(errors.join('\n'));
	process.exit(1);
}
// Newest first; same-day posts by series order then title.
articles.sort((a, b) => b.date.localeCompare(a.date) || (b.order ?? 0) - (a.order ?? 0) || a.title.localeCompare(b.title));
if (checkOnly) {
	console.log(`${articles.length} articles OK`);
	process.exit(0);
}

const words = (md) => md.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
const minutes = (md) => Math.max(1, Math.round(words(md) / 220));
const fmtDate = (d) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'});
const url = (path = '') => `${site.url}/${path}`;
const thumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const pad = (n) => String(n).padStart(2, '0');

marked.use({gfm: true});
// External links open in a new tab; headings get ids for the contents list.
const slugify = (t) => t.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
marked.use({
	renderer: {
		link({href, title, tokens}) {
			const text = this.parser.parseInline(tokens);
			const ext = /^https?:/.test(href) && !href.startsWith(site.url);
			return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
		},
		heading({tokens, depth, text}) {
			return `<h${depth} id="${slugify(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
		},
	},
});

const icon = {
	youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9l5.8 3.1-5.8 3.1Z"/></svg>',
	facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z"/></svg>',
	instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"/></svg>',
	github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>',
	linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13.1H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z"/></svg>',
	arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>',
	back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 12H5M11 18l-6-6 6-6"/></svg>',
};

function layout({title, description, path, body, image, jsonld, type = 'website'}) {
	const full = title === site.title ? title : `${title} · ${site.title}`;
	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url(path)}">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(site.title)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url(path)}">
${image ? `<meta property="og:image" content="${image}">\n<meta name="twitter:image" content="${image}">` : ''}
<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">
<meta name="theme-color" content="#080B12">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="alternate" type="application/rss+xml" title="${esc(site.title)}" href="/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
<script>try{const t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>` : ''}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top">
	<div class="wrap top-in">
		<a class="brand" href="/"><span class="logo" aria-hidden="true">AI</span><span><b>AI Explained</b><small>by ${esc(site.author)}</small></span></a>
		<nav>
			<a href="/#topics">Topics</a>
			<a href="/mcp-a-to-z/">MCP A to Z</a>
			<a href="/about/">About</a>
			<button class="theme" type="button" aria-label="Switch light or dark theme"><span aria-hidden="true"></span></button>
		</nav>
	</div>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
	<div class="wrap foot-in">
		<div>
			<p class="foot-title">AI Explained</p>
			<p>Short, clear explainers on AI for software engineers. Every topic is a 2-minute video and a page you can read.</p>
		</div>
		<div class="socials">
			${Object.entries(site.social).map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener" aria-label="${k}">${icon[k] ?? ''}</a>`).join('')}
		</div>
	</div>
	<div class="wrap foot-meta"><span>© ${new Date().getFullYear()} ${esc(site.author)}</span><a href="/feed.xml">RSS</a></div>
</footer>
<script src="/assets/app.js" defer></script>
</body>
</html>
`;
}

const seriesLabel = (a) => (a.series === 'mcp-a-to-z' ? `MCP A to Z · Ep ${pad(a.episode)}` : SERIES[a.series].short);

function card(a) {
	return `<a class="card" href="/${a.slug}/" data-series="${a.series}" data-search="${esc([a.title, a.description, ...a.tags].join(' ').toLowerCase())}">
	<span class="card-kicker ${a.series}">${esc(seriesLabel(a))}</span>
	<h3>${esc(a.title)}</h3>
	<p>${esc(a.description)}</p>
	<span class="card-meta"><span>${fmtDate(a.date)}</span><span>${minutes(a.body)} min read</span><span class="go">${icon.arrow}</span></span>
</a>`;
}

function watchLinks(a) {
	const links = [['youtube', 'YouTube', `https://youtube.com/shorts/${a.youtube}`], ['facebook', 'Facebook', a.facebook], ['instagram', 'Instagram', a.instagram]].filter(([, , h]) => h);
	return links.map(([k, name, h]) => `<a class="pill ${k}" href="${esc(h)}" target="_blank" rel="noopener">${icon[k]}<span>${name}</span></a>`).join('');
}

function related(a) {
	const score = (b) => (b.series === a.series ? 1 : 0) + b.tags.filter((t) => a.tags.includes(t)).length * 2;
	return articles.filter((b) => b.slug !== a.slug).map((b) => [score(b), b]).sort((x, y) => y[0] - x[0] || y[1].date.localeCompare(x[1].date)).slice(0, 3).map(([, b]) => b);
}

function articlePage(a) {
	const html = marked.parse(a.body);
	const toc = [...a.body.matchAll(/^## (.+)$/gm)].map((m) => m[1]).filter((h) => h !== 'Sources');
	const mcp = a.series === 'mcp-a-to-z' ? articles.filter((b) => b.series === 'mcp-a-to-z').sort((x, y) => x.episode - y.episode) : [];
	const i = mcp.findIndex((b) => b.slug === a.slug);
	const prev = i > 0 ? mcp[i - 1] : null;
	const next = i >= 0 && i < mcp.length - 1 ? mcp[i + 1] : null;
	const series = SERIES[a.series];
	const jsonld = [
		{
			'@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.description, datePublished: a.date, dateModified: a.updated || a.date,
			author: {'@type': 'Person', name: site.author, url: site.social.linkedin ?? site.url}, publisher: {'@type': 'Person', name: site.author},
			mainEntityOfPage: url(`${a.slug}/`), image: thumb(a.youtube), keywords: a.tags.join(', '),
			...(a.series === 'mcp-a-to-z' ? {isPartOf: {'@type': 'CreativeWorkSeries', name: series.name, url: url('mcp-a-to-z/')}} : {}),
		},
		{
			'@context': 'https://schema.org', '@type': 'VideoObject', name: a.title, description: a.description, thumbnailUrl: thumb(a.youtube), uploadDate: a.date,
			embedUrl: `https://www.youtube.com/embed/${a.youtube}`, contentUrl: `https://youtube.com/shorts/${a.youtube}`,
		},
	];
	const body = `
<article class="article">
	<div class="wrap article-grid">
		<div class="article-main">
			<nav class="crumbs" aria-label="Breadcrumb"><a href="/">AI Explained</a><span>/</span>${a.series === 'mcp-a-to-z' ? `<a href="/mcp-a-to-z/">MCP from A to Z</a><span>/</span><span>Episode ${pad(a.episode)}</span>` : `<a href="/#topics">Topics</a>`}</nav>
			<p class="kicker ${a.series}">${esc(a.series === 'mcp-a-to-z' ? `MCP from A to Z · Episode ${pad(a.episode)} of ${series.episodes}` : series.short)}</p>
			<h1>${esc(a.title)}</h1>
			<p class="lede">${esc(a.description)}</p>
			<p class="meta"><span>${esc(site.author)}</span><span>${fmtDate(a.date)}</span><span>${minutes(a.body)} min read</span></p>
			<div class="video-mobile"></div>
			${toc.length > 2 ? `<details class="toc" open><summary>On this page</summary><ol>${toc.map((h) => `<li><a href="#${slugify(h)}">${esc(h.replace(/`/g, ''))}</a></li>`).join('')}</ol></details>` : ''}
			<div class="prose">
${html}
			</div>
			${a.tags.length ? `<p class="tags">${a.tags.map((t) => `<a href="/?q=${encodeURIComponent(t)}#topics">#${esc(t)}</a>`).join('')}</p>` : ''}
			${prev || next ? `<nav class="pager" aria-label="Episodes">${prev ? `<a class="prev" href="/${prev.slug}/"><small>${icon.back} Episode ${pad(prev.episode)}</small><span>${esc(prev.title)}</span></a>` : '<span></span>'}${next ? `<a class="next" href="/${next.slug}/"><small>Episode ${pad(next.episode)} ${icon.arrow}</small><span>${esc(next.title)}</span></a>` : ''}</nav>` : ''}
		</div>
		<aside class="article-side">
			<div class="video-card" id="video">
				<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${a.youtube}?rel=0&amp;modestbranding=1" title="${esc(a.title)}: the 2-minute video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
				<p class="video-label">Watch the 2-minute version</p>
				<div class="pills">${watchLinks(a)}</div>
			</div>
		</aside>
	</div>
</article>
<section class="more">
	<div class="wrap">
		<h2>Keep learning</h2>
		<div class="grid">${related(a).map(card).join('\n')}</div>
	</div>
</section>`;
	return layout({title: a.title, description: a.description, path: `${a.slug}/`, body, image: thumb(a.youtube), jsonld, type: 'article'});
}

function homePage() {
	const counts = Object.fromEntries(Object.keys(SERIES).map((k) => [k, articles.filter((a) => a.series === k).length]));
	const latest = articles[0];
	const body = `
<section class="hero">
	<div class="wrap hero-in">
		<div>
			<p class="eyebrow">AI for software engineers</p>
			<h1>Big AI ideas,<br><span class="grad">explained in two minutes.</span></h1>
			<p class="hero-text">${esc(site.description)}</p>
			<div class="hero-cta">
				<a class="btn primary" href="#topics">Browse ${articles.length} topics</a>
				<a class="btn" href="/mcp-a-to-z/">Start MCP from A to Z</a>
			</div>
			<ul class="stats">
				<li><b>${articles.length}</b><span>explainers</span></li>
				<li><b>${counts['mcp-a-to-z']}/${SERIES['mcp-a-to-z'].episodes}</b><span>MCP episodes</span></li>
				<li><b>4</b><span>new videos a day</span></li>
			</ul>
		</div>
		<a class="hero-latest" href="/${latest.slug}/">
			<span class="phone"><img src="${thumb(latest.youtube)}" alt="" loading="eager" width="480" height="360"><span class="play" aria-hidden="true"></span></span>
			<span class="hero-latest-text"><small>Latest</small><b>${esc(latest.title)}</b></span>
		</a>
	</div>
</section>
<section class="topics" id="topics">
	<div class="wrap">
		<div class="topics-head">
			<h2>All topics</h2>
			<div class="filters" role="group" aria-label="Filter by series">
				<button type="button" class="chip on" data-filter="all">All <span>${articles.length}</span></button>
				${Object.entries(SERIES).map(([k, s]) => `<button type="button" class="chip" data-filter="${k}">${esc(s.short)} <span>${counts[k]}</span></button>`).join('')}
			</div>
			<label class="search"><span class="sr">Search topics</span><input type="search" placeholder="Search: RAG, tokens, MCP…" autocomplete="off"></label>
		</div>
		<div class="grid" id="grid">
${articles.map(card).join('\n')}
		</div>
		<p class="empty" hidden>No topic matches that yet. Got an idea for one? <a href="${site.social.youtube}" target="_blank" rel="noopener">Tell me in the comments.</a></p>
	</div>
</section>`;
	return layout({title: site.title, description: site.description, path: '', body, image: thumb(latest.youtube), jsonld: {'@context': 'https://schema.org', '@type': 'WebSite', name: site.title, url: site.url, author: {'@type': 'Person', name: site.author}}});
}

function seriesPage() {
	const s = SERIES['mcp-a-to-z'];
	const eps = articles.filter((a) => a.series === 'mcp-a-to-z').sort((x, y) => x.episode - y.episode);
	const body = `
<section class="hero small">
	<div class="wrap">
		<nav class="crumbs" aria-label="Breadcrumb"><a href="/">AI Explained</a><span>/</span><span>MCP from A to Z</span></nav>
		<p class="eyebrow">A ${s.episodes}-episode course</p>
		<h1>MCP from <span class="grad">A to Z</span></h1>
		<p class="hero-text">${esc(s.description)}</p>
		<div class="progress" role="img" aria-label="${eps.length} of ${s.episodes} episodes out"><span style="width:${((eps.length / s.episodes) * 100).toFixed(1)}%"></span></div>
		<p class="progress-label">${eps.length} of ${s.episodes} episodes out · a new one every day</p>
	</div>
</section>
<section class="topics">
	<div class="wrap">
		<ol class="episodes">
${eps.map((a) => `<li><a href="/${a.slug}/"><span class="ep">${pad(a.episode)}</span><span class="ep-text"><b>${esc(a.title)}</b><small>${esc(a.description)}</small></span><span class="go">${icon.arrow}</span></a></li>`).join('\n')}
			<li class="soon"><span class="ep">${pad(eps.length + 1)}</span><span class="ep-text"><b>Next episode</b><small>Coming soon. Follow on YouTube so you don't miss it.</small></span></li>
		</ol>
	</div>
</section>`;
	return layout({title: s.name, description: s.description, path: 'mcp-a-to-z/', body, image: eps[0] ? thumb(eps[0].youtube) : null});
}

function aboutPage() {
	const body = `
<section class="hero small">
	<div class="wrap narrow">
		<p class="eyebrow">About</p>
		<h1>Hi, I'm ${esc(site.author)}.</h1>
		<div class="prose">
${marked.parse(readFileSync(join(here, 'about.md'), 'utf8'))}
		</div>
		<div class="pills">${Object.entries(site.social).map(([k, v]) => `<a class="pill ${k}" href="${v}" target="_blank" rel="noopener">${icon[k] ?? ''}<span>${k[0].toUpperCase() + k.slice(1)}</span></a>`).join('')}</div>
	</div>
</section>`;
	return layout({title: 'About', description: `About ${site.author} and AI Explained.`, path: 'about/', body});
}

function notFound() {
	return layout({title: 'Page not found', description: 'This page does not exist.', path: '404.html', body: `<section class="hero small"><div class="wrap narrow"><p class="eyebrow">404</p><h1>That page isn't here.</h1><p class="hero-text">It may have moved. Try the topic list instead.</p><div class="hero-cta"><a class="btn primary" href="/#topics">See all topics</a></div></div></section>`});
}

function feed() {
	const items = articles.slice(0, 50).map((a) => `<item><title>${esc(a.title)}</title><link>${url(`${a.slug}/`)}</link><guid>${url(`${a.slug}/`)}</guid><pubDate>${new Date(`${a.date}T12:00:00Z`).toUTCString()}</pubDate><description>${esc(a.description)}</description></item>`).join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${esc(site.title)}</title><link>${site.url}/</link><description>${esc(site.description)}</description><language>en</language>\n${items}\n</channel></rss>\n`;
}

function sitemap() {
	const pages = ['', 'mcp-a-to-z/', 'about/', ...articles.map((a) => `${a.slug}/`)];
	const mod = (p) => articles.find((a) => `${a.slug}/` === p)?.date ?? articles[0].date;
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `<url><loc>${url(p)}</loc><lastmod>${mod(p)}</lastmod></url>`).join('\n')}\n</urlset>\n`;
}

rmSync(out, {recursive: true, force: true});
mkdirSync(out, {recursive: true});
cpSync(join(here, 'assets'), join(out, 'assets'), {recursive: true});
const write = (path, text) => {
	mkdirSync(dirname(join(out, path)), {recursive: true});
	writeFileSync(join(out, path), text);
};
write('index.html', homePage());
write('mcp-a-to-z/index.html', seriesPage());
write('about/index.html', aboutPage());
write('404.html', notFound());
for (const a of articles) write(`${a.slug}/index.html`, articlePage(a));
write('feed.xml', feed());
write('sitemap.xml', sitemap());
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${url('sitemap.xml')}\n`);
write('CNAME', `${new URL(site.url).host}\n`);
write('.nojekyll', '');
// llms.txt: a map of the site for AI agents (llmstxt.org), plus a markdown copy of every article at /<slug>.md.
const bySeries = (k) => articles.filter((a) => a.series === k).sort((x, y) => (x.episode ?? 0) - (y.episode ?? 0) || x.title.localeCompare(y.title));
write('llms.txt', `# ${site.title}\n\n> ${site.description}\n\n${Object.entries(SERIES).map(([k, s]) => `## ${s.name}\n\n${bySeries(k).map((a) => `- [${a.title}](${url(`${a.slug}.md`)}): ${a.description}`).join('\n')}`).join('\n\n')}\n`);
for (const a of articles) write(`${a.slug}.md`, `# ${a.title}\n\n> ${a.description}\n\nVideo: https://youtube.com/shorts/${a.youtube}\n\n${a.body}\n`);
console.log(`built ${articles.length} articles into dist/`);
