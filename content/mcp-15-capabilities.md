---
title: MCP capabilities: how both sides say what they support
slug: mcp-15-capabilities
description: In the 2026-07-28 MCP spec, clients declare capabilities on every request and servers declare theirs in server/discover. Here are the fields, the rules and the new extensions map.
date: 2026-11-18
series: mcp-a-to-z
episode: 15
youtube: wap9894ffSU
facebook: https://facebook.com/reel/2045802749320839
instagram: https://www.instagram.com/p/Df41MLEl6fZ/
tags: mcp, model context protocol, capabilities, extensions, server/discover
---
Client meets server. How does each know what the other supports? **Capabilities.** Last episode, `server/discover` told us what a server offers. Today: the capability objects themselves.

## Two sets

There are two capability objects: `ClientCapabilities` and `ServerCapabilities`.

## Client capabilities: on every request

In stateless MCP, the client declares its capabilities in every request's `_meta`, under `io.modelcontextprotocol/clientCapabilities`. The schema puts it plainly: "Capabilities are declared per-request rather than once at initialization; an empty object means the client supports no optional capabilities."

The fields in 2026-07-28:

- **`elicitation`**, with `form` and `url` modes.
- **`roots`** and **`sampling`**: still in the schema, but now **deprecated**.
- **`extensions`** and **`experimental`**.

## Server capabilities: in server/discover

The server declares its capabilities in the `server/discover` result:

- **`tools`**, **`resources`**, **`prompts`** and **`completions`**.
- `tools`, `prompts` and `resources` carry a `listChanged` flag, and `resources` also has `subscribe`.
- **`logging`** is still listed, but deprecated in this version.
- Plus `extensions` and `experimental`.

## The rules

- **No reliance:** "A server MUST NOT rely on capabilities the client has not declared." It also must not infer capabilities from earlier requests.
- **Missing client capability:** if processing a request needs one the client didn't declare, the server returns `MissingRequiredClientCapabilityError`, code -32021.
- **Missing server capability:** call `prompts/list` on a server that didn't advertise `prompts`, and you get method not found, code -32601.
- **Elicitation modes:** "Servers MUST NOT send elicitation requests with modes that are not supported by the client."

## New: extensions

This version adds an `extensions` field to both sides: "a map of extension identifiers to per-extension settings objects." Extension IDs follow the `_meta` key naming rules, with a mandatory prefix, such as `io.modelcontextprotocol/ui` or `io.modelcontextprotocol/tasks`.

If only one side supports an extension, the side that does must either fall back to core behavior or reject the request with an error.

**Next episode:** Errors, and the difference between protocol errors and tool errors.

> Declare what you support. Never assume the rest.

## Sources

- [MCP specification 2026-07-28: Schema reference](https://modelcontextprotocol.io/specification/2026-07-28/schema)
- [MCP specification 2026-07-28: Basic](https://modelcontextprotocol.io/specification/2026-07-28/basic)
- [MCP specification 2026-07-28: server/discover](https://modelcontextprotocol.io/specification/2026-07-28/server/discover)
- [MCP specification 2026-07-28: Elicitation](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation)
- [MCP specification 2026-07-28: Versioning](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning)
- [MCP specification 2026-07-28: Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
