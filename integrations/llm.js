export function buildCopilotPrompt(alert) {
  return { system: 'You are a SOC triage assistant. Use only the supplied evidence. Never invent telemetry.', user: `Alert: ${alert.signature}\nATT&CK: ${alert.mitre?.id ?? 'unmapped'}\nEvidence:\n${(alert.evidence ?? []).join('\n')}\nReturn: summary, confidence, and three containment actions.` };
}

export function parseCopilotResponse(text) {
  return { raw: text, grounded: Boolean(text) && !/no evidence|I assume|probably/i.test(text), actions: text.split('\n').filter(line => /^[-*]\s/.test(line)).slice(0, 3) };
}
