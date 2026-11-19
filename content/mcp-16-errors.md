---
title: MCP errors: protocol errors vs tool errors (isError)
slug: mcp-16-errors
description: In the 2026-07-28 MCP spec, a tool call can fail in two ways. Here's the difference between protocol errors and tool execution errors, and which one the model should see.
date: 2026-11-19
series: mcp-a-to-z
episode: 16
youtube: 3BLPWNF0pTY
facebook: https://facebook.com/reel/29698069353131774
instagram: https://www.instagram.com/p/Df7ZceUDFnL/
tags: mcp, model context protocol, errors, iserror, tools
---
A tool fails. Who sees the error: your code or the model? **MCP has two answers.** Last episode, capabilities told each side what the other supports. Today: what happens when something goes wrong.

## Two mechanisms

The spec says tools "use two error reporting mechanisms": **protocol errors** and **tool execution errors**.

## Protocol errors

A protocol error is a standard JSON-RPC error, with a `code`, a `message` and optional `data`:

```json
{ "error": { "code": -32602, "message": "Unknown tool: invalid_tool_name" } }
```

MCP reuses the JSON-RPC codes for general protocol failures, such as `-32601` (method not found) and `-32602` (invalid params).

Protocol errors are problems with the request itself:

- an unknown tool,
- a malformed request that doesn't fit the `tools/call` request schema,
- a server error.

The spec says these are issues "that models are less likely to be able to fix." So clients **may** pass them to the model, but don't have to.

## Tool execution errors

Tool execution errors are different. The request was fine, but the tool itself failed. They come back as a normal tool result, with `isError` set to `true` and the message in the content:

```json
{ "content": [{ "type": "text", "text": "Invalid departure date: must be in the future." }], "isError": true }
```

The spec's examples are API failures, input validation errors and business logic errors. So bad arguments, like a date in the wrong format or a value out of range, are tool execution errors, not protocol errors. The schema says it directly: invalid tool arguments "are instead reported as tool execution errors, with isError set to true."

Why the split? Tool execution errors "contain actionable feedback that language models can use to self-correct and retry." That's why the spec says clients **should** provide them to the model, "to enable self-correction."

In the example above, the model reads "must be in the future", fixes the date, and calls the tool again.

## For server authors

A practical habit (general practice, not a spec rule): make error text specific. Say what was wrong, and what a valid value looks like. A vague "something went wrong" gives the model nothing to fix.

One cleanup: `-32002`, resource not found, is now a legacy code. In this version it's replaced by `-32602`, invalid params, and servers must not emit `-32002` anymore.

**Next episode:** Notifications, and how `list_changed` tells clients a list has changed.

> Broken request? Protocol error. Failed tool? Tell the model.

## Sources

- [MCP specification 2026-07-28: Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
- [MCP specification 2026-07-28: Schema reference](https://modelcontextprotocol.io/specification/2026-07-28/schema)
- [MCP specification 2026-07-28: Basic](https://modelcontextprotocol.io/specification/2026-07-28/basic)
