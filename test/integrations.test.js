import test from 'node:test';
import assert from 'node:assert/strict';
import { parseZeekConnLog } from '../integrations/zeek.js';
import { parseSuricataEve } from '../integrations/suricata.js';
import { buildSearchQuery } from '../integrations/opensearch.js';
import { scoreAttackLikelihood } from '../integrations/classifier.js';

test('parses a Zeek connection record', () => assert.equal(parseZeekConnLog('1728000000\tC1\t10.0.0.1\t1234\t8.8.8.8\t53\tudp\t1.2\t10\t20').bytes, 30));
test('normalizes a Suricata EVE alert', () => assert.equal(parseSuricataEve({ event_type: 'alert', flow_id: 7, timestamp: '2026-01-01T00:00:00Z', src_ip: '10.0.0.1', dest_ip: '8.8.8.8', alert: { signature: 'DNS Tunneling', severity: 2 } }).source, 'suricata'));
test('builds an OpenSearch query', () => assert.equal(buildSearchQuery('DNS').body.query.multi_match.query, 'DNS'));
test('returns a bounded classifier probability', () => assert.ok(scoreAttackLikelihood({ severity: 1, bytes: 500, source: 'suricata' }) > 0 && scoreAttackLikelihood({ severity: 1, bytes: 500, source: 'suricata' }) < 1));
