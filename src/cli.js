#!/usr/bin/env node
import { loadModel, LLAMA_3_2_1B_INST_Q4_0, completion, unloadModel } from "@qvac/sdk";
import { runClinicalAgent } from "./agent.js";

const query =
  process.argv.slice(2).join(" ") ||
  "Patient eGFR 35 with uncomplicated UTI — best AWaRe antibiotic?";

console.log("PharmaGuard Edge — 100% offline clinical steward\n");

try {
  const result = await runClinicalAgent(query, {
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    loadModel,
    completion,
    unloadModel,
  });
  console.log("\n---");
  console.log(`Log written: ${result.logPath}`);
  if (result.metrics) {
    console.log(`TTFT: ${result.metrics.ttftMs}ms | TPS: ${result.metrics.tps}`);
  }
} catch (err) {
  console.error("Run failed:", err.message);
  console.error("Install: npm i && Node >= 22.17. See README for MedPsy model swap.");
  process.exit(1);
}
