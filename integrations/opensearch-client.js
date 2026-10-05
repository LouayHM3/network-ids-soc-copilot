import { buildAlertDocument, buildSearchQuery } from './opensearch.js';
import { withRetry } from '../src/retry.js';

export function createOpenSearchClient({ baseUrl, username, password, fetchImpl = fetch }) {
  async function request(path, options = {}) {
    return withRetry(async () => {
      const response = await fetchImpl(`${baseUrl}${path}`, { ...options, headers: { 'content-type': 'application/json', authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`, ...(options.headers ?? {}) } });
      if (!response.ok) throw new Error(`OpenSearch request failed: ${response.status}`);
      return response.json();
    });
  }
  return { request, search: query => request(`/${buildSearchQuery(query).index}/_search`, { method: 'POST', body: JSON.stringify(buildSearchQuery(query).body) }), index: alert => request(`/${buildAlertDocument(alert)._index}/_doc/${alert.id}`, { method: 'PUT', body: JSON.stringify(buildAlertDocument(alert)._source) }) };
}
