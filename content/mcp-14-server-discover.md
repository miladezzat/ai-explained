---
title: MCP server/discover: learning what a server can do
slug: mcp-14-server-discover
description: In the 2026-07-28 MCP spec, server/discover returns a server's supported versions, capabilities and identity in one request. Here's what it returns and when to call it.
date: 2026-11-17
series: mcp-a-to-z
episode: 14
youtube: FxHCXcNt8NU
facebook: https://facebook.com/reel/1435111468608859
instagram: https://www.instagram.com/p/Df2P2XSl_QL/
tags: mcp, model context protocol, server/discover, capabilities, protocol version
---
What can this server do, and which versions does it speak? One request answers both: `server/discover`. Last episode, every request started carrying its own `_meta`. Today: the request built for introductions.

## What it is

In the 2026-07-28 spec, `server/discover` "lets a client query a server's supported protocol versions, capabilities, and identity before sending any other requests."

- **Servers MUST implement it.**
- **For clients, calling it is optional.**

## The request

It has no body parameters beyond the standard `_meta`, which every request already carries: the protocol version and the client's capabilities (and, ideally, the client's info).

## The result

- **`supportedVersions`**: the list of spec versions the server speaks, such as `"2026-07-28"`.
- **`capabilities`**: which features the server offers, like `tools` or `resources`.
- **Server info** in the result's `_meta` (`io.modelcontextprotocol/serverInfo`): its name and version. Servers SHOULD include it.
- **`instructions`**: an optional field with natural-language guidance for the LLM.
- **`ttlMs`** and **`cacheScope`**: caching hints (more below).

## When to call it

- **To show a server's details** in a single round trip.
- **As a probe over stdio:** a client that supports both older and newer protocol versions SHOULD send `server/discover` first.

But there's no required order. A client may call any method directly and handle a version error if one comes back. Ask for a version the server doesn't support and you get `UnsupportedProtocolVersionError`, code -32022, with the list of supported versions in `data.supported`, and a 400 Bad Request on HTTP.

## Caching

The result can be cached. `ttlMs` is the server's hint for how many milliseconds the client may consider it fresh, and `cacheScope` marks it as `public` or `private`.

## Over HTTP

Nothing special: it's another POST to the single MCP endpoint, with the `MCP-Protocol-Version` header like every other request.

## Not a handshake

The changelog removed the `initialize` handshake and added `server/discover`, but discover isn't a new handshake. The versioning page is explicit: "There is no negotiation handshake." And servers must not rely on prior requests over the same connection, so nothing from a discover call carries over to the next request.

**Next episode:** Capabilities, and how both sides say what they support.

> Ask once, and know what the server speaks.

## Sources

- [MCP specification 2026-07-28: server/discover](https://modelcontextprotocol.io/specification/2026-07-28/server/discover)
- [MCP specification 2026-07-28: Versioning](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning)
- [MCP specification 2026-07-28: Basic](https://modelcontextprotocol.io/specification/2026-07-28/basic)
- [MCP specification 2026-07-28: Caching](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/caching)
- [MCP specification 2026-07-28: Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)
- [MCP specification 2026-07-28: Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
