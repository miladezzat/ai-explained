---
title: Citations and grounding: show where AI answers come from
slug: citations-grounding
description: What grounding and citations mean for LLM apps, how Claude's citations API and Gemini's grounding with Google Search return sources, and the limits to keep in mind.
date: 2026-11-21
series: ai-explained
youtube: LAU6psqdDKk
facebook: https://facebook.com/reel/1753371296504067
instagram: https://www.instagram.com/p/DgAOMtClBNx/
tags: llm, rag, citations, grounding, ai engineering
---
Your chatbot says the refund window is 30 days. **Says who?** Citations show exactly where an answer came from.

## Grounding and citations

**Grounding** means basing an answer on real sources, like your documents or a web search, not just what the model remembers from training. Google's Gemini docs list the goal plainly: "Reduce model hallucinations by basing responses on real-world information."

A **citation** links each claim back to the exact source text, so users can check it and decide whether to trust it.

The old way was to ask the model, in the prompt, to quote its sources. That works, but the quotes can be wrong, and you have to parse them out of free text yourself.

## Claude's citations API

Claude's API has citations built in. You turn them on per document with `"citations": {"enabled": true}`. Plain text and PDFs are split into sentences; custom content blocks are used as they are.

The answer comes back as text blocks, each with its own citations: the `cited_text` and where it lives.

- **Plain text:** character positions (`char_location`)
- **PDFs:** page numbers (`page_location`)
- **Custom content:** block indices (`content_block_location`)

A few details from the docs worth knowing:

- "citations are guaranteed to contain valid pointers to the provided documents."
- "`cited_text` does not count toward your output tokens." Enabling citations adds only a slight increase in input tokens.
- "In Anthropic's evaluations, the citations feature is significantly more likely to cite the most relevant quotes from documents than purely prompt-based approaches."
- One catch: "Citations and structured outputs are incompatible." Ask for both and the API returns a 400 error.

## Gemini's grounding with Google Search

For web answers, Gemini can ground itself with Google Search: it searches, then answers from what it finds. The response includes `groundingMetadata` with:

- `webSearchQueries`: the searches it ran
- `groundingChunks`: the web sources, each with a `uri` and `title`
- `groundingSupports`: links from a text segment of the answer (by `startIndex` and `endIndex`) to one or more sources

The docs call `groundingSupports` "the key to building inline citations": insert a source marker at the end of each supported segment.

## Showing citations well

Some general practice (not rules from the sources):

- **Put each citation next to its claim**, not in a list at the end, and let users open the source in one click.
- **A citation isn't proof.** The source itself can be wrong or out of date.
- **Check coverage.** Make sure the key claims in an answer actually have a citation, and treat uncited claims with more suspicion.

> No source? No trust. Cite it.

## Sources

- [Claude docs: Citations](https://platform.claude.com/docs/en/build-with-claude/citations)
- [Gemini API docs: Grounding with Google Search](https://ai.google.dev/gemini-api/docs/generate-content/google-search)
