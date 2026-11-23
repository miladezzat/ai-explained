---
title: MCP pagination with cursors for long lists
slug: mcp-20-pagination-cursors
description: In the 2026-07-28 MCP spec, long lists come back page by page with an opaque nextCursor. Here are the rules for servers and clients.
date: 2026-11-23
series: mcp-a-to-z
episode: 20
youtube: ZTIpJLbzr0Y
facebook: https://facebook.com/reel/1660510089186838
instagram: https://www.instagram.com/p/DgFsoo5EXpN/
tags: mcp, model context protocol, pagination, cursors, json-rpc
---
Your server has 500 tools. Do you send them all at once? **Pagination says no.** Last episode covered progress updates and cancellation. Today: pagination with cursors.

## Why paginate

The spec says "Pagination allows servers to yield results in smaller chunks rather than all at once." It is "especially important when connecting to external services over the internet, but also useful for local integrations to avoid performance issues with large data sets."

Four list operations support it:

- `tools/list`
- `prompts/list`
- `resources/list`
- `resources/templates/list`

## Cursors, not page numbers

"Pagination in MCP uses an opaque cursor-based approach, instead of numbered pages." The cursor is "an opaque string token, representing a position in the result set."

And the server is in charge of size: "Page size is determined by the server, and clients **MUST NOT** assume a fixed page size."

## The flow

Each response holds the current page, plus "An optional `nextCursor` field if more results exist":

```json
{"jsonrpc": "2.0", "id": "123",
 "result": {"resources": [...], "nextCursor": "eyJwYWdlIjogM30="}}
```

To get the next page, the client sends the same list request with that value as `cursor`:

```json
{"jsonrpc": "2.0", "id": "124", "method": "resources/list",
 "params": {"cursor": "eyJwYWdlIjogMn0="}}
```

Repeat until there's no `nextCursor`. The page size can change from one response to the next, so loop on the cursor, never on a count. Clients **SHOULD** "Treat a missing `nextCursor` as the end of results."

## Rules for clients

"Clients **MUST** treat cursors as opaque tokens":

- don't make assumptions about cursor format
- don't attempt to parse or modify cursors
- don't decide anything from the value except whether one was provided

That last rule has a sharp edge: "an empty string is a valid cursor and thus **MUST NOT** be treated as the end of results." Check for a missing field, not for a falsy value.

Clients **SHOULD** also "Support both paginated and non-paginated flows", since many servers return everything in one response.

## Rules for servers

Servers **SHOULD** "Provide stable cursors" and "Handle invalid cursors gracefully". Concretely: "Invalid cursors **SHOULD** result in an error with code -32602 (Invalid params)."

## In practice

General practice for client authors: when you load tools, fetch every page of `tools/list` before handing the list to the model. If you stop at the first page, the model never sees the tools on page two, and nothing tells you they're missing.

**Next episode:** the anatomy of a tool: name, description, and input schema.

> Follow the cursor.

## Sources

- [MCP specification 2026-07-28: Pagination](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/pagination)
