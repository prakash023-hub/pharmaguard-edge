# PharmaGuard Edge

**Offline clinical antibiotic steward for [QVAC Hackathon I](https://dorahacks.io/hackathon/qvac-unleach-edge-ai-i/detail)**

> *"Your patient's data never leaves the device. Clinical AI that hospitals can actually deploy."*

## Winning angle

| Track | Why we win |
|---|---|
| **Psy Models** | Clinical stewardship = core MedPsy use case (health + reasoning) |
| **General Purpose** | Full `@qvac/sdk` pipeline: load → infer → unload with audit logs |
| **Build in Public** | Post demo + tag @qvac on X |

## Hackathon requirements ✅

- All inference via `@qvac/sdk`
- Zero cloud during demo (local `drug_cache.json` replaces OpenFDA)
- `inference_log.json` with TTFT, tokens/sec, model load/unload events
- MIT license, reproducible README
- Demo video ≤5 min

## Quick start

```bash
cd pharmaguard-edge
npm install
node src/cli.js "Patient eGFR 35, UTI — safest oral antibiotic?"
npm run benchmark   # generates inference_log.json for judges
```

**Node ≥ 22.17 required.** For Psy Models track, swap `LLAMA_3_2_1B_INST_Q4_0` for QVAC MedPsy model constant in `src/cli.js` per [QVAC docs](https://docs.qvac.tether.io).

## Architecture

```
User query → PII guardrail → local FDA cache → @qvac/sdk inference → AWaRe answer
                                      ↓
                            inference_log.json (TTFT, TPS, events)
```

## Submit (DoraHacks)

- **Deadline:** June 21, 2026 (early bird: submit by June 14)
- **URL:** https://dorahacks.io/hackathon/qvac-unleach-edge-ai-i
- **Include:** GitHub, demo video, `inference_log.json`, hardware specs in README

## Team

Prakash Raj — forked from [PharmaGuard](https://github.com/prakash023-hub/pharma-resilient-agent)
