---
title: Spec-driven development with AI agents
slug: spec-driven-development
description: You ask an agent for a feature and it builds something else. Spec-driven development writes the spec first, then lets agents turn it into code. Spec Kit and Kiro explained.
date: 2026-11-06
series: ai-explained
youtube: rrcjMYAoEu8
facebook: https://facebook.com/reel/1110273901789860
instagram: https://www.instagram.com/p/DfaPlFPFqIK/
tags: spec-driven development, coding agents, spec kit, kiro, software engineering
---
You ask an AI agent for a feature, and it builds something else. The problem wasn't the code. It was the request. **Spec-driven development** flips the order: write the spec first, then let agents turn it into code.

GitHub's Spec Kit puts it plainly: "code serves specifications", not the other way around.

## GitHub Spec Kit

GitHub open-sourced Spec Kit in September 2025. It works with Copilot, Claude Code and other agents, and it walks through five steps:

1. **Constitution**: the project's ground rules, like code quality, testing standards and how things get built. Written once per project.
2. **Specify**: what to build and why, with user stories and acceptance criteria. No tech stack yet.
3. **Plan**: now pick the stack and architecture, plus data models and API contracts.
4. **Tasks**: the plan becomes small, ordered steps. Steps that can run in parallel are marked `[P]`.
5. **Implement**: the agent works through the tasks one at a time, with the spec as its guide.

## Amazon's Kiro

Kiro uses the same idea with three files per feature: `requirements.md`, `design.md` and `tasks.md`.

Its requirements use **EARS notation** (Easy Approach to Requirements Syntax): *when* something happens, the system *shall* do something specific.

```text
WHEN a user submits a form with invalid data
THE SYSTEM SHALL display validation errors next to the relevant fields
```

That format is precise enough for an agent to build and test against.

## Why bother?

- **The agent stops guessing** what you meant.
- **You review a short spec** before thousands of lines of code, which is much easier than reviewing the code.
- **The spec stays in the repo** next to the code, so the next change starts from what you agreed on.

## When to skip it

It's not for everything. Skip it for quick bug fixes, or when you're exploring an idea without a clear goal yet.

## Start small

Write one spec for your next feature, and ask the agent to plan before it codes. Review the plan, then let it build.

> Spec first, code second.

## Sources

- [GitHub Spec Kit README](https://github.com/github/spec-kit)
- [Spec Kit, spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- [Visual Studio Magazine, GitHub Open Sources Kit for Spec-Driven AI Development (2025-09-03).](https://visualstudiomagazine.com/articles/2025/09/03/github-open-sources-kit-for-spec-driven-ai-development.aspx)
- [Kiro docs, Specs](https://kiro.dev/docs/specs/)
