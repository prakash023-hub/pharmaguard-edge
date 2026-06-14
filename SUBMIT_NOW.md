# QVAC Submit — PharmaGuard Edge (deadline Jun 21)

**Track:** Psy Models (primary) + General Purpose  
**URL:** https://dorahacks.io/hackathon/qvac-unleach-edge-ai-i

---

## Status checklist

| Step | Command / action |
|------|------------------|
| Node ≥ 22.17 | `node --version` |
| Install SDK | `npm install` |
| Run demo | `node src/cli.js "Patient eGFR 35, UTI — safest oral antibiotic?"` |
| Benchmark log | `npm run benchmark` → creates `inference_log.json` |
| Hardware in README | Add your Mac RAM + chip (e.g. M1, 8GB) |
| Demo video ≤5 min | See script below |
| Build in Public | Post on X, tag @qvac |
| Submit BUIDL | GitHub + video + mention `inference_log.json` |

---

## Step 1 — Install & run (Terminal)

```bash
cd ~/Projects/pharmaguard-edge
npm install
node src/cli.js "Patient eGFR 35, UTI — safest oral antibiotic?"
```

First run **downloads the model** — can take 5–15 min. Wait for streaming answer + `inference_log.json`.

If `npm install` fails with `@qvac/util-transcription` 404:
```bash
rm -rf node_modules package-lock.json
npm install
```
(`package.json` already pins `@qvac/sdk@1.1.0` + npm overrides for broken transitive deps.)

---

## Step 2 — Generate judge log (3 queries)

```bash
npm run benchmark
```

Confirm file exists:
```bash
cat inference_log.json | head -20
```

Must include: `model_load_*`, `first_token` (TTFT), `inference_complete` (tokens/sec), `model_unload_*`.

---

## Step 3 — Add hardware to README (edit one line)

Open README, add under Team:

```
**Hardware:** MacBook Air, Apple M1, 8GB RAM, macOS 26
```

(Use your real specs.)

---

## Step 4 — Video script (3 min, read aloud)

**[Terminal — run cli.js]**

> "Hi, I'm Prakash. **PharmaGuard Edge** for the QVAC Hackathon."

> "Hospitals can't send patient data to the cloud. Our clinical AI runs **100% offline** on your laptop using the **QVAC SDK**."

**[Show streaming tokens + final answer]**

> "Ask a UTI antibiotic question — the agent uses **AWaRe stewardship** and a **local drug cache**. No OpenAI. No API keys. No cloud."

**[Show inference_log.json — TTFT and tokens/sec]**

> "Every run is logged: model load, time-to-first-token, tokens per second, model unload — full evidence for edge AI."

**[Optional: show PII block]**

> "PII guardrails block SSN patterns before inference."

> "PharmaGuard Edge — privacy-first clinical AI that hospitals can actually deploy."

---

## Step 5 — Build in Public (X post)

```
Built PharmaGuard Edge for @qvac — offline antibiotic steward on-device.
Zero cloud. inference_log.json with TTFT/TPS. #QVAC #EdgeAI
[DoraHacks BUIDL link]
```

---

## Step 6 — DoraHacks BUIDL (paste)

**Title:** PharmaGuard Edge — Offline Clinical AI on QVAC

**Tagline:** AWaRe antibiotic stewardship — 100% on-device, zero cloud.

**Description:**

PharmaGuard Edge is an offline clinical antibiotic steward built with `@qvac/sdk`. Patient queries never leave the device. A local FDA drug cache + Llama 3.2 1B inference delivers AWaRe-category recommendations with full `inference_log.json` evidence (model load/unload, TTFT, tokens/sec).

**Tracks:** Psy Models (clinical reasoning) + General Purpose (QVAC SDK pipeline)

**Hardware:** [your Mac specs]

**GitHub:** https://github.com/prakash023-hub/pharmaguard-edge

**Demo video:** [YouTube link]

**Evidence:** `inference_log.json` in repo root

---

## One story across 3 hackathons

| Project | Chain |
|---------|-------|
| PharmaGuard Edge (QVAC) | Offline — data never leaves device |
| PharmaGuard Chain (Mantle) | On-chain audit hashes |
| PharmaGuard Trust (Casper) | Agent attestations on testnet |

Same clinical agent story — privacy → proof → trust.
