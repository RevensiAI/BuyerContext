#!/usr/bin/env node

import { copyFile, mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const copies = [
  ...[
    "buyer-context",
    "company-research",
    "customer-research",
    "market-research",
    "competitor-research",
    "full-research",
  ].map((skill) => ["shared/research-method.md", `skills/${skill}/references/research-method.md`]),
  ["shared/buyer-context.spec.md", "skills/buyer-context/references/buyer-context.spec.md"],
  ["shared/buyer-context.spec.md", "skills/full-research/references/buyer-context.spec.md"],
  ...["buyer-context", "company-research", "competitor-research", "full-research"].map((skill) => [
    "shared/scripts/research-fetch.mjs",
    `skills/${skill}/scripts/research-fetch.mjs`,
  ]),
  ...["market-research", "competitor-research", "full-research"].map((skill) => [
    "shared/scripts/research-search.mjs",
    `skills/${skill}/scripts/research-search.mjs`,
  ]),
];

let changed = 0;
for (const [source, destination] of copies) {
  const sourcePath = resolve(root, source);
  const destinationPath = resolve(root, destination);
  await mkdir(dirname(destinationPath), { recursive: true });
  const sourceContents = await readFile(sourcePath);
  let destinationContents;
  try {
    destinationContents = await readFile(destinationPath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (!destinationContents?.equals(sourceContents)) {
    await copyFile(sourcePath, destinationPath);
    changed += 1;
  }
}

console.log(`Synced ${changed} runtime file${changed === 1 ? "" : "s"}.`);
