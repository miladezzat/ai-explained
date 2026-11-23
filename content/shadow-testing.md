---
title: Shadow testing LLM changes: catch breaks before users do
slug: shadow-testing
description: Run a new model, prompt or agent on real traffic without users seeing it: copy requests, log and compare answers, stub write tools, then canary.
date: 2026-11-23
series: ai-explained
youtube: f6aktYdQw2M
facebook: https://facebook.com/reel/917038648065463
instagram: https://www.instagram.com/p/DgFYAuRlM_g/
tags: llm, testing, llmops, deployment, ai engineering
---
You swapped the model. Did anything break? **Shadow testing tells you before users do.**

## What it is

Shadow testing runs a new model, prompt, retriever or agent version alongside production on the same live inputs. As Arize puts it, the new version runs "without showing its output to anyone."

Amazon SageMaker has this built in. It "routes a copy of the inference requests" to the shadow variant, and "Only the responses of the production variant are returned to the calling application." You "can choose to discard or log the responses of the shadow variant for offline comparison."

## What you compare

At minimum, operational metrics: AWS names "latency and error rate". For LLMs you also want quality, so you "score both with an evaluator" (Arize), often an LLM judge.

Why bother when you already have offline evals? Offline evals run on test sets you wrote. Shadow traffic is what real users actually send. That's where you find the changes nobody scripted (general practice):

- answers that got noticeably longer
- new refusals on ordinary requests
- broken JSON in structured output

## Do it safely

**Keep it off the request path.** Arize: "Run the shadow call asynchronously and off the user's request path so a slow or failing candidate cannot degrade production latency."

**Beware side effects.** This is the big trap with agents. If the shadow run sends the email or issues the refund, that's real. Arize is blunt: "A shadowed agent that executes real tool calls is not shadow testing. It is a second production system." Stub or block every tool that writes.

**Mind the cost.** Expect "roughly double inference spend on shadowed traffic plus scoring on top, which is why most teams shadow a stratified sample rather than everything."

## What it can't tell you

"No user sees the output, so no user reacts to it." Shadow testing can't measure satisfaction, clicks or whether people trust the new answers. For that you need to serve the output to someone: a canary release to a small slice of real users, or an A/B test.

So shadow and canary aren't rivals. In Arize's words, "They are a sequence more often than alternatives":

1. **Shadow**: real inputs, no user impact.
2. **Canary**: real users, small slice.
3. **Full rollout**.

On SageMaker, if the shadow wins, "select Deploy shadow variant" to promote it to production.

> Test in the shadows.

## Sources

- [AWS: Amazon SageMaker AI shadow tests](https://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html)
- [AWS News Blog: Perform shadow tests to compare inference performance](https://aws.amazon.com/blogs/aws/new-for-amazon-sagemaker-perform-shadow-tests-to-compare-inference-performance-between-ml-model-variants)
- [Arize: What is shadow testing (LLMs / agents)?](https://arize.com/glossary/shadow-testing-llms-agents/)
