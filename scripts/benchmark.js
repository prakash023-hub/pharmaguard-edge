#!/usr/bin/env node
import { parseArgs } from "node:util";
import { loadModel, LLAMA_3_2_1B_INST_Q4_0, completion, unloadModel } from "@qvac/sdk";
import { runClinicalAgent } from "../src/agent.js";

const { values } = parseArgs({
  options: { "demo-query": { type: "string" } },
});

const QUERIES = [
  values["demo-query"] ||
    "Patient eGFR 35 with uncomplicated UTI — best AWaRe antibiotic?",
  "Penicillin allergy — alternative for community pneumonia?",
  "eGFR 28 — can patient continue metformin?",
];

console.log("PharmaGuard Edge benchmark — generates inference_log.json for QVAC judges\n");

for (const q of QUERIES) {
  console.log(`\n=== Query: ${q}\n`);
  await runClinicalAgent(q, {
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    loadModel,
    completion,
    unloadModel,
  });
}

console.log("\nDone. Attach inference_log.json + demo video to DoraHacks BUIDL.");
