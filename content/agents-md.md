---
title: AGENTS.md and CLAUDE.md
slug: agents-md
description: Your coding agent keeps running the wrong test command because nobody told it the right one. AGENTS.md is a README for agents. Here's what to put in it.
date: 2026-10-31
series: ai-explained
youtube: ZYj2NQbCdQE
facebook: https://facebook.com/reel/28256914970653179
tags: agents.md, claude.md, coding agents, developer experience, claude code
---
Your AI coding agent keeps running the wrong test command. It uses double quotes when your team uses single. It edits a generated file. Why? Nobody told it. That's what **AGENTS.md** is for.

## A README for agents

Your README is written for humans: what the project is and how to get started. AGENTS.md is written for coding agents: the exact commands, rules and gotchas they need to work in your repo. The official site calls it "a README for agents".

## What to put in it

- Build, test and lint commands.
- Code style rules.
- How to write commits and pull requests.
- Things to never touch, like generated files or migrations.

```markdown
# AGENTS.md

## Commands
- Install: `pnpm install`
- Test: `pnpm test`

## Style
- Single quotes, two-space indentation.
- Never edit files in `src/generated/`.
```

There's no special format. It's "just standard Markdown. Use any headings you like."

## How agents read it

- In a monorepo, add one per package. Agents read the **nearest file** in the directory tree, so the closest one wins.
- If you ask for something different in the chat, **your prompt overrides the file**.

It's read by many tools, including Codex, Cursor, Gemini CLI, GitHub Copilot's coding agent, VS Code and more, and used by over 60,000 open-source projects. It's now stewarded by the Agentic AI Foundation, part of the Linux Foundation.

## CLAUDE.md

Claude Code has its own version, **CLAUDE.md**, which it reads at the start of every session.

- Keep `./CLAUDE.md` in the project, shared with your team.
- Keep a personal `~/.claude/CLAUDE.md` for rules across all your projects.
- Run `/init` and Claude scans your code and writes a first draft.

Using both? Keep one source of truth: put `@AGENTS.md` at the top of CLAUDE.md, and it pulls the whole file in.

## Keep it short and specific

Claude's docs suggest under 200 lines per file. Specific beats vague: "Use 2-space indentation" works; "format code properly" doesn't.

> Write it once. Every agent starts smarter.

## Sources

- [agents.md](https://agents.md/)
- [Claude Code docs, How Claude remembers your project](https://code.claude.com/docs/en/memory)
