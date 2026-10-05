export function buildAlertDocument(alert) {
  return { _index: 'security-alerts-v1', _id: alert.id, _source: { ...alert, '@timestamp': alert.timestamp, tags: ['network-security', alert.source, `mitre:${alert.mitre?.id ?? 'unmapped'}`] } };
}

export function buildSearchQuery(query = '') {
  return { index: 'security-alerts-v1', body: { query: query ? { multi_match: { query, fields: ['signature^3', 'src_ip', 'dest_ip', 'mitre.id', 'evidence'] } } : { match_all: {} }, sort: [{ '@timestamp': 'desc' }] } };
}
