# Network IDS & SOC Copilot

A runnable portfolio slice of an end-to-end security analytics chain: normalized Zeek/Suricata-style events, indexed search, MITRE ATT&CK enrichment, and a retrieval-grounded analyst explanation.

## Run

```bash
npm test
npm start
curl "http://localhost:3001/?q=DNS"
```

The demo is deterministic and dependency-free. In production, replace the in-memory event store with OpenSearch, connect Zeek and Suricata exporters, and replace `copilotExplain` with a grounded LLM call whose context is the retrieved alert evidence.

## Architecture

`event -> normalize -> search -> ATT&CK map -> evidence-grounded explanation`

The intentionally small surface makes the data contract easy to inspect and extend with feature engineering or a classifier.
