export function parseSuricataEve(event) {
  if (event.event_type !== 'alert' || !event.alert?.signature) throw new Error('Suricata event is not an alert');
  return { id: event.flow_id?.toString() ?? event.timestamp, source: 'suricata', signature: event.alert.signature, src_ip: event.src_ip, src_port: event.src_port, dest_ip: event.dest_ip, dest_port: event.dest_port, severity: event.alert.severity ?? 3, bytes: event.flow?.bytes_toserver ?? 0, timestamp: event.timestamp };
}
