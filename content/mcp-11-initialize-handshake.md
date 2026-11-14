---
title: MCP's old initialize handshake, and why it was retired
slug: mcp-11-initialize-handshake
description: How legacy MCP connections opened with initialize, negotiated a version and capabilities, and what the stateless 2026-07-28 revision does instead.
date: 2026-11-14
series: mcp-a-to-z
episode: 11
youtube: 7DRlza_A0h8
facebook: https://facebook.com/reel/1078658501885545
instagram: https://www.instagram.com/p/DfujBs0j64X/
tags: mcp, model context protocol, initialize, version negotiation, stateless mcp
---
Before 2026-07-28, every MCP connection started with a handshake. Last episode, the Inspector's **legacy** mode used it. Today we look at the handshake itself: how it worked, and what replaced it.

## Three phases

In the legacy protocol (2025-11-25 and earlier), a connection has three phases:

1. **Initialization**: capability negotiation and protocol version agreement.
2. **Operation**: normal protocol communication.
3. **Shutdown**: graceful termination of the connection.

## The client goes first

The client must open with an `initialize` request. It carries three things:

- the **protocol version** the client wants,
- the client's **capabilities**,
- and **client info** (its name and version).

The server answers with its own `protocolVersion`, its `capabilities`, its `serverInfo`, and optional `instructions` for the client.

## Version negotiation

The rule is simple. If the server supports the version the client asked for, it responds with the same version. If not, it responds with another version it supports. If the client can't use that version either, it should disconnect.

## One more message

After a successful response, the client sends a `notifications/initialized` notification, and normal work begins. Until the server has answered `initialize`, the client should not send any requests except pings. Over HTTP, the client also sends an `MCP-Protocol-Version` header on every later request.

So the version and the capabilities were agreed **once**, at the start of a session, and everything after relied on that agreement.

## What 2026-07-28 changed

The 2026-07-28 revision makes MCP **stateless**. The changelog says it removes the `initialize` / `notifications/initialized` handshake (SEP-2575). Instead:

- every request carries its own protocol version and client capabilities in `_meta`,
- clients call **`server/discover`** to learn a server's supported versions, capabilities and identity,
- and protocol-level sessions are gone, along with the `Mcp-Session-Id` header (SEP-2567).

In the spec's words: "There is no negotiation handshake. Every request carries its protocol version, and the server accepts or rejects each request independently."

Note the wording. The spec doesn't list `initialize` in its deprecated registry. It describes legacy versions as the ones that "establish a session with an `initialize` handshake", and the modern protocol simply doesn't have one.

## Living with both eras

Old clients still exist. A server **may** support both eras: when a request opens with `initialize`, a dual-era server picks the legacy behavior. But a legacy client talking to a modern-only server fails. In that case the server should name the protocol versions it supports in the error it returns to `initialize`, so the client knows what went wrong.

**Next episode:** stateless MCP, and everything that changed in 2026-07-28.

> The handshake agreed things once. Now every request carries them.

## Sources

- [MCP specification 2025-11-25: Lifecycle](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle)
- [MCP specification 2026-07-28: Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
- [MCP specification 2026-07-28: Versioning and Compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/lifecycle)
- [MCP specification 2026-07-28: Deprecated features](https://modelcontextprotocol.io/specification/2026-07-28/deprecated)
