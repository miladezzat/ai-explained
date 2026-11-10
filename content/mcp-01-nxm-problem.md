---
title: What problem does MCP solve? The N×M problem
slug: mcp-01-nxm-problem
description: Three AI apps and four tools need twelve custom integrations. MCP turns N×M connectors into N+M. Episode 1 of MCP from A to Z.
date: 2026-11-04
series: mcp-a-to-z
episode: 1
youtube: X83Uy04R8QU
facebook: https://facebook.com/reel/1191553140128905
instagram: https://www.instagram.com/p/DfUx_wojg4T/
tags: mcp, model context protocol, integrations, mcp a to z, ai agents
---
Three AI apps. Four tools. How many custom integrations do you need? **Twelve.** That's the problem the Model Context Protocol was built to solve.

## The N×M problem

Before MCP, every AI app wired up every tool by hand: Slack, GitHub, a database, your files. With N apps and M tools, that's **N × M** connectors. Add one new tool, and every app needs a new connector.

And each connector breaks in its own way: different auth, different data formats, different bugs.

Anthropic described it plainly when it launched MCP in November 2024: "Every new data source requires its own custom implementation, making truly connected systems difficult to scale."

## MCP flips it around

With MCP, each app speaks MCP **once**, and each tool speaks MCP **once**. Now it's **N + M**: three plus four is seven pieces, not twelve.

Picture it: twelve tangled wires become seven clean lines into one shared plug.

## It scales

A new tool ships one MCP server, and every MCP-compatible app can use it on day one. The GitHub MCP server, for example, works in Claude, in VS Code and in Cursor.

## The idea isn't new

The MCP spec says it takes inspiration from the **Language Server Protocol** (LSP), which did the same for code editors: one protocol so every editor can support every programming language.

## How far it's come

Anthropic open-sourced MCP in November 2024 and donated it to the **Agentic AI Foundation**, under the Linux Foundation, in December 2025. By then there were over 10,000 active public MCP servers and around 97 million SDK downloads a month.

## What MCP doesn't fix

- A bad tool is still a bad tool. MCP standardizes the plug, not the quality.
- Every server you add is code you have to trust, with access to your data.

## Tip

Before you build a connector, check whether an MCP server for it already exists.

**Next episode:** hosts, clients and servers, the three roles inside every MCP setup.

> Stop wiring N×M. Build N+M.

## Sources

- [MCP specification 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28)
- [Anthropic, Introducing the Model Context Protocol (2024-11-25)](https://www.anthropic.com/news/model-context-protocol)
- [Anthropic, Donating the Model Context Protocol and establishing the Agentic AI Foundation (2025-12-09)](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
