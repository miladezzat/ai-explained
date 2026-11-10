---
title: How MCP is versioned
slug: mcp-06-versioning
description: MCP versions aren't 1.0 or 2.0, they're dates. What each version from 2024-11-05 to 2026-07-28 changed, and how clients and servers agree on one. Episode 6.
date: 2026-11-09
series: mcp-a-to-z
episode: 6
youtube: XPyJl1lNtTg
facebook: https://facebook.com/reel/2200536860557020
instagram: https://www.instagram.com/p/Dfhp_XtjNJe/
tags: mcp, mcp versioning, mcp specification, mcp a to z, protocols
---
MCP versions aren't 1.0 or 2.0. They're **dates**.

Last episode: the JSON-RPC messages. Today: how the protocol around them changes safely.

## Dates mark breaking changes

Each version is a date, like `2026-07-28`. The spec says it marks "the last date backwards incompatible changes were made". Backwards-compatible updates don't get a new date: the version only moves when something could break.

A revision is **draft**, **current** or **final**. Final ones never change. The current one is **2026-07-28**.

## The story so far

| Version | Highlights |
|---|---|
| 2024-11-05 | The first release: stdio, and HTTP with Server-Sent Events |
| 2025-03-26 | OAuth 2.1 authorization, Streamable HTTP, tool annotations, JSON-RPC batching |
| 2025-06-18 | Batching removed again; structured tool output and elicitation added |
| 2025-11-25 | Experimental tasks, URL-mode elicitation, icons |
| 2026-07-28 | Stateless MCP: no initialize handshake, no protocol-level sessions |

## How a version is agreed now

Since 2026-07-28 there's no negotiation handshake. Instead:

1. **Every request carries its version** in `_meta`, and over HTTP in the `MCP-Protocol-Version` header too.
2. If the server doesn't support it, it returns error **-32022** (unsupported protocol version), with the list of versions it does support.
3. The client picks a version from that list and **retries** the request.

Or the client can ask first: **`server/discover`** returns the supported versions, capabilities and server identity.

## Old clients still work

A server may keep serving older clients that still use the `initialize` handshake, side by side with new stateless ones.

## Why dates?

A date tells you immediately how old a client or server is, and makes "is this compatible?" a simple comparison. And because only breaking changes move the date, small improvements reach everyone without a version bump.

**Next episode:** transports, stdio versus Streamable HTTP.

> Dates, not numbers. Breaking changes only.

## Sources

- [MCP specification, Versioning](https://modelcontextprotocol.io/specification/versioning)
- [MCP specification 2026-07-28, Versioning](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning)
- [MCP changelogs](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
