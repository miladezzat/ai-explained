---
title: MCP notifications and list_changed: how clients hear about changes
slug: mcp-17-notifications
description: In the 2026-07-28 MCP spec, notifications are one-way messages. Here's how list_changed and resource updates work, how clients opt in, and what this version removed.
date: 2026-11-20
series: mcp-a-to-z
episode: 17
youtube: EcXanT4QmSk
facebook: https://facebook.com/reel/3210781815980224
instagram: https://www.instagram.com/p/Df997mzF7u7/
tags: mcp, model context protocol, notifications, list_changed, subscriptions
---
A server adds a new tool. How does the client find out? **A notification.** Last episode covered protocol errors versus tool errors. Today: messages that expect no answer at all.

## What a notification is

A notification is a one-way JSON-RPC message. It has a `method` and `params`, but no `id`:

```json
{ "jsonrpc": "2.0", "method": "notifications/tools/list_changed" }
```

The spec is strict about both sides: notifications "MUST NOT include an ID," and "the receiver MUST NOT send a response."

## list_changed

The best known notifications are the list changed ones, for tools, prompts and resources.

A server that sends them declares `listChanged: true` for that feature in its capabilities. For tools, "`listChanged` indicates whether the server will emit notifications when the list of available tools changes."

The flow is simple:

1. The server's tools change.
2. It sends `notifications/tools/list_changed`.
3. The client calls `tools/list` again to get the new list, as the spec's sequence diagrams show.

Think of it as a nudge: something changed, so come and look.

## Resources: two flags

Resources have two separate flags. `listChanged` covers the list of resources. `subscribe` covers updates to a single resource: the server sends `notifications/resources/updated` "whenever a watched resource changes."

## How they're delivered in this version

In the 2026-07-28 spec, clients opt in to each notification type, and "the server MUST NOT send notification types the client has not explicitly requested."

They arrive on one stream that the client opens with `subscriptions/listen`. The old standalone GET stream is gone. So are `resources/subscribe` and `resources/unsubscribe`, which `subscriptions/listen` replaces, and the roots list changed notification.

Other notifications remain. Progress updates, for example, flow on the stream of the request they belong to.

## Tips for authors

Some practical habits (general practice, not spec rules):

- **Server authors:** declare the `listChanged` flag first, and only send list changed when the list really changes.
- **Client authors:** refetch the list when notified, so the model always sees the current tools.

**Next episode:** `subscriptions/listen`, one stream for all change notifications.

> Don't poll. Get notified.

## Sources

- [MCP specification 2026-07-28: Basic](https://modelcontextprotocol.io/specification/2026-07-28/basic)
- [MCP specification 2026-07-28: Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
- [MCP specification 2026-07-28: Resources](https://modelcontextprotocol.io/specification/2026-07-28/server/resources)
- [MCP specification 2026-07-28: Subscriptions](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions)
- [MCP specification 2026-07-28: Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
