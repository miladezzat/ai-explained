---
title: MCP tools vs resources vs prompts
slug: mcp-03-server-primitives
description: Every MCP server offers the same three primitives: tools, resources and prompts. What matters is who decides to use each one. Episode 3 of MCP from A to Z.
date: 2026-11-06
series: mcp-a-to-z
episode: 3
youtube: 6WnU1xvC4qk
facebook: https://facebook.com/reel/1868761571212055
instagram: https://www.instagram.com/p/DfZ67fcjDiX/
tags: mcp, mcp tools, mcp resources, mcp prompts, mcp a to z
---
Every MCP server offers the same three things: **tools, resources and prompts**. What matters is who decides to use each one.

Last episode: servers offer capabilities to clients. Today: the three primitives, in depth.

## Each one has a different boss

| Primitive | Controlled by | What it is | Example |
|---|---|---|---|
| Tools | The model | Functions the model can call | Send a POST request, write a file |
| Resources | The application | Data the app attaches as context | File contents, git history |
| Prompts | The user | Templates the user picks | A "review this code" slash command |

## Tools: the model decides

Tools are functions the model can call. Because the model decides when to call one, the spec says apps should present confirmation prompts, so you can approve first.

- A client finds tools with `tools/list`.
- It runs one with `tools/call`, passing a name and arguments.
- If a tool fails, the result says `isError: true`, so the model sees what went wrong and can try again.

```json
{ "method": "tools/call",
  "params": { "name": "create_issue",
              "arguments": { "title": "Login button broken" } } }
```

## Resources: the app decides

Resources are data the server shares: file contents, a database schema, git history. Each one is identified by a **URI**, like a `file://` path, a `git://` address, or a custom scheme.

Resources are application-controlled: the app decides what context to attach, not the model.

- Clients use `resources/list`, then read one by its URI.
- **Templates** describe whole families of URIs, like `file:///logs/{date}.txt`.
- A client can **subscribe** to a resource; when it changes, the server sends a notification.

## Prompts: the user decides

Prompts are reusable templates the server offers, like a code review prompt that takes your code as an argument. They're user-controlled: you pick one, often as a slash command.

The client calls `prompts/get` with the arguments and gets back ready-made messages for the model.

## Why the split matters

Knowing who's in control tells you where to put safety checks. Tools need confirmation because the model can trigger them. Resources need the app to choose wisely what to share. Prompts only run when you ask.

**Next episode:** from tool calls to MCP, and what the protocol adds on top.

> Tools act, resources inform, prompts guide.

## Sources

- [MCP specification 2026-07-28, Server features overview](https://modelcontextprotocol.io/specification/latest/server/index)
- [MCP specification, Tools](https://modelcontextprotocol.io/specification/latest/server/tools)
- [MCP specification, Resources](https://)
- [MCP specification, Prompts](https://modelcontextprotocol.io/specification/latest/server/prompts)
