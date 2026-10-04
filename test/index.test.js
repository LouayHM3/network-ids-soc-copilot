import test from 'node:test';
import assert from 'node:assert/strict';
import { copilotExplain, normalize, search } from '../src/index.js';

test('normalizes a Suricata event and maps ATT&CK', () => {
  const item = normalize({ signature: 'SSH Brute Force', source: 'suricata', severity: '2', src_ip: 'a', dest_ip: 'b', bytes: 2 });
  assert.equal(item.severity, 2);
  assert.equal(item.mitre.id, 'T1110.001');
});

test('search narrows indexed evidence', () => assert.equal(search('DNS').length, 1));
test('copilot explanation includes evidence and action', () => {
  const text = copilotExplain(search('a-1042')[0]);
  assert.match(text, /T1059.004/);
  assert.match(text, /Contain/);
});
