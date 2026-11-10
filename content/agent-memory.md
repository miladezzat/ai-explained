---
title: Agent memory: how AI agents remember
slug: agent-memory
description: You told your agent your name yesterday, and today it asks again. How short-term and long-term agent memory work, and how to build memory safely.
date: 2026-10-30
series: ai-explained
youtube: yNpiiWkAGqA
facebook: https://facebook.com/reel/1594592775770415
tags: agent memory, ai agents, context window, long-term memory, claude
---
You told your AI agent your name yesterday. Today it asks again. That's not a bug: by default, models have no memory. Each call starts fresh and only knows what's in its context window right now. **Agent memory** is how an agent keeps useful information and brings it back when it matters.

## Short-term and long-term

**Short-term memory** is the current conversation: the message history inside one session. It lives in the context window and disappears when the session ends.

**Long-term memory** survives across sessions: your preferences, past decisions, facts about your project. It's stored somewhere outside the model and loaded back in when relevant.

## Three types of long-term memory

LangChain's memory guide borrows three categories from psychology:

| Type | What it holds | Example |
|---|---|---|
| Semantic | Facts | "This user prefers TypeScript." |
| Episodic | Past experiences | "Last week we fixed a similar bug by clearing the cache." |
| Procedural | Rules for how to work | "Always run the tests before committing." Often in the system prompt. |

## In practice, it's files or a database

There's no magic. Memory is usually just text the agent reads and writes. Claude's memory tool is a good example: it uses a memories folder. Claude "automatically checks its memory directory before starting a task", and updates files as it learns.

The files live **in your app, not inside the model**. Claude asks for a file operation (view, create, edit, delete), and your code runs it. That means you decide where memory is stored and who can see it.

## When to save

- **On the hot path**: write memories during the task, right when something is learned.
- **In the background**: review the conversation afterwards and save what matters, so the user never waits.

## Memory needs care

- **Keep secrets out.** Passwords and API keys never belong in memory files.
- **Lock the folder.** Reject paths that try to escape it, like `/memories/../../secrets.env`.
- **Clean up.** Cap file sizes and delete memories nobody has used in a long time.

> Context is what it sees now. Memory is what it keeps.

## Sources

- [Anthropic, Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)
- [LangChain, Memory overview](https://docs.langchain.com/oss/python/concepts/memory)
