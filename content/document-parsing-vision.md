---
title: Document parsing with vision models: read the page, not just the text
slug: document-parsing-vision
description: Why PDFs break text extraction pipelines, how vision language models read whole pages instead, what it costs, and when a plain parser is still the better choice.
date: 2026-11-20
series: ai-explained
youtube: NjyHMvcRw6o
facebook: https://facebook.com/reel/1143137621836571
instagram: https://www.instagram.com/p/Df9OMAAl34C/
tags: rag, pdf, document parsing, vision language models, ai engineering
---
Your RAG app reads a PDF, and the table comes out as soup. **Vision models read the page instead.**

## The classic pipeline

The traditional way to index documents is a chain of steps: a PDF parser or OCR to pull out the words, layout detection to find tables and figures, and then chunking.

Every step can lose something: the reading order of a two-column page, the structure of a table, or a chart that only exists as pixels.

## Reading the page as an image

The vision approach is simpler: render each page as an image, and let a vision language model look at it.

That's how Claude's PDF support works. The system "converts each page of the document into an image," then "extracts the text from each page and provides it alongside that page's image." So the model gets both the words and the layout, and you can ask about the text, pictures, charts and tables in the file.

It isn't free:

- **Tokens.** Text typically uses 1,500 to 3,000 tokens per page, and each page image uses at most 1,568 more.
- **Limits.** Up to 600 pages per request, or 100 when the request's context window is under 1M tokens.

The docs also give a few tips: put the PDF before your question, rotate pages upright, and split large PDFs into chunks.

For parsing, a common pattern (general practice) is to ask the model to turn each page into Markdown or JSON, with tables kept as tables, so the output can go straight into your index.

## Skipping parsing for retrieval

ColPali, a 2024 paper, goes one step further for search: it skips parsing entirely. It embeds page images directly with a vision language model, producing a vector for each image patch, and matches them to query words with ColBERT-style late interaction.

The authors report that it "largely outperforms modern document retrieval pipelines" while being "drastically simpler, faster and end-to-end trainable."

## Comparing parsers

If you're choosing a tool, OmniDocBench evaluates "both pipeline-based methods and end-to-end vision-language models" on documents from nine sources, from academic papers and textbooks to handwritten notes and newspapers.

## When to use which

Some practical rules of thumb (general practice, not findings from the sources):

1. **Plain, text-heavy PDFs:** a parser is cheap and fast.
2. **Charts, scans and complex tables:** let a vision model read the page.
3. **Numbers that matter:** vision models can still misread small text or invent a value, so validate them.

> Don't just read the text. Read the page.

## Sources

- [Claude docs: PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support)
- [Faysse et al., ColPali: Efficient Document Retrieval with Vision Language Models](https://arxiv.org/abs/2407.01449)
- [Ouyang et al., OmniDocBench: Benchmarking Diverse PDF Document Parsing with Comprehensive Annotations](https://arxiv.org/abs/2412.07626)
