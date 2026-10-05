# Production deployment

1. Store `.env.example` values in a secret manager.
2. Apply `config/opensearch-index.json` as the versioned index template.
3. Deploy the API behind TLS and an API gateway.
4. Feed Zeek and Suricata events through the adapters into a queue.
5. Monitor `/health`, request logs, ingestion failures, and classifier drift.
6. Run `npm test` and `npm audit` in CI before publishing an image.
