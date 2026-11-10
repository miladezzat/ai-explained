---
title: Agent Skills and SKILL.md
slug: agent-skills
description: Agent Skills are folders of instructions, scripts and resources that an AI agent loads only when a task needs them. Here's how SKILL.md and progressive loading work.
date: 2026-10-25
series: ai-explained
youtube: C3qN3bMjRnY
facebook: https://facebook.com/reel/960688223331998
tags: agent skills, skill.md, ai agents, claude, context engineering
---
You can teach an AI agent a new job without retraining it, and without stuffing every instruction into its prompt. That's the idea behind **Agent Skills**: packaged know-how the agent picks up only when it needs it.

## What a skill is

A skill is a folder. At its heart is a file called `SKILL.md`: instructions written in plain Markdown, with a small header that names the skill and says when to use it.

```markdown
---
name: brand-slides
description: Create slide decks in our company style. Use when the user asks for a presentation.
---

# Brand slides

1. Use the template in templates/deck.pptx.
2. Titles in sentence case, max 8 words.
3. Run scripts/check_fonts.py before you finish.
```

The folder can also hold scripts the agent can run, templates, reference docs and examples.

Anthropic introduced Agent Skills in October 2025 and later published the format as an open standard, so other agents can use the same skills.

## The clever part: progressive loading

An agent may have dozens of skills installed. Loading all of them into the context window would waste it. So skills load in layers:

1. **At start**, the agent sees only each skill's name and description, a line or two each.
2. **When a task matches**, it reads that skill's full `SKILL.md`.
3. **Only if needed**, it opens the extra files or runs the scripts in the folder.

Most of the time, a skill costs almost nothing. When it's needed, it brings everything with it.

## Why skills are useful

- **Repeatable work.** The agent follows your process the same way every time.
- **Real code, not just words.** Scripts do the precise parts, like parsing a file or checking output, instead of the model improvising.
- **Shareable.** A skill is just a folder you can put in a repo and share with your team.

## Tips for writing one

- Make the description specific about *when* to use it. That's what the agent matches on.
- Keep `SKILL.md` focused, and move long references into separate files.
- Put fragile, exact steps in scripts.
- Only install skills you trust: scripts in a skill run with the agent's permissions.

> Teach it once. Load it when needed.

## Sources

- [Anthropic, Introducing Agent Skills (2025)](https://www.anthropic.com/news/skills)
- [Anthropic Engineering, Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Agent Skills, open format and specification](https://agentskills.io/)
