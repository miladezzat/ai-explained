---
title: JSON-RPC 2.0 in MCP
slug: mcp-05-json-rpc
description: Every MCP message is plain JSON-RPC 2.0. Requests, responses and notifications, ids, error codes and resultType, explained. Episode 5 of MCP from A to Z.
date: 2026-11-08
series: mcp-a-to-z
episode: 5
youtube: nibsAY6Dg9I
facebook: https://facebook.com/reel/1123531356756495
instagram: https://www.instagram.com/p/DffFD0vDhFT/
tags: mcp, json-rpc, mcp a to z, protocols, mcp specification
---
Every MCP message is plain JSON. Here's the format underneath all of it: **JSON-RPC 2.0**.

Last episode: what MCP adds to plain tool calls. Today: the messages that carry it.

## A tiny RPC format

JSON-RPC 2.0 is a small remote procedure call format. It's **transport agnostic**: the same messages work over stdio or HTTP. There are only three kinds of messages: **requests, responses and notifications**.

## Requests

A request sets `jsonrpc` to `"2.0"`, then adds a `method`, optional `params`, and an `id`:

```json
{ "jsonrpc": "2.0", "id": 7, "method": "tools/list", "params": {} }
```

In MCP, the id **must be a string or an integer**. Unlike base JSON-RPC, it can never be null, and it's never reused while a request is still pending.

## Responses

The response echoes the same `id`, so the client knows which request it answers. It holds a `result` **or** an `error`, never both.

```json
{ "jsonrpc": "2.0", "id": 7,
  "result": { "resultType": "complete", "tools": [ ... ] } }
```

Since the 2026-07-28 spec, every MCP result has a **`resultType`**: `complete`, or `input_required` when the server needs more from the client.

## Errors

An error has an integer `code`, a `message`, and optional `data` with details. Standard codes include:

| Code | Meaning |
|---|---|
| -32601 | Method not found |
| -32602 | Invalid params |
| -32022 | (MCP) Unsupported protocol version, with the versions it does support |

## Notifications

A notification has **no id**, so the receiver must not reply. It's fire and forget:

```json
{ "jsonrpc": "2.0", "method": "notifications/tools/list_changed" }
```

This one tells the client to refresh its tool list.

## `_meta`: every message stands alone

Each MCP request's `_meta` carries the protocol version and client capabilities, so every message stands on its own, with no session state needed.

**Next episode:** how MCP is versioned, from 2024-11-05 to 2026-07-28.

> Request, response, notification. That's the whole grammar.

## Sources

- [JSON-RPC 2.0 specification](https://www.jsonrpc.org/specification)
- [MCP specification 2026-07-28, Basic](https://modelcontextprotocol.io/specification/latest/basic/index)
- [MCP specification 2026-07-28, Versioning](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning)
