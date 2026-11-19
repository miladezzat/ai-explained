---
title: Retries and idempotency for agent tool calls
slug: retries-idempotency
description: How to let an AI agent retry a failed tool call without booking, charging or emailing twice, using idempotent operations and idempotency keys.
date: 2026-11-19
series: ai-explained
youtube: kaYE_EL7wJU
facebook: https://facebook.com/reel/2408101989994170
instagram: https://www.instagram.com/p/Df7tpnel78U/
tags: ai agents, idempotency, retries, api design, tool calls
---
Your agent books a flight. The call times out. Does it retry? **Retry wrong, and you pay twice.**

## The problem

A timeout leaves you uncertain. As the IETF draft on idempotency keys puts it, the client doesn't know "if the server even completed processing the request."

Retrying is the right reflex for flaky networks. But some tool calls change the world, and repeating them repeats the change.

## What idempotency means

An operation is idempotent when doing it twice has the same effect as doing it once. In HTTP terms, a method is idempotent if "the intended effect on the server of multiple identical requests ... is the same as the effect for a single such request."

By that definition, `GET`, `PUT` and `DELETE` are idempotent, while `POST` and `PATCH` are not. For tools: reading a file is safe to repeat. Sending an email, charging a card or booking a seat is not.

## Idempotency keys

The fix is an **idempotency key**: a unique value the client sends with the request, so the server can recognize a retry.

Stripe's API is the classic example. It "saves the status code and body of the first request made with a given idempotency key," and retries with the same key return that saved response instead of charging again. A few of its rules are worth copying:

- **Use a random key.** Stripe suggests V4 UUIDs, and says to avoid sensitive data such as email addresses or personal identifiers.
- **Reject mismatches.** If the same key arrives with different parameters, Stripe returns an error instead of guessing.

There's also an IETF Internet-Draft for a standard `Idempotency-Key` HTTP header, which "can be used to make non-idempotent HTTP methods such as POST or PATCH fault-tolerant."

## Making agent retries safe

Some practical habits (general practice, not rules from the sources above):

1. **One key per intended action, not per attempt.** Generate the key when the agent decides to book the flight. Every retry of that action carries the same key, so the side effect happens only once.
2. **Retry with backoff, and cap the attempts.** A stuck tool shouldn't loop forever.
3. **Check before you retry.** If a tool has no idempotency key, look up whether the booking already exists first.

What about MCP? Tools can describe their behavior with annotations, but the spec says "clients MUST consider tool annotations to be untrusted unless they come from trusted servers." So don't let a server's own description be the only thing that makes a retry safe.

> Retries are cheap. Duplicate side effects aren't.

## Sources

- [Stripe API: Idempotent requests](https://docs.stripe.com/api/idempotent_requests)
- [IETF: The Idempotency-Key HTTP Header Field (Internet-Draft)](https://www.ietf.org/archive/id/draft-ietf-httpapi-idempotency-key-header-07.html)
- [MCP specification 2026-07-28: Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
