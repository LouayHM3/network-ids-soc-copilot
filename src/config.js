export function loadConfig(env = process.env) {
  return { nodeEnv: env.NODE_ENV ?? 'development', port: Number(env.PORT ?? 3001), apiKey: env.API_KEY ?? '', opensearchUrl: env.OPENSEARCH_URL ?? '', llmUrl: env.LLM_URL ?? '', requireApiKey: env.NODE_ENV === 'production' };
}

export function authorize(request, config = loadConfig()) {
  if (!config.requireApiKey) return true;
  return request.headers['x-api-key'] === config.apiKey && Boolean(config.apiKey);
}
