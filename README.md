# BuyerContext

An open research-agent toolkit for building and maintaining a source-backed picture of who buys, why they act, what they compare, and what evidence they trust.

BuyerContext turns company material, customer conversations, CRM notes, reviews, market sources, competitor evidence, and product documentation into a durable `buyer-context.md`. A company website can contribute evidence, but it is one source—not the product and not automatically the truth.

Works with Claude Code, OpenAI Codex, Cursor, Windsurf, and other runtimes that support [Agent Skills](https://agentskills.io/).

## What it produces

```text
research/
├── company.md
├── customers.md
├── market.md
└── competitors.md
buyer-context.md
```

The research files preserve evidence and uncertainty. `buyer-context.md` synthesizes the knowledge that downstream product, go-to-market, sales, content, and AI agents need: ICP, buying committee, jobs, triggers, pains, desired outcomes, decision criteria, objections, alternatives, buyer language, proof, positioning implications, and open questions.

## Skills

| Skill | Purpose | Output |
|---|---|---|
| `buyer-context` | Build or refresh the canonical buyer intelligence document | `buyer-context.md` |
| `company-research` | Understand the offer, capabilities, customers, constraints, and proof | `research/company.md` |
| `customer-research` | Analyze interviews, calls, CRM notes, reviews, and support evidence | `research/customers.md` |
| `market-research` | Research the category, buyer environment, demand drivers, and shifts | `research/market.md` |
| `competitor-research` | Analyze the alternatives buyers actually compare | `research/competitors.md` |
| `full-research` | Coordinate all four workstreams and synthesize buyer context | All five files |

## Install

Install the Agent Skills collection:

```bash
npx skills add RevensiAI/BuyerContext
```

Or install it as a Claude Code plugin:

```bash
/plugin marketplace add RevensiAI/BuyerContext
/plugin install revensi@revensi-buyer-context
```

Or as an OpenAI Codex plugin:

```bash
codex plugin marketplace add RevensiAI/BuyerContext
codex plugin install buyer-context@revensi-buyer-context
```

Node.js 18 or newer is required for the included public-page research helpers. No API key is required for the core workflow. `BRAVE_API_KEY` is optional when the agent runtime has no native web search.

## Quickstart

Run a complete research pass:

```text
/full-research
```

Or start with the evidence you already have:

```text
/customer-research ./interviews ./win-loss-notes.csv
/company-research ./product-docs https://example.com
/market-research Research the UK market for …
/competitor-research Compare the alternatives buyers use for …
/buyer-context Refresh our buyer context from the research folder
```

Each skill asks only for information needed to establish scope, reads evidence the user places in scope, and writes Markdown into the current project. It does not publish or share results without an explicit request.

## Research standard

BuyerContext distinguishes four states:

- **Observed** — directly supported by a cited source.
- **Inferred** — a reasoned interpretation of cited evidence.
- **Hypothesis** — plausible but not yet well supported.
- **Unknown** — important information the evidence cannot answer.

Material claims carry stable source IDs. The skills preserve contradictions, segment differences, confidence limits, and verbatim buyer language without inventing quotes or filling gaps with generic personas. See [`shared/research-method.md`](shared/research-method.md) and [`shared/buyer-context.spec.md`](shared/buyer-context.spec.md).

## Repository layout

```text
BuyerContext/
├── skills/
│   ├── buyer-context/
│   ├── company-research/
│   ├── customer-research/
│   ├── market-research/
│   ├── competitor-research/
│   └── full-research/
├── shared/                  # source of truth for shared references and scripts
├── .claude-plugin/
├── .codex-plugin/
└── .agents/plugins/
```

Maintainers can run `npm run sync` after changing a shared reference or script. Each skill remains independently installable because the sync step copies its required runtime files into that skill directory.

## About Revensi

We help companies define their AI strategy and build proprietary AI systems around their data, workflows and knowledge, without locking critical intelligence into a vendor.

Learn more at [revensi.com](https://revensi.com).

## Privacy, contributions, and license

The toolkit has no Revensi telemetry or hosted backend. Local evidence and outputs remain in the user's environment by default. See [`PRIVACY.md`](PRIVACY.md) for the full data-flow description.

Issues and focused pull requests are welcome. BuyerContext is available under the [MIT License](LICENSE).
