---
name: buyer-context
description: Build or refresh a source-backed buyer-context.md from company, customer, market, and competitor evidence. Use when the user wants to define or update their ICP, buying committee, jobs to be done, triggers, pains, decision criteria, objections, alternatives, proof, buyer language, or positioning; when research agents need shared buyer context; or when another workflow reports that buyer-context.md is missing or stale.
---

# Buyer Context

Create a concise decision document that other people and agents can reliably use. The website may be one source, but do not treat it as the complete truth about the buyer.

## Method

1. Read `references/research-method.md` and `references/buyer-context.spec.md`.
2. Look for an existing `buyer-context.md` and relevant files under `research/`. Also use customer material, product documentation, CRM exports, notes, URLs, or other evidence the user explicitly supplies.
3. Establish the company, offer, market, and intended scope. Ask only for information that is necessary to avoid researching the wrong business or segment.
4. Build a source register with stable IDs. Use the agent runtime's browsing or search tools for current public evidence. To extract a supplied public webpage, run `node <this-skill-directory>/scripts/research-fetch.mjs <url>`; use `--full` only when the compact result is insufficient.
5. Synthesize evidence into the canonical structure. Distinguish observed facts, inferences, hypotheses, and unknowns. Keep materially different buyer segments separate.
6. Write or update `buyer-context.md`. Preserve still-supported knowledge from an existing file, remove claims contradicted by better evidence, and cite material conclusions.
7. Report what changed, the most consequential conclusions, confidence limits, and the next evidence worth collecting.

## Quality bar

- Describe real buying situations, not generic personas.
- Include anti-ICP boundaries and non-software alternatives where supported.
- Preserve buyer language as verbatim quotes only when a source supports it.
- Make positioning implications useful without turning the file into marketing copy.
- Mark missing evidence `Unknown` rather than filling gaps from convention.
- Do not publish, upload, or send private source material elsewhere unless the user explicitly asks.
