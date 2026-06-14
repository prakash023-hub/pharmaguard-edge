import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = join(__dirname, "..", "data", "drug_cache.json");

let cache = null;

function loadCache() {
  if (!cache) {
    cache = JSON.parse(readFileSync(CACHE_PATH, "utf8"));
  }
  return cache;
}

export function lookupDrug(query) {
  const drugs = loadCache();
  const lower = query.toLowerCase();
  for (const entry of drugs) {
    if (entry.names.some((n) => lower.includes(n))) {
      return entry;
    }
  }
  return drugs.find((d) => d.names.includes("amoxicillin"));
}
