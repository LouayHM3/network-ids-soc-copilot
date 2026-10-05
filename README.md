# Network IDS & SOC Copilot

A complete deterministic portfolio implementation of an end-to-end security analytics chain: Zeek/Suricata-style ingestion, validation, feature engineering, indexed search, MITRE ATT&CK enrichment, and a retrieval-grounded analyst explanation.

## Run

```bash
npm test
npm start
curl "http://localhost:3001/?q=DNS"
curl http://localhost:3001/ingest
node src/cli.js
```

The demo is deterministic and dependency-free. In production, replace the NDJSON store with OpenSearch, connect Zeek and Suricata exporters, and replace `copilotExplain` with a grounded LLM call whose context is the retrieved alert evidence.

## Architecture

`event -> normalize -> search -> ATT&CK map -> evidence-grounded explanation`

The `config`, `data`, `src`, `test`, `docs`, and Docker files make the data contract easy to inspect and extend with a classifier or queue.

## Production boundary

`integrations/`, `.env.example`, `docs/openapi.yaml`, `scripts/bootstrap-opensearch.mjs`, `.github/workflows/ci.yml`, and `docs/production-deployment.md` define the authenticated, observable provider boundary. Secrets and live service URLs are intentionally supplied at deployment time.
