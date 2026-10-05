export function log(level, message, fields = {}) {
  process.stdout.write(`${JSON.stringify({ timestamp: new Date().toISOString(), level, message, ...fields })}\n`);
}

import crypto from 'node:crypto';

export function requestId(request) { return request.headers['x-request-id'] ?? crypto.randomUUID(); }
