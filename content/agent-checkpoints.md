---
title: Agent checkpoints and resumable runs: crash at step 9, resume at step 9
slug: agent-checkpoints
description: Agent checkpoints save a run's state as it goes, so a crash, a timeout or a long wait for a human doesn't mean starting over. How LangGraph and Temporal do it.
date: 2026-11-27
series: ai-explained
youtube: 2SPIxZPjF74
facebook: https://facebook.com/reel/1136323552643766
instagram: https://www.instagram.com/p/DgPPPpvIZqt/
tags: ai agents, durable execution, langgraph, temporal, reliability
---
Your agent crashes at step nine of twelve. **Does it start over from step one?** Without checkpoints it does, and every model call, tool call and dollar spent on steps one to eight is spent again.

## What a checkpoint is

A checkpoint is a saved copy of the agent's state as it runs, so a run can pick up where it left off. In LangGraph, checkpointers "persist a thread's graph state as checkpoints." A thread is one run or conversation, and you choose it by passing a `thread_id` in the graph config.

The LangGraph docs say the same feature serves several jobs: "short-term, thread-scoped memory, including conversation continuity, human-in-the-loop workflows, time travel, and fault tolerance." Persistence matters, they add, "when an agent needs to continue a conversation, resume after an interruption, recover from a failure, or remember information across interactions."

## Where checkpoints live

Where you store them decides whether they survive. "`MemorySaver` and `InMemorySaver` store checkpoints in RAM. When the process restarts, all checkpoints are lost." That is fine in a notebook and useless for crash recovery. For production the docs point to a persistent checkpointer, such as `PostgresSaver` ("PostgreSQL with async support"), with `SqliteSaver` as "Local file-based storage for development."

## Durable execution with Temporal

Temporal takes the idea further and calls it durable execution: "a Workflow resumes automatically after a crash, a network timeout, or a multi-day wait for a human to approve a step." Agents built this way "pick up exactly where they left off after a failure."

Pydantic AI's Temporal integration shows how the work is split. Workflows are the deterministic part, they "execute the same way when re-run with the same inputs." Activities are the non-deterministic part and "can run arbitrary code, performing I/O and any other operations." For an agent, that means "model requests, tool calls that may require I/O, and MCP server communication all need to be offloaded to Temporal activities," while "the logic that coordinates them (i.e. the agent run) lives in the workflow."

The payoff: "Temporal saves key inputs and decisions, allowing a re-started program to pick up right where it left off." A program that hits an exception while talking to a model or API "will retry until it can successfully complete."

## The catch: steps run again

Resuming is not free of repeats. In Temporal, "if an activity fails part-way through it is restarted from the beginning." So a step that sent an email, charged a card or wrote a row may run twice.

General practice: make side effects safe to repeat. Give each action an idempotency key, check whether it already happened before doing it again, and keep each step small so a retry repeats as little as possible.

Checkpoints also cost something to keep. LangGraph warns: "Over long conversations, checkpoints accumulate. This can increase latency and storage costs." Plan for cleanup.

## Checkpoint your own agent

General practice: save state after each step that costs real time or money, store it somewhere that survives a restart, key runs by a stable ID, and when something fails, resume the run instead of rerunning it.

> Save the state. Resume the run.

## Sources

- [LangGraph docs: Persistence](https://docs.langchain.com/oss/python/langgraph/persistence)
- [Temporal docs: Durable AI](https://docs.temporal.io/ai)
- [Pydantic AI docs: Durable execution with Temporal](https://pydantic.dev/docs/ai/capabilities/durable_execution/temporal/)
