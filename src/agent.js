import { lookupDrug } from "./fda_cache.js";
import { localPiiCheck } from "./guardrails.js";
import { createRunLogger } from "./inference_logger.js";

const SYSTEM_PROMPT = `You are PharmaGuard Edge, an offline antibiotic stewardship assistant.
Use AWaRe categories (ACCESS, WATCH, RESERVE). Be concise. Cite renal dosing when eGFR mentioned.
Never invent patient identifiers. If unsure, recommend specialist review.`;

/**
 * Run clinical Q&A with QVAC SDK. Swap model import for MedPsy on Psy Models track.
 * @see https://docs.qvac.tether.io — use QVAC MedPsy model constant when available.
 */
export async function runClinicalAgent(userQuery, { modelSrc, loadModel, completion, unloadModel }) {
  const logger = createRunLogger();
  logger.log("run_start", { prompt_chars: userQuery.length });

  const piiBlock = localPiiCheck(userQuery);
  if (piiBlock) {
    logger.log("guardrail_block", { reason: piiBlock });
    const path = logger.flush();
    return { answer: `BLOCKED: ${piiBlock}`, logPath: path, blocked: true };
  }
  logger.log("guardrail_pass");

  const drug = lookupDrug(userQuery);
  logger.log("local_fda_cache_hit", { drug: drug.names[0], aware: drug.aware });

  logger.log("model_load_start", { model: String(modelSrc) });
  const loadStart = performance.now();
  const modelId = await loadModel({
    modelSrc,
    modelType: "llm",
    onProgress: (p) => logger.log("model_load_progress", { progress: p }),
  });
  const loadMs = Math.round(performance.now() - loadStart);
  logger.log("model_load_complete", { load_ms: loadMs });

  const userContent = [
    `Clinical query: ${userQuery}`,
    `Local drug reference (offline cache): ${drug.names[0]}`,
    `AWaRe: ${drug.aware}`,
    `Renal: ${drug.renal}`,
    `Indication: ${drug.indication}`,
    "Give a short recommendation with AWaRe rationale.",
  ].join("\n");

  const inferStart = performance.now();
  let ttftMs = null;
  let tokenCount = 0;
  let answer = "";

  const result = completion({
    modelId,
    history: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userContent },
    ],
    stream: true,
  });

  for await (const token of result.tokenStream) {
    if (ttftMs === null) {
      ttftMs = Math.round(performance.now() - inferStart);
      logger.log("first_token", { ttft_ms: ttftMs });
    }
    tokenCount += 1;
    answer += token;
    process.stdout.write(token);
  }
  process.stdout.write("\n");

  const inferMs = Math.round(performance.now() - inferStart);
  const tps = inferMs > 0 ? Number((tokenCount / (inferMs / 1000)).toFixed(2)) : 0;
  logger.log("inference_complete", {
    infer_ms: inferMs,
    ttft_ms: ttftMs,
    tokens: tokenCount,
    tokens_per_sec: tps,
  });

  logger.log("model_unload_start");
  await unloadModel({ modelId });
  logger.log("model_unload_complete");

  const logPath = logger.flush();
  return { answer: answer.trim(), logPath, drug, metrics: { ttftMs, tps, loadMs } };
}
