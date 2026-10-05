import test from 'node:test';
import assert from 'node:assert/strict';
import { authorize, loadConfig } from '../src/config.js';
import { withRetry } from '../src/retry.js';

test('requires the configured API key in production', () => {
  const config = loadConfig({ NODE_ENV: 'production', API_KEY: 'secret' });
  assert.equal(authorize({ headers: { 'x-api-key': 'secret' } }, config), true);
  assert.equal(authorize({ headers: {} }, config), false);
});
test('retries transient operations', async () => {
  let attempts = 0;
  const result = await withRetry(() => { attempts += 1; if (attempts < 2) throw new Error('temporary'); return 'ok'; });
  assert.equal(result, 'ok');
  assert.equal(attempts, 2);
});
