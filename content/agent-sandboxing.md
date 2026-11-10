---
title: Agent sandboxing and permissions
slug: agent-sandboxing
description: Your coding agent ran a command you never read. What stopped it from wiping your home folder? Permissions decide what it may do; a sandbox limits what it can do.
date: 2026-11-07
series: ai-explained
youtube: K1wsxRetoCk
facebook: https://facebook.com/reel/1999710994003452
instagram: https://www.instagram.com/p/DfcLTuiDGsK/
tags: agent sandboxing, permissions, ai security, coding agents, claude code
---
Your coding agent just ran a command you never read. What stopped it from wiping your home folder? Two things keep agents in check: **permissions** decide what an agent *may* do, and a **sandbox** limits what it *can* do.

## Permissions: allow, ask, deny

Permissions are the prompts you already know: allow this command, or ask me first. You write them as rules:

```json
{
  "permissions": {
    "allow": ["Bash(npm run test)"],
    "ask":   ["Bash(git commit:*)"],
    "deny":  ["Bash(git push:*)"]
  }
}
```

In Claude Code, rules are checked in order: **deny, then ask, then allow**, so a broad deny always wins.

The weakness: too many prompts cause fatigue. By the fiftieth one, you click "yes" without reading.

## Sandboxes: the OS says no

A sandbox is the other layer. The operating system itself blocks what the agent can't touch:

- **Filesystem isolation**: the agent can only read and write inside the folders you allow, like your project.
- **Network isolation**: it can only reach approved servers, like your package registry.

You need both. Anthropic points out that without network limits, a hijacked agent could simply upload your SSH keys.

Claude Code builds its sandbox into the OS: **bubblewrap** on Linux and **Seatbelt** on macOS. Anthropic says sandboxing cut permission prompts by **84%** in its internal use, because safe actions inside the sandbox no longer need asking.

## Why it matters: the lethal trifecta

Simon Willison describes a dangerous combination he calls the **lethal trifecta**:

1. access to your **private data**,
2. exposure to **untrusted content** (like a web page or an email),
3. a way to **send data out**.

Give an agent all three, and one malicious web page can trick it into leaking your data. The fix: remove one leg. A sandbox with no open network removes the third.

## Skipping prompts entirely?

Some tools let you bypass all permission prompts. Only do that inside a container or VM you can throw away.

## A sensible setup

- Sandbox by default.
- Allow your safe, frequent commands (tests, linting, builds).
- Deny anything that pushes, deploys or deletes.

> Ask less, but limit more.

## Sources

- [Anthropic, Making Claude Code more secure and autonomous with sandboxing](https://www.anthropic.com/engineering/claude-code-sandboxing)
- [Claude Code docs, Permissions](https://code.claude.com/docs/en/permissions)
- [Simon Willison, The lethal trifecta for AI agents (2025-06-16)](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)
