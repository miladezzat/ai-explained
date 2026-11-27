---
title: Toxic flow analysis for AI agents: check the flow, not just the tool
slug: toxic-flow-analysis
description: Toxic flow analysis maps how data can move between an AI agent's tools and flags combinations that let an attacker reach sensitive data. How it works, the GitHub example, and how to fix a toxic flow.
date: 2026-11-27
series: ai-explained
youtube: T8FiNpW0IpA
facebook: https://facebook.com/reel/1669622644576289
instagram: https://www.instagram.com/p/DgQTLZ6nXZo/
tags: ai security, ai agents, mcp, prompt injection, threat modeling
---
Every tool your agent uses looks safe on its own. **Together, they can leak your data.** Toxic flow analysis is a way to see that before an attacker does.

## What a toxic flow is

Snyk defines a toxic flow as "a sequence of agent actions that takes an environment from attacker-controlled instructions to sensitive data." The idea comes from Invariant Labs, now Snyk's research division, which presented "the toxic flow analysis (TFA) framework to detect and mitigate security vulnerabilities in agent systems before they are exploited."

The shift is in what you inspect. Instead of judging one prompt or one tool at a time, toxic flow analysis looks at how data can move between all of an agent's tools.

## How the analysis works

TFA "first instantiates the flow graph of an agent system, modelling all tool flows." Each tool is labelled with "relevant properties like the level of trust, sensitiveness or e.g. whether a tool could be used as an exfiltration sink." In plain terms: can this tool bring in untrusted content, can it touch sensitive data, and can it send data out?

When one agent combines all three, Snyk calls it "the lethal trifecta," and the environment is at risk "regardless of how carefully each component was introduced."

Invariant describes TFA as "a hybrid security analysis framework," combining static configuration with dynamic runtime data. From that graph, "TFA identifies and scores potential toxic flows," and Snyk notes it "can assign impact scores based on factors such as data classification."

## The GitHub example

Invariant's motivating case is a GitHub MCP exploit in which "a malicious actor is able to exfiltrate sensitive data from a GitHub repository by injecting a prompt into an AI agent." Snyk walks through the same pattern: "An attacker opens an issue in that repository with detailed instructions." The agent reads the issue, follows the hidden instructions, and moves sensitive repository data somewhere the attacker can see it. No single tool was malicious. The flow was.

## Why prompt filters miss it

"Prompt filters and LLM firewalls inspect individual prompts and responses," Snyk writes, and "have little visibility into the intermediate tool calls and data movements." Toxic flow analysis moves "beyond simplistic prompt-level input validation": instead of reacting to a bad prompt, it "pre-emptively predicts the risk of attacks."

## Finding and fixing toxic flows

Snyk released "an early preview of Toxic Flow Analysis as a part of the MCP-scan security scanning tool," which reports potential vulnerabilities in the agent setups on your machine. Thoughtworks says it has "successfully used tools such as Agent Scan to perform this analysis," and moved toxic flow analysis for AI to Trial on its Technology Radar in November 2026, after listing it at Assess in November 2025 and April 2026.

To fix a flow, Snyk describes runtime guardrails that "block the sequence, request additional authorization, or route the request through a safer pattern," and policies that "prevent that specific combination, while leaving other flows intact."

General practice: before you add a tool or MCP server to an agent, ask which flow it completes, not just whether the tool itself is safe.

> Check the flow, not just the tool.

## Sources

- [Invariant Labs: Toxic flow analysis](https://invariantlabs.ai/blog/toxic-flow-analysis)
- [Snyk: Understanding toxic flows in MCP](https://snyk.io/articles/understanding-toxic-flows-mcp/)
- [Snyk Labs: Toxic flow analysis](https://labs.snyk.io/resources/toxic-flow-analysis/)
- [Thoughtworks Technology Radar: Toxic flow analysis for AI](https://www.thoughtworks.com/radar/techniques/toxic-flow-analysis-for-ai)
