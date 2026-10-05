export function featurize(alert) {
  return [Number(alert.severity), Math.log1p(Number(alert.bytes)), alert.source === 'suricata' ? 1 : 0, alert.features?.isExternalDestination ? 1 : 0];
}

export function scoreAttackLikelihood(alert, weights = [0.45, 0.15, 0.2, 0.2], bias = -0.8) {
  const raw = featurize(alert).reduce((sum, value, index) => sum + value * weights[index], bias);
  return 1 / (1 + Math.exp(-raw));
}
