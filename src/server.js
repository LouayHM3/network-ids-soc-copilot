import { createServer } from 'node:http';
import { copilotExplain, search } from './index.js';

const server = createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const results = search(url.searchParams.get('q') ?? '');
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify({ results, explanation: results[0] ? copilotExplain(results[0]) : null }));
});
server.listen(process.env.PORT || 3001, () => console.log('Network IDS copilot listening on http://localhost:3001'));
