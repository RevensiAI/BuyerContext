---
name: market-research
description: Research a market, category, buyer environment, trends, constraints, and alternatives to create research/market.md for buyer-context synthesis. Use when the user wants current market research, category framing, demand drivers, buyer trends, market terminology, regulatory or technology shifts, or external evidence that explains why and when buyers act.
---

# Market Research

Create `research/market.md`: a current, decision-oriented view of the environment in which the buyer evaluates the problem.

## Method

1. Read `references/research-method.md`.
2. Define the market question, geography, buyer segment, and time horizon. Avoid pretending a broad category is one homogeneous market.
3. Use the runtime's browsing and search tools, favoring current primary sources and credible independent research. If native search is unavailable and `BRAVE_API_KEY` is configured, run `node <this-skill-directory>/scripts/research-search.mjs "<query>"`.
4. Research demand drivers, trigger events, constraints, category language, buyer priorities, common solution approaches, and material changes in technology, regulation, budgets, or behavior.
5. Triangulate consequential claims. Treat market-size estimates cautiously and document definitions, dates, and methodological limitations.
6. Write `research/market.md` with:
   - scope, date, and confidence;
   - category definition and boundaries;
   - buyer environment and demand drivers;
   - current changes and trigger events;
   - common approaches and alternatives;
   - decision criteria and constraints;
   - language used by buyers and the market;
   - implications for ICP and positioning;
   - contradictions, unknowns, and next questions;
   - source register.
7. Summarize the few external changes that most affect buyer context.

## Rules

- Do not use a search snippet as the final source for an important claim.
- Separate sourced facts from interpretation and avoid false precision.
- Prefer buyer-relevant dynamics over encyclopedic market summaries.
