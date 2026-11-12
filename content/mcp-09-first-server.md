---
title: Add your first MCP server to Claude, Claude Code, Cursor or VS Code
slug: mcp-09-first-server
description: The one config shape every MCP client shares, and exactly where it goes in Claude Desktop, Claude Code, Cursor and VS Code, with the one key name that differs.
date: 2026-11-12
series: mcp-a-to-z
episode: 9
youtube: -0bxt2Hf6rY
facebook: https://facebook.com/reel/3544011982470959
instagram: https://www.instagram.com/p/Dfpbvf0l8Ln/
tags: mcp, model context protocol, claude desktop, claude code, cursor, vs code
---
You know what MCP is and who runs it. Now it's time to plug a server into an app you already use. Last episode covered MCP's governance; this one is hands on.

## The same three things, everywhere

Every MCP client asks for the same information about a local server:

- a **name** for the server,
- the **command** that starts it,
- and its **arguments**.

Our example is the official filesystem server. It starts with `npx -y @modelcontextprotocol/server-filesystem` followed by the folders it may use.

## Claude Desktop

Open **Settings**, then **Developer**, then **Edit Config**. That opens `claude_desktop_config.json`. Inside, add an `mcpServers` object. Each key is one server, with its `command` and `args`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Desktop"]
    }
  }
}
```

Save, then **fully quit** Claude Desktop and open it again. The server's tools now show up in chat.

For a **remote** server there is no file to edit: go to **Settings**, **Connectors**, **Add custom connector**, and paste the server's URL.

## Claude Code

In Claude Code it's one command. For a remote server:

```
claude mcp add --transport http <name> <url>
```

For a local server, put two dashes and then the command that starts it:

```
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Desktop
```

Pick a **scope**: local (the default), project, or user. Project scope writes a shared `.mcp.json` file at the project root that you can commit for your team. Inside a session, type `/mcp` to check your servers and sign in to the ones that use OAuth.

## Cursor

Cursor reads `.cursor/mcp.json` in your project, or `~/.cursor/mcp.json` in your home folder for every project. It uses the same `mcpServers` shape; remote servers just use a `url` (plus optional `headers`) instead of a command. Switch servers on or off under **Customize**.

## VS Code

In VS Code, open the Command Palette and run **MCP: Add Server**. Pick a command (stdio) server or an HTTP server and follow the prompts.

One catch: VS Code's own config format names the key **`servers`**, not `mcpServers`. When you copy a config from Claude or Cursor, rename that key.

## Two habits to start with

- **Skip SSE for new setups.** Claude Code's docs mark the SSE transport as deprecated; use HTTP instead. (Episode 07 covered the two transports.)
- **Only add servers you trust.** A local server runs on your machine with your own access, so treat it like any other program you install.

**Next episode:** the MCP Inspector, so you can watch the protocol live.

> One config shape, any app.

## Sources

- [MCP docs: Connect to local MCP servers](https://modelcontextprotocol.io/docs/develop/connect-local-servers)
- [MCP docs: Connect to remote MCP servers](https://modelcontextprotocol.io/docs/develop/connect-remote-servers)
- [Claude Code docs: Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)
- [Cursor docs: Model Context Protocol](https://cursor.com/docs/mcp)
- [VS Code docs: MCP servers](https://code.visualstudio.com/docs/agent-customization/mcp-servers)
