#!/usr/bin/env node

const [query, countArg] = process.argv.slice(2);
const apiKey = process.env.BRAVE_API_KEY;
const count = Math.min(Math.max(Number(countArg ?? 8), 1), 20);

if (!query) {
  console.error('Usage: node research-search.mjs "search query" [count]');
  process.exit(1);
}

if (!apiKey) {
  console.error("BRAVE_API_KEY is required. Use the runtime's native web search when available.");
  process.exit(1);
}

if (!Number.isInteger(count)) {
  console.error("Count must be an integer from 1 to 20.");
  process.exit(1);
}

const endpoint = new URL("https://api.search.brave.com/res/v1/web/search");
endpoint.searchParams.set("q", query);
endpoint.searchParams.set("count", String(count));
endpoint.searchParams.set("safesearch", "moderate");

const response = await fetch(endpoint, {
  headers: {
    accept: "application/json",
    "x-subscription-token": apiKey,
  },
});

if (!response.ok) {
  console.error(`Search failed: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const body = await response.json();
const results = (body.web?.results ?? []).map((result) => ({
  title: result.title,
  url: result.url,
  description: result.description,
  published: result.age ?? null,
}));

console.log(JSON.stringify({ query, results }, null, 2));
