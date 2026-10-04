# IDS pipeline architecture

1. **Collection:** Zeek and Suricata emit structured network events.
2. **Preparation:** `src/pipeline.js` validates, normalizes, and extracts features.
3. **Storage/search:** the demo uses `data/events.ndjson`; production maps the normalized contract to OpenSearch.
4. **Analysis:** the `features` object is ready for a classifier or anomaly detector.
5. **Context:** ATT&CK enrichment and evidence are attached before generation.
6. **Response:** the HTTP API returns alerts and a bounded triage explanation.

Production hardening would add authentication, OpenSearch index templates, a queue between collection and processing, and an LLM gateway with prompt and output logging.
