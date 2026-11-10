---
title: AI agent vs chatbot
slug: ai-agent-vs-chatbot
description: A chatbot answers. An agent acts: it plans, uses tools and checks each result until the job is done. Here's the difference, and when you need each.
date: 2026-10-26
series: ai-explained
youtube: WWPIwrFM9gQ
facebook: https://facebook.com/reel/3382798171907524
tags: ai agents, chatbots, agent loop, tools, llm
---
Ask a chatbot to book a flight, and it tells you how to book it. Ask an AI agent, and it books it. Both run on the same kind of language model. The difference is what the system around the model is allowed to do.

## A chatbot talks

A chatbot is a conversation. One message goes in, one answer comes out, and then it waits for you. It can explain, summarize, draft and brainstorm, but every next step is yours. If the answer says "go to the airline's site and pick the 9 a.m. flight", you are the one who opens the site.

That's not a weakness. For questions, writing help and quick explanations, a single round trip is exactly what you want: fast, cheap and predictable.

## An agent acts

An agent gets a goal instead of a question. It plans how to reach that goal, picks tools to use (search, a calendar, a payment API, a code runner), and takes the steps itself.

The key part is the **loop**. After every step, the agent looks at the result and decides what to do next:

1. Read the goal and the current state.
2. Choose an action, usually a tool call.
3. Run it and look at what came back.
4. Repeat until the job is done, or until it needs help.

Anthropic describes agents as systems where the model "dynamically directs its own process and tool usage", working in a loop on feedback from the environment. That feedback is what makes agents useful: if the 9 a.m. flight is sold out, the agent sees that and tries the next one.

## Good agents know when to stop

Acting on your behalf has real consequences. Paying, sending an email or deleting a file can't be undone. So a well-built agent pauses at checkpoints and asks you before anything important, like confirming the card charge before it books.

This is called human-in-the-loop, and it's what makes agents safe enough to trust with real work.

## Which one do you need?

| | Chatbot | Agent |
|---|---|---|
| Input | A question | A goal |
| Output | An answer | A finished task |
| Steps | One | Many, in a loop |
| Tools | Usually none | Search, APIs, code, files |
| Risk | Low | Needs limits and approvals |

Use a chatbot when the answer is the product. Use an agent when the work is the product, and give it only the tools and permissions that job needs.

> Chatbots talk. Agents get things done.

## Sources

- [Anthropic, Building effective agents](https://www.anthropic.com/research/building-effective-agents)
