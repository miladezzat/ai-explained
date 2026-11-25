---
title: Agent handoffs: pass the conversation to the right agent
slug: agent-handoffs
description: Agent handoffs let one AI agent pass a conversation to a specialist agent. How they work as tool calls, what the next agent sees, and when to use agents as tools instead.
date: 2026-11-25
series: ai-explained
youtube: o3kPQizGt50
facebook: https://facebook.com/reel/2365603504279291
instagram: https://www.instagram.com/p/DgKiaR3lCNo/
tags: ai agents, multi-agent systems, handoffs, openai agents sdk, ai engineering
---
One agent cannot be an expert at everything. A support bot that handles billing, refunds, technical questions and sales ends up doing all of them half well. **So it hands off.**

## What a handoff is

The OpenAI Agents SDK docs put it in one line: "Handoffs allow an agent to delegate tasks to another agent." The usual shape is a triage agent at the front door. It reads the request, works out what kind of problem it is, and passes refunds to a refund agent, billing to a billing agent, and so on. Each specialist gets a short, focused prompt and only the tools it needs.

## A handoff is just a tool

There is no special protocol behind it. "Handoffs are represented as tools to the LLM." If there is a refund agent, the triage agent sees a tool named `transfer_to_refund_agent` next to its normal tools:

```text
lookup_order()
search_docs()
transfer_to_refund_agent()
```

The model chooses that tool the same way it chooses any other, so the description you give each handoff matters. Write clear ones that say when this agent is the right choice.

## What the next agent sees

When the model calls the transfer tool, the docs say "it's as though the new agent takes over the conversation, and gets to see the entire previous conversation history." The specialist answers the user directly, and the user never has to repeat themselves.

Sometimes that is too much. Forty turns of chat and tool output can bury the part that matters. "If you want to change this, you can set an `input_filter`", a function that trims or reshapes the history before the next agent sees it.

## Hooks and structured input

Two more options help in production:

- **`on_handoff`**: "A callback function executed when the handoff is invoked." Use it to log the switch or prepare data the specialist will need.
- **`input_type`**: "The schema for the handoff tool-call arguments." The model can pass structured input along with the handoff, such as the reason for an escalation:

```json
{ "reason": "angry customer, second refund request" }
```

The docs also recommend telling agents about handoffs in their instructions, and the SDK ships a suggested prompt prefix, `RECOMMENDED_PROMPT_PREFIX`, for exactly that.

## Handoff or agent as a tool?

There are two ways to connect a specialist, and OpenAI's orchestration guide frames the choice around one question: who owns the final answer?

| | Agent as a tool | Handoff |
|---|---|---|
| Who is in charge | The manager keeps control | The specialist takes control |
| Who replies | The manager stays responsible for the answer | The specialist gives the next answer itself |
| Good for | Bounded subtasks behind the scenes | A branch of the conversation the specialist should own |

If the main agent should collect results and write the reply, call the specialist as a tool. If the specialist should talk to the user from here on, hand off.

## Practical tips

General practice, from building multi-agent systems:

- **Keep the graph small.** Every extra hop adds latency and more room for the wrong agent to pick up the conversation.
- **Trace every handoff.** When an answer is wrong, you need to see which agent gave it, and why the conversation ended up there.
- **Start with one agent.** Add a specialist when a single prompt clearly cannot cover the job.

> Right agent. Right moment.

## Sources

- [OpenAI Agents SDK docs: Handoffs](https://openai.github.io/openai-agents-python/handoffs/)
- [OpenAI docs: Agent orchestration](https://developers.openai.com/api/docs/guides/agents/orchestration)
