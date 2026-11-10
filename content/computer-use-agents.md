---
title: Computer-use agents: AI that uses your screen
slug: computer-use-agents
description: What if AI could use a computer like you do? Computer-use agents look at the screen, then click and type. How they work, where they fail, and how to run them safely.
date: 2026-10-30
series: ai-explained
youtube: TI_HPWUfymo
facebook: https://facebook.com/1352235447979055/videos/1496487049032405
tags: computer use, ai agents, automation, agent loop, ai security
---
Most AI tools work through APIs. A **computer-use agent** works through the screen: it looks at what's displayed, then moves the mouse and types on the keyboard, just like you do. Anthropic and OpenAI both offer models that can do this, through a tool you call from your own code.

## Why it matters

A lot of software has no API. Old admin panels, desktop apps, internal tools and forms built only for people. Until now, automating them meant brittle scripts. A computer-use agent can operate them the way a person would.

## How it works: the agent loop

1. The agent takes a **screenshot**.
2. The model looks at it and picks the next step: click here, scroll, type this.
3. Your app performs that action.
4. It takes another screenshot to see what changed.
5. Repeat until the task is done.

That repetition is the agent loop. Importantly, the model never touches your computer directly. As Anthropic's docs explain, your application translates each request into a real action and sends back the result. To move faster, models can also batch a few actions (click, type, then screenshot) in one step.

## An example

Ask it to file an expense report. It opens the expense portal, finds the right form, fills in each field, attaches the receipt and, before pressing Submit, stops and asks you. A good agent pauses at the step with real consequences.

## How good are they?

Getting better fast, but not human level yet. When OpenAI introduced its Computer-Using Agent in January 2025, it scored **38.1%** on the OSWorld benchmark of real computer tasks. People scored **72.4%**. Newer models score higher, but the gap is still there.

Known weak spots:

- They're **slower** than a person.
- Picking the exact spot to click is hard, so **misclicks** happen.
- They get **lost in unfamiliar or niche apps**.

## The big risk: everything on screen is input

A malicious web page can hide instructions that hijack the agent, a form of prompt injection. So follow the safety basics both providers recommend:

- Run the agent in a **sandboxed virtual machine or container** with minimal privileges.
- Keep **passwords and login details** out of its reach.
- **Allow only the sites** it needs.
- Have a **human confirm** anything with real-world consequences.

## Where it shines

Testing web apps end to end, moving data between old tools that don't talk to each other, and boring, repetitive forms.

> No API? Use computer use. Got an API? Use the API.

## Sources

- [Anthropic, Computer use tool docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)
- [OpenAI, Computer-Using Agent (2025-01-23)](https://openai.com/index/computer-using-agent/)
- [OpenAI, computer use guides](https://developers.openai.com/api/docs/guides/tools-computer-use-integration)
