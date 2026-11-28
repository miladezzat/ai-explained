---
title: MCP tool annotations, explained
slug: mcp-25-tool-annotations
description: The four MCP tool annotation hints, read-only, destructive, idempotent and open-world, their cautious defaults, what clients do with them, and why they are hints and not guarantees.
date: 2026-11-28
series: mcp-a-to-z
episode: 25
youtube: w6FrZikp1Mo
facebook: https://facebook.com/reel/983837487779083
instagram: https://www.instagram.com/p/DgSj2bAj7F7/
tags: mcp, model context protocol, tools, ai agents, security
---
Your client is about to call `delete_file`. **Should it ask you first?** Last episode covered content types. Today: tool annotations, the hints that help a client decide.

## What annotations are

The 2026-07-28 spec lists `annotations` on a tool as "Optional properties describing tool behavior." The MCP blog's post on tool annotations is blunt about their nature: "Every property is a **hint**." They first shipped in the 2025-03-26 spec revision.

## The four hints

The blog frames each one as a question:

- **readOnlyHint:** "Does the tool modify its environment?"
- **destructiveHint:** "If it does modify things, is the change destructive (as opposed to additive)?"
- **idempotentHint:** "Can you safely call it again with the same arguments?"
- **openWorldHint:** "Does the tool interact with an open world of external entities, or is its domain closed?"

There is also a `title`, which is "just a display name with no trust implications."

## What clients do with them

The blog maps each hint to a client decision. A read-only tool lets a client "Skip the confirmation dialog." A destructive one should "Show a warning before executing." An idempotent tool is "Safe to retry on failure." And for an open-world tool, the client should "Scrutinize output for untrusted content."

## Cautious defaults

If a server sets nothing, the client assumes the worst. The defaults are `readOnlyHint: false`, `destructiveHint: true`, `idempotentHint: false` and `openWorldHint: true`. In the blog's words: "The defaults are deliberately cautious: a tool with no annotations is assumed to be non-read-only, potentially destructive, non-idempotent, and open-world." Or shorter: "The spec assumes the worst until told otherwise."

## Hints, not guarantees

The spec adds a hard rule: "For trust & safety and security, clients **MUST** consider tool annotations to be untrusted unless they come from trusted servers." The reason is simple: "An untrusted server can lie. A server can claim `readOnlyHint: true` and delete your files anyway."

So annotations are not a security boundary. "They aren't enforcement." Strong guarantees need "network controls or sandboxing, not a boolean hint." The blog sums it up: "Hints inform decisions; contracts enforce them."

## For server authors

The blog's advice: "set `readOnlyHint: true` on read-only tools, `destructiveHint: false` on additive operations, and `openWorldHint: false` on closed-domain tools." Honest hints let trusted clients skip needless prompts and warn where it matters.

More annotations are being discussed. The blog lists open proposals, such as trust and sensitivity annotations and a `secretHint`, and a Tool Annotations Interest Group is forming.

**Next episode:** icons and display metadata for your tools.

> Hint honestly. Verify anyway.

## Sources

- [MCP blog: Tool annotations](https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/)
- [MCP specification 2026-07-28: Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
