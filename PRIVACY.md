# Privacy Policy

*Last updated: 2026-09-22*

This policy applies to BuyerContext, the research-agent skill collection and plugin maintained by Revensi.

## What BuyerContext does

BuyerContext helps an AI agent analyze company, customer, market, and competitor evidence and write local Markdown research files. The toolkit has no Revensi-hosted backend, telemetry, usage analytics, error reporting, or install ping.

## Local and private material

The skills may read files the user explicitly places in scope, including interviews, call transcripts, CRM exports, reviews, notes, and product documentation. Outputs are written to `./research/` and `./buyer-context.md` in the working directory.

BuyerContext itself does not upload those files or outputs to Revensi. The AI runtime processes prompts, files, and tool results under that runtime provider's terms and privacy policy. Users should apply their organization's data-handling rules before supplying sensitive material to any AI runtime.

## Public research

- **Public webpages.** The included fetch helper makes ordinary HTTP requests to URLs used for research. Page contents and extracted text are stored locally under `./research/`.
- **Web search.** Agents may use their runtime's native search or browsing features under that provider's policies.
- **Brave Search API (optional).** If `BRAVE_API_KEY` is configured, the search helper sends the search query and API key directly to Brave. It does not send local source files. Revensi does not see this traffic.

The skills instruct agents not to include private customer material in external searches unless the user explicitly requests it.

## Data Revensi collects

**None through the toolkit.** Distribution, updates, and issue activity use GitHub under [GitHub's privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

## Changes and contact

Material changes will update the date above and remain visible in the repository history.

Questions: [hello@revensi.com](mailto:hello@revensi.com) or [open an issue](https://github.com/RevensiAI/BuyerContext/issues).
