---
title: Agentic browsers: when your browser clicks and buys for you
slug: agentic-browsers
description: How AI browsers with agent modes work, why indirect prompt injection makes them risky, and how users and builders can limit the damage.
date: 2026-11-14
series: ai-explained
youtube: qC7xTvlo6F4
facebook: https://facebook.com/reel/2051526598755619
instagram: https://www.instagram.com/p/Dfu2P_0l3xC/
tags: agentic browsers, ai agents, prompt injection, ai security, browser agents
---
Your browser can now click, type and buy for you. That's an **agentic browser**.

## What it is

An agentic browser has an AI agent built in. You give it a task, and it does the browsing: it reads the page, picks an action, clicks or types, then looks again, and repeats until the task is done.

That's the difference from a chatbot. A chatbot answers questions about a page. An agentic browser **acts** on it.

Perplexity's Comet and OpenAI's ChatGPT Atlas brought agent modes to the browser in 2025. OpenAI has since deprecated Atlas, but the idea spread.

## Where the power comes from

The agent works inside your browser, with your logged-in sessions. Brave puts it plainly: the assistant "executes with the user's authenticated privileges". Your email, your bank, your work tools: if you're signed in, the agent can reach them.

## Where the danger comes from

That same power is the danger. Every page the agent reads is **untrusted text**, and a page can hide instructions aimed at the agent instead of you. This is **indirect prompt injection**.

Brave's researchers showed how subtle it can get:

- In **Comet**, faint, nearly invisible text inside an image was read and followed as commands when the user asked about a screenshot.
- In **Fellou**, simply asking the browser to go to a website sent that website's content to the model, hidden instructions and all.

Brave's verdict: indirect prompt injection is "a systemic challenge facing the entire category" of AI browsers, not one bug in one product.

OpenAI agrees. In its post on hardening Atlas, it wrote that prompt injection, "much like scams and social engineering on the web, is unlikely to ever be fully 'solved'". In its own demo, a malicious email in the inbox made the agent resign on the user's behalf instead of writing the out-of-office reply it was asked for.

## The guardrails

Because the risk can't be removed, products add friction around the riskiest moments:

- Agents ask for **confirmation** before consequential actions, such as completing a purchase or sending an email.
- At launch, Atlas's agent couldn't run code in the browser, download files or install extensions, couldn't access other apps or the file system, and paused on sensitive sites such as financial institutions so you could watch.

## What you can do

- Use **logged-out mode** when the task doesn't need your accounts.
- Give **specific, well-scoped tasks** rather than broad ones like "handle my inbox".
- Watch the agent on anything that touches money or messages.

## What builders should do

Brave's advice to browser makers: isolate agentic browsing from regular browsing, and start agentic actions only when the user explicitly asks for them.

> Let it browse for you, but watch what it reads.

## Sources

- [OpenAI: Introducing ChatGPT Atlas](https://openai.com/index/introducing-chatgpt-atlas/)
- [OpenAI: Continuously hardening ChatGPT Atlas against prompt injection attacks](https://openai.com/index/hardening-atlas-against-prompt-injection/)
- [Brave: Unseeable prompt injections in screenshots](https://brave.com/blog/unseeable-prompt-injections/)
