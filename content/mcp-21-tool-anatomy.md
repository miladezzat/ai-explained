---
title: Anatomy of an MCP tool: name, description, inputSchema
slug: mcp-21-tool-anatomy
description: What's inside an MCP tool definition in the 2026-07-28 spec: name rules, title, description, inputSchema, the no-parameter schema, and optional extras.
date: 2026-11-24
series: mcp-a-to-z
episode: 21
youtube: REfVC6P5WZ4
facebook: https://facebook.com/reel/1215303277489592
instagram: https://www.instagram.com/p/DgIQ9-rliRu/
tags: mcp, model context protocol, tools, json schema, ai agents
---
To the model, your tool is just a JSON object. **Let's take one apart.** Last episode covered pagination with cursors. Today: the anatomy of a tool.

## Where tools come from

A client discovers tools with `tools/list`. Each tool comes back as one definition, like this example from the spec:

```json
{
  "name": "get_weather",
  "title": "Weather Information Provider",
  "description": "Get current weather information for a location",
  "inputSchema": {
    "type": "object",
    "properties": {
      "location": {"type": "string", "description": "City name or zip code"}
    },
    "required": ["location"]
  }
}
```

Every tool has a `name`, a `description` and an `inputSchema`. The rest (`title`, `icons`, `outputSchema`, `annotations`) is optional.

## name

The name is the "Unique identifier for the tool." The spec's naming rules are all **SHOULD**s:

- "between 1 and 128 characters in length (inclusive)"
- "considered case-sensitive"
- only ASCII letters, digits, underscore, hyphen and dot
- "**SHOULD NOT** contain spaces, commas, or other special characters"
- "**SHOULD** be unique within a server"

Uniqueness is per server, so a client talking to two servers that each expose a `search` tool will see a clash. Clients "**SHOULD** implement a disambiguation strategy such as prefixing tool names with a server identifier."

## title and description

The `title` is an "Optional human-readable name of the tool for display purposes", like "Weather Information Provider". The `description` is a "Human-readable description of functionality": what the tool does, in plain words. How to write one a model actually understands is next episode's topic.

## inputSchema

The input schema is "JSON Schema defining expected parameters": properties, their types, and which are required. Two hard rules:

- It "**MUST** be a valid JSON Schema object (not `null`)."
- It "Defaults to 2020-12 if no `$schema` field is present."

For a tool with no parameters, the spec gives two options and recommends the strict one:

```json
{ "type": "object", "additionalProperties": false }
```

That "explicitly accepts only empty objects." Plain `{ "type": "object" }` also works but accepts any object.

## Optional extras

- `outputSchema`: the shape of structured results (episode 23).
- `icons`: images "for display in user interfaces".
- `annotations`: "Optional properties describing tool behavior" (episode 25).

One security rule about that last one: "clients **MUST** consider tool annotations to be untrusted unless they come from trusted servers."

**Next episode:** writing tool descriptions a model actually understands.

> Name it. Describe it. Define it.

## Sources

- [MCP specification 2026-07-28: Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
