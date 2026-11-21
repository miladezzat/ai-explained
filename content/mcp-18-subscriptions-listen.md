---
title: MCP subscriptions/listen: one stream for change notifications
slug: mcp-18-subscriptions-listen
description: In the 2026-07-28 MCP spec, change notifications travel on one long-lived stream the client opens with subscriptions/listen. Here's the filter, the ack, subscription IDs and how a stream ends.
date: 2026-11-21
series: mcp-a-to-z
episode: 18
youtube: UEZBkYDl70E
facebook: https://facebook.com/reel/1482638827134486
instagram: https://www.instagram.com/p/DgAihktAP89/
tags: mcp, model context protocol, subscriptions, notifications, json-rpc
---
Your client wants to know when tools change. Where does it listen? **On one stream: `subscriptions/listen`.** Last episode covered notifications, the one-way nudges. Today: the stream they travel on.

## One long-lived stream

In the 2026-07-28 spec, "`subscriptions/listen` opens a long-lived notification stream from the server to the client." Unlike a normal request, it stays open and delivers notifications until the client cancels it. It replaces the old `resources/subscribe` call and the HTTP GET endpoint.

## Asking for what you want

The client sends the request with a `notifications` filter:

- `toolsListChanged`, `promptsListChanged`, `resourcesListChanged`: booleans for the three list changed notifications
- `resourceSubscriptions`: a list of resource URIs to watch for `notifications/resources/updated`

A request that watches tool changes and one config file looks like this (trimmed from the spec's example, which also carries the usual `_meta` fields):

```json
{"jsonrpc": "2.0", "id": 1, "method": "subscriptions/listen",
 "params": {"notifications": {
   "toolsListChanged": true,
   "resourceSubscriptions": ["file:///project/config.json"]}}}
```

Anything you leave out, you won't hear about.

"All fields are optional. Omitting a field is equivalent to not subscribing to that notification type." And the server side is strict: "The server **MUST NOT** send notification types the client has not explicitly requested."

## The acknowledgement

Before anything else on that subscription, the server must send `notifications/subscriptions/acknowledged`. Its filter "reflects the subset the server agreed to honor. Notification types the server does not support are omitted." So compare it with what you asked for, and handle missing types gracefully before you rely on them.

## Subscription IDs

Every notification on the stream carries `io.modelcontextprotocol/subscriptionId` in `_meta`. Its value is the JSON-RPC ID of the `subscriptions/listen` request that opened the stream.

That matters because a client may run several subscriptions at once, for example one for tools and another for resource updates. On stdio, where every message shares one channel, clients must use this ID to match each notification to its subscription.

## Ending a stream

- **Client stops:** close the SSE stream over HTTP, or send `notifications/cancelled` with the listen request's ID on stdio.
- **Server stops:** it should send a completion result for the original request, then close the stream.
- **Connection drops:** after a stdio reconnect, the client must send `subscriptions/listen` again, because "the server holds no subscription state across reconnections."

**Next episode:** progress updates and cancellation, for requests that take a while.

> One stream. Only what you asked for.

## Sources

- [MCP specification 2026-07-28: Subscriptions](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions)
