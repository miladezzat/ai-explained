---
title: MCP tool outputSchema and structuredContent, explained
slug: mcp-23-output-schema
description: How MCP tools return typed, validated JSON with structuredContent and outputSchema in the 2026-07-28 spec, plus the backwards-compatible text block and errors.
date: 2026-11-26
series: mcp-a-to-z
episode: 23
youtube: Cz6ioJnL2yQ
facebook: https://facebook.com/reel/1177188874710988
instagram: https://www.instagram.com/p/DgNaE62DwzE/
tags: mcp, model context protocol, tools, json schema, ai agents
---
Your tool returns JSON as plain text. **The client has to guess its shape.** Last episode covered writing tool descriptions. Today: structured output, the two fields that let a tool return typed, checkable data.

## Two parts of a tool result

A `tools/call` result can carry `content` blocks (text, images and so on) and a `structuredContent` field. The spec: "Structured content is returned as a JSON value in the `structuredContent` field of a result."

That value is not limited to objects, and the content blocks are still there alongside it (episode 24 covers them in depth). "This can be any JSON value (object, array, string, number, boolean, or null) that conforms to the tool's `outputSchema` if one is defined."

## Declaring an output schema

"Tools may also provide an output schema for validation of structured results." It sits next to `inputSchema` in the tool definition. The spec's example is a weather tool:

```json
{
  "name": "get_weather_data",
  "outputSchema": {
    "type": "object",
    "properties": {
      "temperature": { "type": "number" },
      "conditions": { "type": "string" },
      "humidity": { "type": "number" }
    },
    "required": ["temperature", "conditions", "humidity"]
  }
}
```

Like `inputSchema`, it "Defaults to 2020-12 if no `$schema` field is present."

## The rules

Once a tool declares an output schema, both sides have a job:

- "Servers **MUST** provide structured results that conform to this schema."
- "Clients **SHOULD** validate structured results against this schema."

## Stay backwards compatible

Clients that predate `structuredContent` still need something to read. So: "a tool that returns structured content SHOULD also return the serialized JSON in a TextContent block." The weather result carries both:

```json
{
  "content": [
    { "type": "text", "text": "{\"temperature\": 22.5, \"conditions\": \"Partly cloudy\", \"humidity\": 65}" }
  ],
  "structuredContent": { "temperature": 22.5, "conditions": "Partly cloudy", "humidity": 65 }
}
```

## Why bother

The spec lists the benefits:

- "Enabling strict schema validation of responses"
- "Providing type information for better integration with programming languages"
- "Guiding clients and LLMs to properly parse and utilize the returned data"

## Errors are different

When a call fails, the result reports it with `isError: true` and a readable message in a text block, like "Invalid departure date: must be in the future."

## A practical tip

General practice: keep the schema small and stable. Once clients build code against your output schema, changing it is a breaking change, just like changing an API response.

**Next episode:** content types, text, images, audio and resources.

> Define the shape. Trust the data.

## Sources

- [MCP specification 2026-07-28: Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
