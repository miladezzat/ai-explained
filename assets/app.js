// Theme switch, topic search and filter, and the video placement on phones.
(() => {
	const root = document.documentElement;
	const btn = document.querySelector('.theme');
	const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : !matchMedia('(prefers-color-scheme: light)').matches);
	btn?.addEventListener('click', () => {
		const next = isDark() ? 'light' : 'dark';
		root.dataset.theme = next;
		try { localStorage.setItem('theme', next); } catch (e) {}
	});

	// Phones: show the video right under the title instead of in the side column.
	const slot = document.querySelector('.video-mobile');
	const card = document.querySelector('.video-card');
	const side = document.querySelector('.article-side');
	if (slot && card && side) {
		const mq = matchMedia('(max-width: 960px)');
		const place = () => (mq.matches ? slot : side).appendChild(card);
		place();
		mq.addEventListener('change', place);
	}

	// Topic grid: filter chips + search, kept in the URL (?q=…&s=…).
	const grid = document.getElementById('grid');
	if (!grid) return;
	const cards = [...grid.querySelectorAll('.card')];
	const input = document.querySelector('.search input');
	const chips = [...document.querySelectorAll('.chip')];
	const empty = document.querySelector('.empty');
	const params = new URLSearchParams(location.search);
	let series = params.get('s') || 'all';
	input.value = params.get('q') || '';
	const apply = () => {
		const words = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
		let shown = 0;
		for (const c of cards) {
			const ok = (series === 'all' || c.dataset.series === series) && words.every((w) => c.dataset.search.includes(w));
			c.hidden = !ok;
			if (ok) shown++;
		}
		chips.forEach((ch) => ch.classList.toggle('on', ch.dataset.filter === series));
		empty.hidden = shown > 0;
		const p = new URLSearchParams();
		if (input.value.trim()) p.set('q', input.value.trim());
		if (series !== 'all') p.set('s', series);
		history.replaceState(null, '', `${location.pathname}${p.size ? `?${p}` : ''}${location.hash}`);
	};
	chips.forEach((ch) => ch.addEventListener('click', () => { series = ch.dataset.filter; apply(); }));
	input.addEventListener('input', apply);
	document.addEventListener('keydown', (e) => {
		if (e.key === '/' && document.activeElement !== input) { e.preventDefault(); input.focus(); }
	});
	apply();
})();
