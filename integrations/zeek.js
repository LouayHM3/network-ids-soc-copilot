export function parseZeekConnLog(line) {
  const [ts, uid, sourceIp, sourcePort, destIp, destPort, protocol, duration, origBytes, respBytes] = line.trim().split('\t');
  if (!ts || !sourceIp || !destIp) throw new Error('Invalid Zeek conn.log record');
  return { id: uid, source: 'zeek', signature: `Zeek ${protocol} connection`, src_ip: sourceIp, src_port: Number(sourcePort), dest_ip: destIp, dest_port: Number(destPort), protocol, duration: Number(duration), bytes: Number(origBytes || 0) + Number(respBytes || 0), timestamp: new Date(Number(ts) * 1000).toISOString() };
}
