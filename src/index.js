const ATTACK_MAP = {
  'ET WEB_SERVER Command Injection': { id: 'T1059.004', name: 'Unix Shell', tactic: 'Execution' },
  'SSH Brute Force': { id: 'T1110.001', name: 'Password Guessing', tactic: 'Credential Access' },
  'DNS Tunneling': { id: 'T1071.004', name: 'DNS', tactic: 'Command and Control' }
};

export const alerts = [
  { id: 'a-1042', source: 'suricata', signature: 'ET WEB_SERVER Command Injection', src_ip: '10.20.4.18', dest_ip: '10.20.1.12', severity: 1, bytes: 842, timestamp: '2026-10-04T09:14:22Z' },
  { id: 'a-1041', source: 'zeek', signature: 'DNS Tunneling', src_ip: '10.20.7.9', dest_ip: '8.8.8.8', severity: 2, bytes: 18340, timestamp: '2026-10-04T09:10:06Z' },
  { id: 'a-1040', source: 'suricata', signature: 'SSH Brute Force', src_ip: '172.16.2.44', dest_ip: '10.20.3.7', severity: 2, bytes: 2410, timestamp: '2026-10-04T08:58:41Z' }
];

export function normalize(event) {
  const technique = ATTACK_MAP[event.signature] ?? { id: 'T1595', name: 'Active Scanning', tactic: 'Reconnaissance' };
  return { ...event, severity: Number(event.severity), mitre: technique, evidence: [`${event.source} signature: ${event.signature}`, `${event.bytes} bytes from ${event.src_ip} to ${event.dest_ip}`] };
}

export function search(query = '') {
  const term = query.toLowerCase();
  return alerts.map(normalize).filter(alert => !term || JSON.stringify(alert).toLowerCase().includes(term));
}

export function copilotExplain(alert) {
  const item = typeof alert === 'string' ? search(alert)[0] : normalize(alert);
  if (!item) return 'No matching evidence was found.';
  const confidence = item.severity === 1 ? 'high' : 'medium';
  return `${item.signature} maps to ${item.mitre.id} (${item.mitre.name}), in the ${item.mitre.tactic} tactic. ${item.evidence.join('; ')}. Triage confidence: ${confidence}. Contain ${item.src_ip}, preserve packet and process evidence, then validate the destination host.`;
}
