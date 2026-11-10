---
title: From tool calls to MCP: what the protocol adds
slug: mcp-04-tool-calls-to-mcp
description: Your LLM can already call functions. So why does MCP exist? What MCP adds on top of plain tool calls: discovery, schemas, change notifications and auth. Episode 4.
date: 2026-11-07
series: mcp-a-to-z
episode: 4
youtube: 8kk6VHFmLN4
facebook: https://facebook.com/reel/1115597394722468
instagram: https://www.instagram.com/p/Dfcf32nDT5R/
tags: mcp, function calling, tool use, mcp a to z, json schema
---
Your LLM can already call functions. So why does MCP exist at all?

Last episode: tools, resources and prompts. Today: what MCP adds on top of plain tool calls.

## Plain function calling

With plain function calling, you paste tool definitions into every API request, and your own code runs them. That works, but every tool is **glued to one app**. Move to another host, and you rewrite the glue.

## MCP moves the tools out

MCP moves tools into a **server**. Any MCP host can connect to it and use them. Here's what you get on top:

**Discovery at runtime.** Hosts don't hard-code the tool list. They ask the server with `tools/list` when they need it.

**A standard definition.** Each tool comes with a name, a description and an `inputSchema` that "MUST be a valid JSON Schema object".

**Structured results.** A tool can also declare an `outputSchema`, so results come back as structured data you can check.

**Hints, carefully.** Tools can carry **annotations**, like "read-only" or "destructive". But the spec says clients must treat them as untrusted unless the server is trusted.

**Live updates.** When the tool list changes, the server sends `notifications/tools/list_changed`, so the host picks up new tools without a restart.

```json
{
  "name": "search_issues",
  "description": "Search issues in a repository",
  "inputSchema": {
    "type": "object",
    "properties": { "query": { "type": "string" } },
    "required": ["query"]
  }
}
```

## Versions and capabilities on every request

Since the 2026-07-28 spec, there's **no initialize handshake**. Every request carries its protocol version and the client's capabilities. A client can still call `server/discover` to learn what the server supports up front.

## Local or remote, same server

The same server can run **locally over stdio** or **remotely over Streamable HTTP**. Remote servers get a **standard authorization framework**, so you don't invent auth for every integration.

## More than tools

And tools are only part of it: the same connection also serves **resources** and **prompts**.

## Plain tools vs MCP

| | Plain function calling | MCP |
|---|---|---|
| Where tools live | Inside your app | In a reusable server |
| Tool list | Hard-coded per request | Discovered at runtime |
| Reuse across apps | Rewrite the glue | Connect any MCP host |
| Auth for remote tools | Your own | Standard framework |

**Next episode:** JSON-RPC 2.0, the message format under all of this.

> Function calling runs tools. MCP shares them.

## Sources

- [MCP specification 2026-07-28, Tools](https://modelcontextprotocol.io/specification/latest/server/tools)
- [MCP specification 2026-07-28, Changelog and Versioning](https://modelcontextprotocol.io/specification/latest/changelog)
- [MCP specification 2026-07-28, Transports and Basic](https://modelcontextprotocol.io/specification/latest/basic/transports)
