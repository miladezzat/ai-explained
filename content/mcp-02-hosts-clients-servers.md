---
title: MCP host vs client vs server
slug: mcp-02-hosts-clients-servers
description: Everyone says MCP client and server, but there's a third role in charge: the host. Who does what in MCP, and why servers can't see your whole conversation. Episode 2.
date: 2026-11-05
series: mcp-a-to-z
episode: 2
youtube: ElpDFRiI7SI
facebook: https://facebook.com/reel/2641167269652079
instagram: https://www.instagram.com/p/DfXW6h6FE5T/
tags: mcp, mcp architecture, mcp a to z, mcp host, mcp server
---
Everyone talks about MCP clients and MCP servers. But there's a third role, and it's the one in charge: the **host**.

Last episode: MCP turns N×M connectors into N+M. Today: who actually talks to whom.

## The three roles

**The host** is the AI app you actually use: Claude, VS Code, Cursor, or your own agent. The spec makes it the coordinator. It creates and manages clients, enforces security policies, and handles your consent and authorization decisions.

**The client** lives inside the host. Each client talks to **exactly one server**. Connect three servers, and the host makes three clients. That one-to-one link keeps every connection separate.

**The server** is the program that offers capabilities: tools, resources and prompts. It can be a local process or a remote service.

## An example from the docs

VS Code is the host. It creates one client for the **Sentry** MCP server and another for your **local filesystem** server.

- The filesystem server runs locally, over standard input and output (**stdio**).
- Sentry's server is remote, over **Streamable HTTP**.

A local stdio server usually serves one client. A remote server usually serves many.

## The key rule: servers are kept apart

The spec is clear:

- Servers should not be able to **read the whole conversation**.
- Servers should not be able to **see into other servers**.
- The **full conversation history stays with the host**. Each server only gets what the host sends it.
- **Cross-server interactions are controlled by the host.**

So one bad server can't spy on the others. The host decides what crosses between them.

```text
          ┌──────────── Host (VS Code) ────────────┐
          │  conversation, consent, security       │
          │   Client A            Client B         │
          └─────┬───────────────────┬──────────────┘
                │ stdio             │ Streamable HTTP
         Filesystem server      Sentry server
```

## Servers can ask back

Servers can also send requests to the client, like asking you for a missing detail. But asking the client's model for completions is now deprecated in the current spec.

**Next episode:** the three server primitives, tools, resources and prompts, in depth.

> The host leads, clients connect, servers serve.

## Sources

- [MCP specification 2026-07-28, Architecture](https://modelcontextprotocol.io/specification/2026-07-28/architecture)
- [MCP docs, Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture)
