---
title: Prompt versioning: ship prompts like code
slug: prompt-versioning
description: Track every prompt change as a version, ship it by moving a production label, roll back in seconds, and compare versions in traces and evals.
date: 2026-11-14
series: ai-explained
youtube: ftiNrnrsJnU
facebook: https://facebook.com/reel/4106173126191672
instagram: https://www.instagram.com/p/DftxItUlMW7/
tags: prompt versioning, llmops, prompt management, mlflow, langfuse
---
Someone tweaked the system prompt on Friday. On Monday, answers got worse. Which change did it? If your prompt lives in an untracked string, nobody knows.

## Prompts are code

A prompt changes your app's behavior as much as any function does. **Prompt versioning** treats every change as a **new version**, never an edit in place.

- [MLflow's Prompt Registry](https://mlflow.org/docs/latest/genai/prompt-registry/) makes versions immutable, "providing strong guarantees for reproducibility," with Git-style commit messages.
- In [Langfuse](https://langfuse.com/docs/prompt-management/get-started), saving a prompt with the same name adds a new version.

## Labels decide what's live

Labels (Langfuse) or aliases (MLflow) point at versions:

| Label | Points to |
|---|---|
| `staging` | v3, being tested |
| `production` | v2, what users get |
| `latest` | v3, the newest |

Your app fetches the **production label**, not a hard-coded string:

```python
prompt = langfuse.get_prompt("support-bot", label="production")
```

Langfuse "never silently falls back to production or latest," so a typo in a label won't quietly serve the wrong prompt.

## Ship and roll back by moving a label

Shipping a new prompt means moving `production` to the new version, with no code deploy. Rolling back means moving it back: seconds, not a hotfix. Labels also make A/B tests easy, sending part of the traffic to a second version.

## Caching and pinning

SDKs cache prompts on the client, so fetching by label doesn't cost a network call every time. MLflow caches pinned versions forever (they never change) and alias lookups for 60 seconds by default.

For tests and reproducibility, pin an exact version or commit instead of a label. In [LangSmith](https://docs.langchain.com/langsmith/manage-prompts-programmatically) you pull a prompt by name plus a commit hash or tag, like `joke-generator:12344e88`.

## Version what the prompt depends on

A prompt only means something with its model. Version the model name and settings (temperature, max tokens) together with the template; MLflow supports storing both.

## Measure before you promote

1. **Record** which prompt version each trace used.
2. **Compare** quality, cost and errors by version.
3. **Run your eval set** on the new version before moving the `production` label.

No platform? Keep prompts as files in Git, reviewed in pull requests, with release tags. You get most of the benefit for free.

> Version it, label it, measure it.

## Sources

- [MLflow Prompt Registry](https://mlflow.org/docs/latest/genai/prompt-registry/)
- [Langfuse: get started with prompt management](https://langfuse.com/docs/prompt-management/get-started)
- [Langfuse: prompt version control](https://langfuse.com/docs/prompt-management/features/prompt-version-control)
- [LangSmith: manage prompts programmatically](https://docs.langchain.com/langsmith/manage-prompts-programmatically)
