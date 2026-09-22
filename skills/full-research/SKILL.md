---
name: full-research
description: Run the complete BuyerContext research workflow across company, customer, market, and competitor evidence, then synthesize or refresh buyer-context.md. Use when the user asks for full buyer research, an end-to-end buyer context, a positioning research sprint, or a coordinated refresh of all BuyerContext research outputs.
---

# Full Research

Produce a coherent research set and canonical buyer context:

- `research/company.md`
- `research/customers.md`
- `research/market.md`
- `research/competitors.md`
- `buyer-context.md`

## Workflow

1. Read `references/research-method.md` and `references/buyer-context.spec.md`.
2. Establish the company, offer, target market, geography, intended decision, available private evidence, and any known competitors. Ask only for missing information that would materially change scope.
3. Inventory existing outputs and their dates. Reuse still-current evidence; do not rerun research merely to replace it.
4. Run these workstreams, independently where the runtime supports it:
   - company research following the `company-research` skill;
   - customer research following the `customer-research` skill;
   - market research following the `market-research` skill;
   - competitor research following the `competitor-research` skill.
5. Reconcile conflicting evidence across the four reports. Give direct customer and operational evidence appropriate weight without ignoring newer market changes.
6. Follow the `buyer-context` skill to write or refresh `buyer-context.md`. Do not merely concatenate the research reports.
7. Deliver a short readout covering:
   - the highest-confidence buyer conclusions;
   - what changed from any prior context;
   - consequential disagreements or weak evidence;
   - the next three research actions with the greatest information value.

## Execution rules

- Keep private customer sources local and out of public searches.
- Use current public sources and access dates for market and competitor claims.
- Preserve source IDs from each report so conclusions remain traceable.
- If a workstream has no usable evidence, mark it incomplete and continue with explicit limits.
- Do not publish or share outputs unless the user explicitly asks.
