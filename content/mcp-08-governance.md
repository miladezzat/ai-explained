---
title: Who runs MCP? Governance, SEPs and the deprecation policy
slug: mcp-08-governance
description: MCP lives at the Agentic AI Foundation. How its maintainers decide, how a SEP moves from draft to final, and how long deprecated features stay in the spec.
date: 2026-11-11
series: mcp-a-to-z
episode: 8
youtube: X771BZQXdvk
facebook: https://facebook.com/reel/1482551027132764
instagram: https://www.instagram.com/p/DfmzWYKDXEl/
tags: mcp, model context protocol, governance, sep, deprecation policy
---
MCP started at Anthropic, but today no single company owns it. So who decides what goes into the spec? Last episode covered the two transports; this one covers the people and rules behind the protocol.

## A neutral home

In December 2025, Anthropic donated MCP to the **Agentic AI Foundation**, a fund under the **Linux Foundation**, co-founded with Block and OpenAI.

Membership in MCP's governance is **per person, not per company**: no seats are reserved for any company.

## Four roles

| Role | What they do |
|---|---|
| Contributors | Open issues, pull requests and discussions |
| Maintainers | Own working groups, SDKs and components |
| Core maintainers | Set the overall direction; can overrule maintainers by majority vote |
| Lead maintainers | Final decision authority, with a veto over everyone |

## SEPs: how big changes get in

Big changes need a **SEP**, a **Specification Enhancement Proposal**. That covers new features, breaking changes and governance or process changes. Bug fixes, typos and documentation clarifications don't need one: those are just pull requests.

A SEP needs two things before it can move:

- a **linked prior discussion**, and
- a **sponsor**: a maintainer or core maintainer who champions it through review.

It then goes from **draft** to **in-review**, and is **accepted** or **rejected**. Core maintainers review SEPs every two weeks. There are also statuses for withdrawn, superseded and dormant proposals.

The bars are concrete:

- **Accepted** needs a prototype implementation.
- **Final** needs a reference implementation, and for Standards Track SEPs, a conformance test.

## Interest groups and working groups

- **Interest groups** identify and discuss problems.
- **Working groups** build concrete solutions, like SEPs and code.

## The deprecation policy

When a feature has to go, MCP follows a **feature lifecycle**: active, deprecated, removed.

- A deprecated feature stays in the spec for **at least twelve months** before it can be removed.
- Only an **active security risk** can shorten that, and never below **ninety days**.

A real example: **roots, sampling and logging** were deprecated in the 2026-07-28 spec. They can't be removed before a revision released on or after 2027-07-28.

**Next episode:** add your first MCP server to Claude, VS Code or Cursor.

> Open spec, open process, no surprise removals.

## Sources

- [Anthropic, Donating MCP and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
- [Linux Foundation, Formation of the Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- [MCP Governance](https://modelcontextprotocol.io/community/governance)
- [MCP SEP guidelines](https://modelcontextprotocol.io/community/sep-guidelines)
- [MCP Working and Interest Groups](https://modelcontextprotocol.io/community/working-interest-groups)
- [MCP Feature lifecycle](https://modelcontextprotocol.io/community/feature-lifecycle)
- [MCP 2026-07-28 deprecated features](https://modelcontextprotocol.io/specification/2026-07-28/deprecated)
