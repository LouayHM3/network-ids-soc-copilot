import { loadEvents } from './pipeline.js';

const file = process.argv[2] ?? 'data/events.ndjson';
const events = await loadEvents(file);
console.log(JSON.stringify({ ingested: events.length, highSeverity: events.filter(event => event.severity === 1).length, events }, null, 2));
