---
title: MCP progress and cancellation for long requests
slug: mcp-19-progress-cancellation
description: In the 2026-07-28 MCP spec, a progress token gets you progress notifications, and cancelling works differently on stdio and Streamable HTTP. Here are the rules.
date: 2026-11-22
series: mcp-a-to-z
episode: 19
youtube: 4MxkmvJwvoE
facebook: https://facebook.com/reel/1143789508200643
instagram: https://www.instagram.com/p/DgDHNL5FS38/
tags: mcp, model context protocol, progress, cancellation, json-rpc
---
A tool call takes two minutes. Is it working, or stuck? **Progress updates tell you.** Last episode covered `subscriptions/listen`, one stream for change notifications. Today: progress and cancellation for long requests.

## Asking for progress

To get progress updates, the client "includes a `progressToken` in the request metadata":

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call",
 "params": {"_meta": {"progressToken": "abc123"}, "name": "index_repo"}}
```

Two rules for the token: it "**MUST** be a string or integer value", and it "**MUST** be unique across all active requests."

## Progress notifications

The server then sends `notifications/progress` with:

- the original `progressToken`
- `progress`, the value so far
- an optional `total`
- an optional human-readable `message`

```json
{"jsonrpc": "2.0", "method": "notifications/progress",
 "params": {"progressToken": "abc123", "progress": 50, "total": 100,
            "message": "Indexing files..."}}
```

"The `progress` value **MUST** increase with each notification, even if the total is unknown." Both values may be floating point.

Progress is optional. A server may "Choose not to send any progress notifications", and "Both parties **SHOULD** implement rate limiting to prevent flooding." And "Progress notifications **MUST** stop after completion."

Progress also helps with timeouts: implementations may reset the timeout clock when progress arrives, but they "**SHOULD** always enforce a maximum timeout, regardless of progress notifications."

## Cancelling a request

Changed your mind? How you cancel depends on the transport.

- **stdio:** "There is no per-request stream to close." The client sends `notifications/cancelled` with the `requestId` and an optional `reason`.
- **Streamable HTTP:** "Closing the SSE response stream is the cancellation signal." The server must treat the disconnect as cancellation, and "No `notifications/cancelled` message is required or expected."

When a server receives a cancellation, it should stop processing the request, free its resources, and not send a response.

## Race conditions

Networks are slow sometimes. "Cancellation notifications may arrive after request processing has completed, and potentially after a response has already been sent." So the client "**SHOULD** ignore any response to the cancelled request that arrives afterward."

Servers can also ignore a cancellation if the request ID is unknown, the request already finished, or the request can't be cancelled.

## In practice

General practice for tool authors: if a tool can take more than a few seconds, report progress with a short message a user would understand, like "Indexing files (50 of 100)". For client authors: show that message, and give users a visible way to cancel.

**Next episode:** pagination with cursors, for lists too long to send at once.

> Show progress. Let users cancel.

## Sources

- [MCP specification 2026-07-28: Progress](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/progress)
- [MCP specification 2026-07-28: Cancellation](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/cancellation)
