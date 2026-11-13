---
title: MCP Inspector: watch your MCP server's protocol live
slug: mcp-10-inspector
description: How to run the MCP Inspector against a local or remote server, call tools from a form, read the JSON-RPC transcript, and switch between legacy and modern protocol eras.
date: 2026-11-13
series: mcp-a-to-z
episode: 10
youtube: YoX384ENZiI
facebook: https://facebook.com/reel/4581300282108448
instagram: https://www.instagram.com/p/DfsEutpF1FZ/
tags: mcp, model context protocol, mcp inspector, debugging, json-rpc
---
Your MCP server says it works. But what does it actually send? Last episode we plugged a server into Claude, Cursor and VS Code. Today we watch it from the inside.

## The reference tool

The **MCP Inspector** is the reference developer tool for testing and debugging MCP servers. It's one package, `@modelcontextprotocol/inspector`, with three clients:

- a **web app** (the default),
- a **CLI** (`--cli`),
- and a **terminal UI** (`--tui`).

## Run it

Point it at your server's start command:

```
npx @modelcontextprotocol/inspector node build/index.js
```

For a remote server, pass a URL and the transport instead:

```
npx @modelcontextprotocol/inspector --server-url https://api.example.com/mcp --transport http
```

On launch it prints a URL carrying a **per-launch token**. Open that URL; don't type `localhost` from memory, because the token is what lets the page talk to the backend.

## The tabs

Across the top you'll find tabs such as **Tools**, **Prompts** and **Resources**, plus more (Tasks, Logs, Network...) that only appear when the server or transport supports them.

In **Tools**, pick a tool and its input schema becomes a form. Fill it in, call it, and the result appears below.

The star is the **Protocol** tab: the raw JSON-RPC transcript of requests, responses and notifications. **Network** shows the HTTP layer for remote servers, and **Console** shows a stdio server's `stderr`, where your debug output lands.

## Protocol eras

Each server in the Inspector has a protocol era:

| Era | What it does |
|---|---|
| `legacy` (default) | Plain `initialize` handshake, no probing |
| `auto` | Tries `server/discover` first, falls back to `initialize` |
| `modern` | Pins exactly 2026-07-28, no fallback |

In modern mode the connection is **sessionless and per request**: there's no session ID to carry around, and you can see that in the transcript. Logging, subscriptions and cancellation also look different per era, which makes the Inspector a good way to learn the new spec.

## The CLI, for scripts and CI

The CLI is built for automation:

```
npx @modelcontextprotocol/inspector --cli node build/index.js --method tools/list
```

Call a tool with `--method tools/call --tool-name ... --tool-arg key=value`, add `--format json`, and pipe the output to `jq` in a CI check.

## Keep it local

The web backend binds to `127.0.0.1` by default and requires the per-launch token. The docs are blunt: never combine `DANGEROUSLY_OMIT_AUTH` with a non-loopback bind. Remember that local stdio servers run as you.

**Next episode:** the old `initialize` handshake, and why it was retired.

> Don't guess what your server sends. Watch it.

## Sources

- [MCP docs: MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- [MCP docs: Inspector web client](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web)
- [MCP docs: Inspector protocol eras](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)
- [MCP docs: Inspector security](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/security)
- [modelcontextprotocol/inspector on GitHub](https://github.com/modelcontextprotocol/inspector)
