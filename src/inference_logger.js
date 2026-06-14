import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOG_PATH = join(__dirname, "..", "inference_log.json");

export function createRunLogger() {
  const events = [];
  const runStarted = performance.now();

  return {
    log(event, extra = {}) {
      events.push({
        ts: new Date().toISOString(),
        elapsed_ms: Math.round(performance.now() - runStarted),
        event,
        ...extra,
      });
    },
    flush() {
      const payload = {
        project: "pharmaguard-edge",
        hackathon: "QVAC Hackathon I - Unleash Edge AI",
        tracks: ["Psy Models", "General Purpose"],
        hardware_note: "Record your device RAM/CPU in README before submit",
        events,
      };
      writeFileSync(LOG_PATH, JSON.stringify(payload, null, 2));
      return LOG_PATH;
    },
  };
}
