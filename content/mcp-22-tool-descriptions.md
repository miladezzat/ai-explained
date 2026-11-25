---
title: Writing MCP tool descriptions a model actually understands
slug: mcp-22-tool-descriptions
description: Writing MCP tool descriptions so the model picks the right tool and calls it correctly: what to include, how long, naming, namespacing, and testing.
date: 2026-11-25
series: mcp-a-to-z
episode: 22
youtube: ofEnN_pFux0
facebook: https://facebook.com/reel/1173519095097128
instagram: https://www.instagram.com/p/DgK08OjFHRO/
tags: mcp, model context protocol, tools, tool use, ai agents
---
The model only knows your tool from its description. **So write it like documentation.** Last episode took a tool definition apart field by field. Today: the field that does the most work, the description.

## Why it matters most

When a client sends `tools/list` results to a model, the name, the input schema and the description are all the model has. It never sees your code. Claude's tool docs are blunt about it: "Provide extremely detailed descriptions. This is by far the most important factor in tool performance."

Anthropic's engineering post on writing tools for agents gives a good way to think about it: "think of how you would describe your tool to a new hire on your team." You know which account the tool hits, what format dates come back in, and which calls are slow. The model does not. "Consider the context that you might implicitly bring" and "make it explicit."

## What to put in it

The docs suggest "at least 3–4 sentences for each tool description, more if the tool is complex," covering:

- **What the tool does.**
- **When it should be used, and when it shouldn't.**
- **What each parameter means** and how it changes the result.
- **Caveats and limits**, such as what the tool does not return.

## Poor vs good

Here is the docs' own example. The poor version:

```json
{
  "name": "get_stock_price",
  "description": "Gets the stock price for a ticker."
}
```

That "leaves Claude with many open questions." Which tickers? What comes back? The good version says it "Retrieves the current stock price for a given ticker symbol," that the ticker "must be a valid symbol for a publicly traded company on a major US stock exchange like NYSE or NASDAQ," and that "It will not provide any other information about the stock or company." The parameter gets a description too: "The stock ticker symbol, e.g. AAPL for Apple Inc."

## Names help too

- **Parameters:** "instead of a parameter named `user`, try a parameter named `user_id`." The name alone should say what goes in.
- **Tools:** namespace by service, like `asana_search` and `jira_search`, so a model with many servers connected can tell similar tools apart. This builds on the name rules from episode 21.

## Small edits, big results

"Even small refinements to tool descriptions can yield dramatic improvements," Anthropic writes. Their example: Claude Sonnet 3.5 reached state of the art on SWE-bench Verified after precise refinements to its tool descriptions, which cut error rates.

## Test it with real agents

You only know a description works when an agent uses it. Run realistic tasks, read the transcripts, and look for patterns. "Lots of tool errors for invalid parameters might suggest tools could use clearer descriptions or better examples." Then rewrite and run again.

**Next episode:** structured output with `outputSchema` and `structuredContent`.

> Clear words. Right calls.

## Sources

- [Claude docs: Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools)
- [Anthropic: Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [MCP specification 2026-07-28: Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
