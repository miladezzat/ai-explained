---
title: AI code review: a model on your pull requests
slug: ai-code-review
description: AI code review tools read your diff and comment on the changed lines. What they catch, how Copilot and Claude fit in, what Google measured, and why a person still decides.
date: 2026-11-11
series: ai-explained
youtube: IkiwBOFVgrA
facebook: https://facebook.com/reel/1819045125661201
instagram: https://www.instagram.com/p/DfmeomGlkz9/
tags: ai code review, code review, pull requests, github copilot, developer tools
---
Your next code reviewer might not be a person. It's a model, and it's probably already on your pull requests.

## How it works

The model reads the diff and the code around it, then leaves comments right on the changed lines, just like a human reviewer would.

It's good at the boring catches:

- typos
- missed null checks
- unused variables and inconsistent names

## Copilot on GitHub

On GitHub, you **assign Copilot** to a pull request and it reviews it like a teammate would.

- Many comments come with a **suggested change** you can apply in a couple of clicks.
- You can turn on **automatic reviews**, so new pushes get checked without anyone asking.
- You can teach it your team's rules in an instructions file: `.github/copilot-instructions.md`.

```md
- Use our logger, not console.log
- Every endpoint needs a test
- Flag raw SQL
```

Other tools work the same way. With **Claude Code's GitHub Action**, you mention `@claude` in a pull request or issue comment to get it to look at the code.

## What Google measured

Google tried a version of this at scale: a model that proposes code edits to resolve reviewers' comments.

- Getting a change through review took authors about **an hour of active work** on average, between sending it for review and submitting it.
- Authors applied **40% to 50%** of the suggested edits they previewed.
- Google expects it to save **hundreds of thousands of hours a year**.

## The limits

AI review isn't perfect. GitHub's own docs say Copilot **won't spot every problem**, and sometimes it **makes mistakes**.

By default, Copilot's reviews **don't count toward required approvals**. A person still signs off.

Too many comments also turn into noise. Tune the tool to flag what matters, and leave style to your linter.

## What humans still review

People review what a model can't judge:

- the **design**
- the **product intent**
- whether the change **should ship at all**

## A good setup

| Step | Job |
|---|---|
| Linters and tests | The mechanical checks |
| AI pass | The small stuff a person might miss |
| Human reviewer | The call |

> Let AI catch the small stuff. You own the decision.

## Sources

- [GitHub Docs, About Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
- [Claude Code docs, GitHub Actions](https://code.claude.com/docs/en/github-actions)
- [Google Research, Resolving code review comments with ML](https://research.google/blog/resolving-code-review-comments-with-ml/)
