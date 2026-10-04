import test from 'node:test';
import assert from 'node:assert/strict';
import { extractFeatures, processEvent, validateEvent } from '../src/pipeline.js';

const event = { id: 'x', source: 'zeek', signature: 'DNS Tunneling', src_ip: '10.0.0.1', dest_ip: '8.8.8.8', severity: 2, bytes: 20, timestamp: '2026-01-01T00:00:00Z' };

test('rejects invalid source and severity', () => {
  assert.throws(() => validateEvent({ ...event, source: 'unknown' }), /Unsupported source/);
  assert.throws(() => validateEvent({ ...event, severity: 4 }), /severity/);
});
test('extracts a model-ready external destination feature', () => assert.equal(extractFeatures(event).isExternalDestination, true));
test('processes and timestamps an event', () => assert.equal(processEvent(event).features.bytes, 20));
