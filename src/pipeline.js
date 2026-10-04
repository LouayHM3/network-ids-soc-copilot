import fs from 'node:fs/promises';
import { normalize } from './index.js';

const required = ['id', 'source', 'signature', 'src_ip', 'dest_ip', 'severity', 'bytes', 'timestamp'];

export function validateEvent(event) {
  const missing = required.filter(field => event[field] === undefined || event[field] === null || event[field] === '');
  if (missing.length) throw new Error(`Missing required fields: ${missing.join(', ')}`);
  if (!['zeek', 'suricata'].includes(event.source)) throw new Error(`Unsupported source: ${event.source}`);
  if (!Number.isFinite(Number(event.severity)) || Number(event.severity) < 1 || Number(event.severity) > 3) throw new Error('severity must be 1, 2, or 3');
  return true;
}

export function extractFeatures(event) {
  return { severity: Number(event.severity), bytes: Number(event.bytes), isExternalDestination: !String(event.dest_ip).startsWith('10.') && !String(event.dest_ip).startsWith('172.16.') };
}

export function processEvent(event) {
  validateEvent(event);
  const normalized = normalize(event);
  return { ...normalized, features: extractFeatures(normalized), processedAt: new Date().toISOString() };
}

export async function loadEvents(filePath) {
  const contents = await fs.readFile(filePath, 'utf8');
  return contents.split(/\r?\n/).filter(Boolean).map(line => processEvent(JSON.parse(line)));
}
