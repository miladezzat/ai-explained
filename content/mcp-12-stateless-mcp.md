---
title: Stateless MCP: what changed in the 2026-07-28 spec
slug: mcp-12-stateless-mcp
description: The 2026-07-28 MCP revision makes every request self-contained. Here's what went away (sessions, callbacks, resumability) and what replaced it.
date: 2026-11-15
series: mcp-a-to-z
episode: 12
youtube: 1YvSF_NqsbE
facebook: https://facebook.com/reel/1152066457681388
instagram: https://www.instagram.com/p/DfxGEkwlNBh/
tags: mcp, model context protocol, stateless mcp, streamable http, mrtr
---
In the 2026-07-28 revision, MCP stopped remembering you between requests. Last episode covered the retired `initialize` handshake. Today: everything else that changed when MCP went **stateless**.

## The new rule

The spec puts it in one sentence: "all the information needed to process a request is contained in the request itself." A server handles each request independently, and "no state should be inferred from previous requests, even those on the same connection or stream." Servers also shouldn't require a client to reuse the same connection or process for related operations.

## Sessions are gone

Protocol-level sessions are removed, and so is the `Mcp-Session-Id` header (SEP-2567). If a server needs state across calls, it mints an explicit **handle** and the client passes it back as an ordinary tool argument. State that spans requests must always be referenced by an identifier the client sends each time.

## One POST per message

Over Streamable HTTP, the client sends every JSON-RPC request or notification as its own HTTP POST. The server answers with a single JSON object, or with an SSE stream scoped to that one request. Stream resumability is gone too: no `Last-Event-ID` and no message redelivery.

## No more calls back to the client

Before, a server could send requests back to the client mid-call, such as `sampling/createMessage`, `elicitation/create` or `roots/list`. The **Multi Round-Trip Requests** pattern (MRTR, SEP-2322) replaces that. The server returns an input-required result listing what it needs, the client gathers the answers, and it retries the original request with them. To make this explicit, every result now carries a required `resultType` field.

## Other changes

- **Subscriptions:** one `subscriptions/listen` request replaces the old HTTP GET stream and `resources/subscribe` / `resources/unsubscribe`.
- **Removed:** `ping`, `logging/setLevel` and `notifications/roots/list_changed`.
- **Tasks:** moved out of the core protocol into an official extension, `io.modelcontextprotocol/tasks` (SEP-2663).
- **Cacheable lists:** results from `tools/list`, `prompts/list`, the resource lists and `resources/read` now carry `ttlMs` (a freshness hint) and `cacheScope` (`public` or `private`), so clients can cache them and poll less (SEP-2549).

**Next episode:** `_meta`, and how every request carries its version, client info and capabilities.

> No sessions to remember. Every request stands on its own.

## Sources

- [MCP specification 2026-07-28: Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
- [MCP specification 2026-07-28: Overview (Statelessness)](https://modelcontextprotocol.io/specification/2026-07-28/basic)
- [MCP specification 2026-07-28: Transports](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports)
