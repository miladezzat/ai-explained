---
title: stdio vs Streamable HTTP: the two MCP transports
slug: mcp-07-transports
description: MCP messages travel over stdio for local servers or Streamable HTTP for remote ones. How each works in the 2026-07-28 spec, and the rules to get right.
date: 2026-11-10
series: mcp-a-to-z
episode: 7
youtube: A9ZFMYUUYpE
facebook: https://facebook.com/reel/1071460835914685
instagram: https://www.instagram.com/p/DfkOePAiRU6/
tags: mcp, model context protocol, stdio, streamable http, transports
---
Every MCP message is the same JSON-RPC, but there are two very different ways to deliver it. The 2026-07-28 spec defines two standard **transports**: **stdio** for local servers and **Streamable HTTP** for remote ones. Last episode covered how MCP versions are dates; this one covers the pipes underneath.

## stdio: a local subprocess

With stdio, the client launches the server as a **subprocess**, and they talk over standard input and output.

- **One message per line.** Each message is one line of JSON-RPC, and it must not contain an embedded newline.
- **Keep stdout clean.** The server must never write anything to stdout that isn't an MCP message. Logs go to stderr instead.
- **Exit cleanly.** When the client closes standard input, the server should exit promptly.

```ts
console.log("ready");   // breaks the protocol
console.error("ready"); // fine: stderr
```

## Streamable HTTP: one endpoint, one POST per message

Streamable HTTP uses a **single endpoint**, such as `/mcp`. Every client message is a new HTTP POST to it.

- The client's `Accept` header lists both `application/json` and `text/event-stream`, and the server picks: one JSON reply, or a Server-Sent Events stream.
- A notification just gets `202 Accepted` with no body.
- Every POST carries the `MCP-Protocol-Version` header, plus `Mcp-Method`, and `Mcp-Name` for tools, resources and prompts.

```http
POST /mcp
MCP-Protocol-Version: 2026-07-28
Mcp-Method: tools/call
Mcp-Name: get_weather
```

## What changed in 2026-07-28

- **No sessions.** There's no `Mcp-Session-Id` anymore; MCP is stateless.
- **No GET stream.** The standalone GET stream is replaced by `subscriptions/listen`.
- **No resuming.** Streams are no longer resumable. If a response stream breaks, the client sends the request again.

## Security rules

- Servers **must validate the `Origin` header** to stop DNS rebinding attacks.
- When running locally, servers should **bind to localhost** (127.0.0.1), not every network interface.
- Servers should **require authentication** for all connections.

## The old HTTP+SSE transport

The HTTP+SSE transport from 2024-11-05 is **deprecated**. New servers shouldn't use it, and existing ones should migrate to Streamable HTTP.

| | stdio | Streamable HTTP |
|---|---|---|
| Where | Local subprocess | Remote endpoint |
| Framing | One JSON-RPC line | One POST per message |
| Replies | stdout | JSON or SSE stream |

**Next episode:** who runs MCP: open governance, SEPs and the deprecation policy.

> Local? stdio. Remote? Streamable HTTP.

## Sources

- [MCP specification 2026-07-28, Transports](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports)
- [MCP specification 2026-07-28, Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)
- [MCP specification 2026-07-28, Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
