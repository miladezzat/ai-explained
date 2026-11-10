---
title: Background coding agents
slug: background-coding-agents
description: Assign a ticket before lunch, and a pull request is waiting when you're back. How background coding agents work in cloud sandboxes, and how to use them well.
date: 2026-11-07
series: ai-explained
youtube: jjQwLQ3W54g
facebook: https://facebook.com/reel/1461849986136368
instagram: https://www.instagram.com/p/DfbvQmVmvvH/
tags: background agents, coding agents, codex, github copilot, claude code
---
You assign a ticket before lunch. When you're back, a pull request is waiting. That's a **background coding agent**: it works on its own, in the cloud, while you do something else.

## Local vs background

A **local agent** works in your terminal or editor, and you watch each step. A **background agent** takes the task, works independently, and reports back when it's done.

GitHub Copilot's cloud agent, OpenAI Codex, Claude Code on the web and Google's Jules all work this way.

## How it works

1. **A fresh cloud machine per task.** OpenAI describes each Codex task running "in its own cloud sandbox environment, preloaded with your repository", with dependencies installed.
2. **Isolation.** Because every task has its own machine, you can run several at once without them colliding.
3. **Limited network.** Internet access is restricted by default (GitHub uses a firewall, for example), so the agent can't reach just any site.
4. **A plan first, sometimes.** Jules, for example, shows a plan you approve before any code changes.
5. **Work without supervision.** The agent edits files, runs the tests and fixes what fails.
6. **A pull request at the end.** The result comes back as a branch or PR, so you review it like a teammate's work.

Many of these agents read an **AGENTS.md** file in your repo to learn how to build, test and follow your rules.

## Good tasks vs bad tasks

**Good**: small and clear. A bug with steps to reproduce, a test to add, a dependency bump, a small refactor.

**Bad**: vague requests come back wrong, and big redesigns still need you in the loop.

## Stay in control

- **Review every pull request.** The agent did the typing; you own the merge.
- **Protect your main branch** with rules, so no agent can push there directly.
- Keep secrets out of the agent's environment unless the task needs them.

## A good rhythm

Hand off the small tasks in the morning, and review the pull requests after lunch.

> Delegate the task. Keep the review.

## Sources

- [OpenAI, Introducing Codex (2025-05-16)](https://openai.com/index/introducing-codex/)
- [GitHub Docs, Copilot on GitHub (cloud agent)](https://docs.github.com/en/copilot)
- [Claude Code docs, Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web)
- [Jules docs](https://jules.google/docs/)
