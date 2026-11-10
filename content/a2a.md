---
title: A2A: the Agent2Agent protocol
slug: a2a
description: MCP connects an agent to tools. A2A connects agents to each other, so agents built by different teams and vendors can find each other and share work.
date: 2026-10-25
series: ai-explained
youtube: Xnp2MDukOTk
facebook: https://facebook.com/reel/1165947319089903
tags: a2a, agent2agent, ai agents, multi-agent systems, protocols
---
More and more companies run AI agents: one for travel booking, one for expenses, one for IT tickets. Often they're built by different teams on different frameworks. How does one agent hand work to another? That's what **A2A**, the Agent2Agent protocol, is for.

## A2A vs MCP

The two protocols are easy to mix up, but they solve different problems:

- **MCP** connects an agent to **tools and data**: a database, GitHub, a file system.
- **A2A** connects an agent to **other agents**: independent systems with their own reasoning and their own tools.

They're designed to work together. An agent might use A2A to delegate a task to another agent, which then uses MCP to reach the tools it needs.

## Where it came from

Google announced A2A in April 2025 with a long list of partners, and later handed it to the Linux Foundation, so it's developed as an open, vendor-neutral project.

## How it works

**Discovery with an Agent Card.** Each agent publishes an Agent Card, a JSON document at a well-known URL that describes who it is, what skills it offers, where to reach it and how to authenticate. Another agent reads the card to decide whether to delegate.

**Tasks.** The client agent sends a task to the remote agent. The task has a lifecycle (submitted, working, needs input, completed, failed), so long-running work is normal, not an exception.

**Messages and artifacts.** The agents exchange messages while they work, and the remote agent returns its results as artifacts: text, files or structured data.

**Built on web standards.** A2A uses HTTP, JSON-RPC and server-sent events for streaming updates, so it fits into existing infrastructure and security.

## Opaque by design

A remote agent doesn't have to reveal its internal prompts, memory or tools. It only exposes what's on its Agent Card. That lets companies collaborate through agents without exposing how each one works inside.

## When you need it

If all your agents live in one codebase, a framework's built-in handoffs are simpler. A2A shines when agents cross boundaries: different teams, different vendors, or different companies.

> MCP for tools. A2A for teammates.

## Sources

- [Google Developers Blog, Announcing the Agent2Agent Protocol (A2A) (2025)](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [A2A protocol, documentation and specification](https://a2a-protocol.org/)
- [Linux Foundation, launch of the Agent2Agent protocol project](https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents)
