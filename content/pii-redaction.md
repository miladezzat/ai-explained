---
title: PII redaction for LLM apps: mask it in, restore it out
slug: pii-redaction
description: Keep names, emails and card numbers out of your prompts. Detect personal data, swap it for placeholders, keep the mapping, and restore the real values in the answer.
date: 2026-11-13
series: ai-explained
youtube: xllOaEA4w4k
facebook: https://facebook.com/reel/1506753651304880
instagram: https://www.instagram.com/p/DfroLrIl-Na/
tags: pii, data privacy, llm security, presidio, gdpr
---
A support ticket hits your LLM app. It contains a customer's name and their card number. Now what?

## Where personal data leaks

Once a prompt leaves your system, that data can end up in **logs**, in a **vendor's system**, or back in the **model's output**. OWASP lists this risk as **LLM02:2025, Sensitive Information Disclosure**, and it explicitly includes personally identifiable information (PII).

The fix is simple to state: **redact before the prompt leaves your system, and restore after the answer comes back.**

## Step 1: detect

Tools like [Presidio](https://presidio.dataprivacystack.org/) scan text for entities such as `PERSON`, `EMAIL_ADDRESS`, `PHONE_NUMBER`, `CREDIT_CARD` and `IBAN_CODE`. They mix methods:

- **Named entity recognition** for names,
- **patterns and checksums** for numbers (a credit card number has to pass a checksum),
- **context words** nearby, like "card" or "phone".

## Step 2: transform

Once found, each value can be replaced with a label, redacted, masked (`4111 •••• •••• 1111`), hashed, or encrypted.

| Operator | Reversible? |
|---|---|
| Replace / redact / mask | No (unless you keep a mapping) |
| Hash | No, one way |
| Encrypt | Yes, with the key |

## The placeholder trick

For LLMs, placeholders work especially well:

1. *Sarah* becomes `<PERSON_1>`, the card becomes `<CREDIT_CARD_1>`.
2. You keep the mapping on your side. The model only ever sees the labels.
3. When the answer says "Thank `<PERSON_1>`", you swap the real name back in.

A bonus: the model provider never receives the real values, so there's less to leak. Keep labels **consistent** (same person, same label) so the model can still follow who did what. Presidio ships a sample that does exactly this, with the caveat that its simple version isn't thread-safe.

## No detector is perfect

Presidio's own docs warn: "there is no guarantee that Presidio will find all sensitive information." So add layers: limit what goes into prompts in the first place, and scan what comes out.

## Know the law

Under GDPR, **pseudonymised data is still personal data**: Recital 26 says it "should be considered to be information on an identifiable natural person." Only truly anonymous data falls outside the regulation. Placeholders with a mapping you can reverse are pseudonymous, not anonymous.

## Where to redact

- Prompts
- Logs and traces
- Anything that goes into training data (OWASP: "prevent user data from entering the training model")

> Mask it on the way in, restore it on the way out.

## Sources

- [Presidio: overview](https://presidio.dataprivacystack.org/)
- [Presidio: supported entities](https://presidio.dataprivacystack.org/supported_entities/)
- [Presidio: anonymizer](https://presidio.dataprivacystack.org/anonymizer/)
- [Presidio: pseudonymization sample](https://microsoft.github.io/presidio/samples/python/pseudonomyzation/)
- [OWASP LLM02:2025 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/)
- [GDPR Article 4](https://gdpr-info.eu/art-4-gdpr/) and [Recital 26](https://gdpr-info.eu/recitals/no-26/)
