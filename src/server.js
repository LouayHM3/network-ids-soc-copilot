import { createServer } from 'node:http';
import { copilotExplain, search } from './index.js';
import { loadEvents } from './pipeline.js';
import { authorize, loadConfig } from './config.js';
import { log, requestId } from './logger.js';

const dataFile = new URL('../data/events.ndjson', import.meta.url);
const config = loadConfig();

const server = createServer((request, response) => {
  const correlationId = requestId(request);
  response.setHeader('x-request-id', correlationId);
  if (!authorize(request, config)) {
    response.statusCode = 401;
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify({ error: 'unauthorized', requestId: correlationId }));
    return;
  }
  log('info', 'request received', { method: request.method, path: request.url, requestId: correlationId });
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
