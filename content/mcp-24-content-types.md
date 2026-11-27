---
title: MCP tool result content types, explained
slug: mcp-24-content-types
description: The five content types an MCP tool result can carry in the 2026-07-28 spec, text, image, audio, resource links and embedded resources, plus annotations and when to link or embed.
date: 2026-11-27
series: mcp-a-to-z
episode: 24
youtube: sdMbcICNizg
facebook: https://facebook.com/reel/1731441815312111
instagram: https://www.instagram.com/p/DgP-5DLD2yY/
tags: mcp, model context protocol, tools, content types, ai agents
---
Your tool just made a chart. **How does it send back an image?** Last episode covered structured output. Today: content types, the building blocks of what a tool hands back.

## The content array

A `tools/call` result has a `content` field, and per the spec it "can contain multiple content items of different types." There are five: text, image, audio, resource links and embedded resources. They sit alongside `structuredContent` from episode 23, not instead of it.

## Text, image and audio

Text is the simplest block: `"type": "text"` and a `text` field, like `"text": "Tool result text"`.

Images carry base64 data and a MIME type. The spec's example is `"type": "image"`, `"data": "base64-encoded-data"`, `"mimeType": "image/png"`. Audio works the same way: `"type": "audio"`, base64 data and a type such as `"audio/wav"`.

## Resource links

A tool "MAY return links to Resources" instead of the content itself. A link is `"type": "resource_link"` with a URI, a name, a description and a MIME type. The spec's example points at `file:///project/src/main.rs`, named `main.rs`, described as "Primary application entry point", with `text/x-rust`.

One catch: "Resource links returned by tools are not guaranteed to appear in the results of a `resources/list` request." A link from a tool can point somewhere the client never saw in its resource list.

## Embedded resources

An embedded resource, `"type": "resource"`, puts the content right in the result: a `resource` object with the URI, the MIME type and the text. The spec's example embeds the same `main.rs` file with its Rust source as text.

The spec adds: "Servers that use embedded resources **SHOULD** implement the `resources` capability." If you embed resources, declare that you serve them.

## Link or embed?

General practice: link when the content is large or the model may not need it, so the client can fetch it only if it wants. Embed when the model needs the content right away to finish the task, so there is no extra round trip.

## Annotations

"All content types (text, image, audio, resource links, and embedded resources) support optional annotations that provide metadata about audience, priority, and modification times."

The spec's image example is marked `"audience": ["user"]` with `"priority": 0.9`, and its embedded resource example uses `"audience": ["user", "assistant"]`, `"priority": 0.7` and a `lastModified` timestamp. Clients can use these hints to decide what to show the user and what to pass to the model.

## Mixing types

General practice: one result can mix types. A chart tool might return a short text summary for the model plus the chart as an image for the user, each annotated for its audience.

**Next episode:** tool annotations, read only, destructive, idempotent and open world hints.

> Send more than text. Pick the right type.

## Sources

- [MCP specification 2026-07-28: Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
