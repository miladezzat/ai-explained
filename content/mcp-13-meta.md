---
title: MCP _meta: what every MCP request carries in 2026-07-28
slug: mcp-13-meta
description: In stateless MCP, every request carries its protocol version, client capabilities and client info in _meta. Here are the keys, the errors and the rules.
date: 2026-11-16
series: mcp-a-to-z
episode: 13
youtube: Q2xxflKwC04
facebook: https://facebook.com/reel/2387500818718531
instagram: https://www.instagram.com/p/DfzrcmXl26a/
tags: mcp, model context protocol, _meta, protocol version, capabilities
---
No handshake means every request has to introduce itself. That's what `_meta` is for. Last episode, MCP went stateless. Today: what every request now carries.

## Three keys in every request

In the 2026-07-28 spec, every request supplies its protocol metadata in its `_meta` field. Three keys matter most:

```json
"_meta": {
  "io.modelcontextprotocol/protocolVersion": "2026-07-28",
  "io.modelcontextprotocol/clientInfo": { "name": "ExampleClient", "version": "1.0.0" },
  "io.modelcontextprotocol/clientCapabilities": {}
}
```

1. **Protocol version** (`io.modelcontextprotocol/protocolVersion`): required on every request.
2. **Client capabilities** (`io.modelcontextprotocol/clientCapabilities`): also required, so the server knows what this client can do. A server must not rely on capabilities the client hasn't declared.
3. **Client info** (`io.modelcontextprotocol/clientInfo`): a name and a version. It's optional, but clients should send it on every request unless they're configured not to.

On the way back, servers should put `io.modelcontextprotocol/serverInfo` in every result's `_meta`. Both infos are self-reported by the sender and not verified by the protocol, so treat them as hints, not proof of identity.

## When something's wrong

- **Unsupported version.** The server answers with error `-32022` and lists the versions it does support in `data.supported`. The client should pick a mutually supported version and retry, or show an error if none match.
- **Missing or malformed fields.** That's `-32602` (Invalid params), and on HTTP a `400 Bad Request`.

## The HTTP header

Over Streamable HTTP, the version also travels in the `MCP-Protocol-Version` header, on every POST. Gateways and load balancers can read it without parsing the body. The header value must match the `_meta` value. If they disagree, the server must reject the request with `400 Bad Request` and a `HeaderMismatch` error.

## Your own keys

`_meta` is extensible, with naming rules:

- Your own keys need a prefix in reverse DNS notation, like `com.example/`.
- Any prefix whose second label is `modelcontextprotocol` or `mcp` (such as `io.modelcontextprotocol/` or `dev.mcp/`) is reserved for MCP itself.

**Next episode:** `server/discover`, and learning what a server can do.

> Every request introduces itself. Read its _meta.

## Sources

- [MCP specification 2026-07-28: Overview](https://modelcontextprotocol.io/specification/2026-07-28/basic)
- [MCP specification 2026-07-28: Versioning and Compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/lifecycle)
- [MCP specification 2026-07-28: Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)
