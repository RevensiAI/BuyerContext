---
name: company-research
description: Research a company, its offer, capabilities, commercial model, customers, and proof to create research/company.md for buyer-context synthesis. Use when the user wants structured company research, needs to ground positioning in what the business actually delivers, supplies company or product materials, or needs the company side of a buyer-context.md. A website is one possible source, not a prerequisite.
---

# Company Research

Create `research/company.md`: a source-backed account of what the company sells, who it appears to serve, how it creates value, and what it can prove.

## Method

1. Read `references/research-method.md`.
2. Identify the company and research scope. Use user-supplied product docs, proposals, strategy notes, customer materials, and public sources that are in scope.
3. Prefer first-party operational evidence over polished claims. Use the runtime's browsing tools for current public sources. For a supplied public page, run `node <this-skill-directory>/scripts/research-fetch.mjs <url>`.
4. Compare what the company claims with the capabilities and proof the evidence supports. Note contradictions, outdated materials, and claims that lack evidence.
5. Write `research/company.md` with:
   - research scope, date, and confidence;
   - company and offer;
   - problems addressed and value delivered;
   - capabilities and delivery model;
   - apparent customers and use cases;
   - pricing or commercial model, if known;
   - proof and credibility signals;
   - constraints, exclusions, and unresolved questions;
   - positioning observations;
   - source register.
6. Summarize the strongest evidence and the gaps that customer or market research should resolve.

## Rules

- Do not infer customer demand merely because the company makes a claim.
- Distinguish current offers from discontinued or aspirational capabilities.
- Do not expose sensitive internal details in the report unless they are necessary for the user's stated purpose.
