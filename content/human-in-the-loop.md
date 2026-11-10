---
title: Human-in-the-loop for AI agents
slug: human-in-the-loop
description: Would you let an AI agent refund customers on its own? Human-in-the-loop pauses the agent before risky actions so a person can approve, edit or reject.
date: 2026-10-28
series: ai-explained
youtube: DmFM6Txr5kQ
facebook: https://facebook.com/reel/2000032570914477
instagram: https://www.instagram.com/reel/DfB3AJDILRa/
tags: human in the loop, ai agents, approvals, ai safety, tool use
---
Would you let an AI agent refund customers on its own? Probably not. But you'd happily let it search orders and draft replies. Human-in-the-loop is how you get both: the agent runs freely where it's safe, and pauses for a person where it counts.

## How it works

You sort your agent's tools into two groups:

- **Safe tools** run on their own: search, read an order, look up a policy.
- **Risky tools** are marked as *needs approval*: refund, delete, send email, run a shell command.

When the agent decides to call a risky tool, the run doesn't execute it. It stops, saves its state, and shows a person what it wants to do, for example "Refund $49 on order #1042".

The person then has three choices:

1. **Approve** it as is.
2. **Edit** it, for example change the amount.
3. **Reject** it, optionally with a reason the agent can use.

On approval, the agent picks up exactly where it paused. It doesn't start over.

## It's built into the major frameworks

The OpenAI Agents SDK lets you mark tools with `needs_approval`. When one is called, "the run records an approval interruption instead of executing the tool", and your app resumes the same run after a decision. OpenAI recommends this before side effects like cancellations, edits, shell commands and sensitive MCP actions.

LangGraph offers the same idea with **interrupts**: pause the graph at a point, wait for human input, then resume with an approve or reject, or with edited tool arguments.

## What deserves approval?

A useful test: *can this be undone, and how much does it cost if it's wrong?*

| Action | Approval? |
|---|---|
| Search, read, summarize | No |
| Draft a reply (not sent) | No |
| Send an email to a customer | Yes |
| Refund, payment, purchase | Yes |
| Delete data, run shell commands | Yes |

Too many approvals and people start clicking "yes" without reading. Keep them for the actions that really matter.

> Fast where it's safe. Human where it counts.

## Sources

- [OpenAI Agents SDK, Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)
- [LangGraph interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)
