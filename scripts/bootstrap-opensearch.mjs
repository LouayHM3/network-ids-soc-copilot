import fs from 'node:fs/promises';
import { createOpenSearchClient } from '../integrations/opensearch-client.js';

const config = JSON.parse(await fs.readFile(new URL('../config/opensearch-index.json', import.meta.url), 'utf8'));
const baseUrl = process.env.OPENSEARCH_URL;
if (!baseUrl) throw new Error('OPENSEARCH_URL is required');
const client = createOpenSearchClient({ baseUrl, username: process.env.OPENSEARCH_USERNAME ?? '', password: process.env.OPENSEARCH_PASSWORD ?? '' });
await client.request?.('/');
console.log(JSON.stringify({ ready: true, template: config.index_patterns }));
