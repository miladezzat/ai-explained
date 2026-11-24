---
title: System prompts: the rules before the chat
slug: system-prompts
description: What a system prompt is, where it goes in the API, who wins when instructions conflict, and how to write one that steers the model without treating it as a lock.
date: 2026-11-24
series: ai-explained
youtube: Egh8iTmYEaM
facebook: https://facebook.com/reel/1183993597529753
instagram: https://www.instagram.com/p/DgIluFrIYg-/
tags: llm, prompt engineering, system prompts, ai engineering, security
---
Same model, same question, two totally different answers. **The difference? The system prompt.**

## What a system prompt is

A system prompt is the set of instructions the model reads before any user message. In the Claude API it has its own slot, the `system` parameter, separate from the `messages` list:

```python
client.messages.create(
    model="...",
    system="You are a helpful coding assistant specializing in Python.",
    messages=[{"role": "user", "content": "..."}],
)
```

OpenAI's equivalent for its newer models is the developer message. As LiteLLM's docs put it, "OpenAI's `developer` role carries instructions with higher priority than the user's messages."

## Who wins when instructions conflict

OpenAI describes training its models on an instruction hierarchy: "System > developer > user > tool". The rule: "The model should only follow lower-priority instructions when they do not conflict with higher-priority constraints." That's also why a tool result that says "ignore your instructions" should be ignored.

## How to write a good one

**Start with a role.** Anthropic: "Setting a role in the system prompt focuses Claude's behavior and tone for your use case. Even a single sentence makes a difference."

**Be explicit.** "Think of Claude as a brilliant but new employee who lacks context on your norms and workflows." Spell out what you want.

**Explain why, not just what.** Anthropic's example: instead of only "never use ellipses", say the response "will be read aloud by a text-to-speech engine". "Claude can generalize from the explanation."

A typical system prompt covers (general practice):

- role and context
- rules and constraints
- the tools available and when to use them
- the output format

## Keep it stable

Put the system prompt first and keep it identical across requests, so prompt caching can reuse it (general practice). If you need to change the rules partway through, Claude supports mid-conversation system messages, which let you "Change system instructions or tool availability partway through a conversation without invalidating the cached prefix that came before them."

## What a system prompt is not

**Not a secret.** OWASP says "the system prompt should not be considered a secret, nor should it be used as a security control." Users can coax it out, so never put API keys or credentials in it.

**Not a lock.** If something must never happen, enforce it in code with permissions and checks, not with prompt wording.

## Treat it like code

A system prompt is part of your product. Version it, test changes against evals before shipping, and review every edit (general practice).

> Set the role. Explain the rules.

## Sources

- [Claude docs: Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Claude docs: Mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages)
- [OpenAI: Instruction hierarchy challenge (IH-Challenge)](https://openai.com/index/instruction-hierarchy-challenge)
- [LiteLLM docs: developer role](https://docs.litellm.ai/docs/completion/developer_role)
- [OWASP: LLM07:2025 System Prompt Leakage](https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/)
