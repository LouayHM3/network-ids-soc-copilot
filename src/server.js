import { createServer } from 'node:http';
import { copilotExplain, search } from './index.js';
import { loadEvents } from './pipeline.js';

const dataFile = new URL('../data/events.ndjson', import.meta.url);

const server = createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  if (url.pathname === '/health') {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify({ status: 'ok', service: 'network-ids-soc-copilot' }));
    return;
  }
  if (url.pathname === '/ingest') {
    loadEvents(dataFile).then(events => {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({ ingested: events.length, events }));
    }).catch(error => {
      response.statusCode = 500;
      response.end(JSON.stringify({ error: error.message }));
    });
    return;
  }
  const results = search(url.searchParams.get('q') ?? '');
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify({ results, explanation: results[0] ? copilotExplain(results[0]) : null }));
});
server.listen(process.env.PORT || 3001, () => console.log('Network IDS copilot listening on http://localhost:3001'));
