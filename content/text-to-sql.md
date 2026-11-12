---
title: Text-to-SQL: ask your database in plain English
slug: text-to-sql
description: Text-to-SQL lets an LLM turn a plain-English question into a SQL query. How it works, what the BIRD and Spider benchmarks show, and how to run it safely.
date: 2026-11-12
series: ai-explained
youtube: XGnCN_MafYo
facebook: https://facebook.com/reel/1451067826449687
instagram: https://www.instagram.com/p/DfpHBzuF6h-/
tags: text-to-sql, sql, llm, databases, ai engineering
---
Ask your database a question in plain English, and get the SQL query written for you. That's **Text-to-SQL**.

## How it works

1. The model reads your **question** and the database **schema**: table names, columns, and how the tables join.
2. It **writes a SQL query**.
3. The **database runs it** and returns the answer.

The schema is what makes it work. Without it, the model is just guessing at table and column names.

```sql
-- "Top 5 customers by revenue?"
SELECT c.name, SUM(o.total) AS revenue
FROM customers c JOIN orders o ON o.customer_id = c.id
GROUP BY c.name ORDER BY revenue DESC LIMIT 5;
```

## How good is it?

- **Spider**, the classic benchmark, has over **10,000 questions** across **200 databases** in **138 domains**.
- **BIRD** made it harder: **95 real databases**, **33 GB** of messy data, **37 domains**. When it came out in 2023, ChatGPT scored about **40%**; humans scored about **93%**.
- Today the top systems on BIRD's leaderboard score **above 80%**, but they're given **hints**: business knowledge such as which account type counts as an "owner". Models can't guess what your team means by a word.
- **Spider 2.0** tests real enterprise work: **632 problems**, often on databases with **over a thousand columns**. At launch, even o1-preview solved only **17%** of them.

Real data is also **dirty**: odd formats, abbreviations, and spellings the question never uses.

## Keep it safe

Never give the model a database user that can write or drop tables. OWASP's guidance on **excessive agency** says an LLM extension should get **read access on only the tables it needs**, and that this should be **enforced in the database itself**, with permissions on the account the model connects with.

```sql
GRANT SELECT ON products TO llm_reader;  -- not GRANT ALL
```

## Don't trust blindly

**Show the SQL** next to every answer. A query can run fine and still answer the wrong question.

To improve accuracy, give the model:

- **column descriptions**,
- **sample values**, and
- a **glossary** of your business terms.

| Good fit | Needs a human |
|---|---|
| Quick analytics and exploration | Finance numbers and reports people act on |

> Plain English in, SQL out. Check it before you trust it.

## Sources

- [Yale LILY, Spider](https://yale-lily.github.io/spider)
- [Li et al., BIRD: Can LLM Already Serve as A Database Interface?](https://arxiv.org/abs/2305.03111)
- [BIRD benchmark and leaderboard](https://bird-bench.github.io/)
- [Lei et al., Spider 2.0](https://arxiv.org/abs/2411.07763)
- [Spider 2.0 site](https://spider2-sql.github.io/)
- [OWASP, LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)
