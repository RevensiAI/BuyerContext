#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const target = args.find((arg) => !arg.startsWith("--"));
const full = args.includes("--full");
const timeoutArg = args.find((arg) => arg.startsWith("--timeout="));
const timeout = Number(timeoutArg?.split("=")[1] ?? 15000);

if (!target) {
  console.error("Usage: node research-fetch.mjs <url> [--full] [--timeout=15000]");
  process.exit(1);
}

let url;
try {
  url = new URL(target);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("unsupported protocol");
} catch {
  console.error(`Invalid public URL: ${target}`);
  process.exit(1);
}

if (!Number.isFinite(timeout) || timeout < 1000 || timeout > 60000) {
  console.error("Timeout must be between 1000 and 60000 milliseconds.");
  process.exit(1);
}

const response = await fetch(url, {
  redirect: "follow",
  signal: AbortSignal.timeout(timeout),
  headers: {
    "user-agent": "Mozilla/5.0 (compatible; BuyerContextResearch/0.3; +https://github.com/RevensiAI/BuyerContext)",
    accept: "text/html,application/xhtml+xml",
  },
});

if (!response.ok) {
  console.error(`Fetch failed: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const contentType = response.headers.get("content-type") ?? "";
if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
  console.error(`Expected HTML but received ${contentType || "an unknown content type"}.`);
  process.exit(1);
}

const html = await response.text();
const finalUrl = response.url;

function decode(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function plain(value) {
  return decode(
    value
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(script|style|svg|noscript|template)[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function first(pattern) {
  const match = html.match(pattern);
  return match ? plain(match[1]) : null;
}

function all(pattern) {
  return [...html.matchAll(pattern)].map((match) => plain(match[1])).filter(Boolean);
}

const description =
  html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)?.[1] ??
  html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i)?.[1] ??
  null;
const canonical =
  html.match(/<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]+href=["']([^"']+)["'][^>]*>/i)?.[1] ??
  html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*canonical[^"']*["'][^>]*>/i)?.[1] ??
  null;

const links = [...html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>/gi)]
  .map((match) => {
    try {
      return new URL(match[1], finalUrl).href;
    } catch {
      return null;
    }
  })
  .filter((value, index, values) => value && /^https?:/.test(value) && values.indexOf(value) === index)
  .slice(0, 250);

const payload = {
  fetchedAt: new Date().toISOString(),
  requestedUrl: url.href,
  finalUrl,
  title: first(/<title[^>]*>([\s\S]*?)<\/title>/i),
  description: description ? decode(description).trim() : null,
  canonicalUrl: canonical ? new URL(canonical, finalUrl).href : null,
  headings: {
    h1: all(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi),
    h2: all(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi),
    h3: all(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi),
  },
  text: plain(html),
  links,
};

const researchDir = resolve(process.cwd(), "research");
await mkdir(researchDir, { recursive: true });
const digest = createHash("sha1").update(finalUrl).digest("hex").slice(0, 12);
const payloadPath = resolve(researchDir, `fetch_${digest}.json`);
await writeFile(payloadPath, `${JSON.stringify(payload, null, 2)}\n`);

const gitignorePath = resolve(process.cwd(), ".gitignore");
try {
  const gitignore = await readFile(gitignorePath, "utf8");
  if (!gitignore.split(/\r?\n/).includes("research/")) {
    await writeFile(gitignorePath, `${gitignore.replace(/\s*$/, "")}\nresearch/\n`);
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const output = {
  ...payload,
  text: full ? payload.text : payload.text.slice(0, 12000),
  links: full ? payload.links : payload.links.slice(0, 50),
  payloadPath,
  truncated: !full && (payload.text.length > 12000 || payload.links.length > 50),
};

console.log(JSON.stringify(output, null, 2));
