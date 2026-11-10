---
title: MCP: the Model Context Protocol
slug: mcp
description: MCP is an open standard that connects AI apps to tools and data. Build a connector once, and any MCP-compatible AI app can use it. Here's how it works.
date: 2026-10-25
series: ai-explained
youtube: NTI_m85ECfQ
facebook: https://facebook.com/reel/1460386506272533
tags: mcp, model context protocol, ai agents, tools, integrations
---
Every AI app wants to connect to the same things: GitHub, Slack, your database, your files. Before MCP, each app built its own connector for each service. The **Model Context Protocol** is an open standard that lets you build a connector once and use it everywhere.

## The USB-C idea

MCP's own docs compare it to USB-C for AI applications. Any device with a USB-C port works with any USB-C cable. In the same way, any AI app that speaks MCP can use any MCP server.

Anthropic introduced MCP as an open-source project in November 2024. Since then it has been adopted across the industry, by AI apps, IDEs and coding agents from many companies. In December 2025 Anthropic donated it to the Agentic AI Foundation, a fund under the Linux Foundation, and by then there were over 10,000 public MCP servers.

## The three roles

- **Host**: the AI application the user works in, like a chat app, an IDE or a coding agent.
- **Client**: the part of the host that talks to one server.
- **Server**: a small program that exposes a service, like GitHub or a database, in the MCP format.

The host can connect to many servers at once, and every server looks the same to it.

## What a server offers

MCP servers share three kinds of things:

1. **Tools**: actions the model can call, like `create_issue` or `run_query`.
2. **Resources**: data the app can read, like files, records or documents.
3. **Prompts**: reusable templates a user can pick, like "review this pull request".

Under the hood, messages are JSON-RPC, sent over a local process (stdio) or HTTP.

## Why it matters

- **For tool makers**: write one MCP server and it works in every MCP-compatible app.
- **For app builders**: add MCP support once and get a whole ecosystem of servers.
- **For users**: plug the same tools into whichever AI app you prefer.

## Be careful what you connect

An MCP server can read data and take actions for the model, so treat it like any other software with access to your accounts. Install servers you trust, give them the smallest permissions that work, and keep approval on for risky tools.

Want the full picture? The **[MCP from A to Z](/mcp-a-to-z/)** course on this site goes through the whole protocol, one episode at a time.

> Build it once. Use it everywhere.

## Sources

- [Anthropic, Introducing the Model Context Protocol (2024)](https://www.anthropic.com/news/model-context-protocol)
- [Model Context Protocol, documentation and specification](https://modelcontextprotocol.io/)
- [Anthropic, Donating the Model Context Protocol and establishing the Agentic AI Foundation (2025)](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
