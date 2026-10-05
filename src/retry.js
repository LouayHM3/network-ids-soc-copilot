export async function withRetry(operation, { retries = 2, delayMs = 25 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try { return await operation(attempt); } catch (error) { lastError = error; if (attempt < retries) await new Promise(resolve => setTimeout(resolve, delayMs * (attempt + 1))); }
  }
  throw lastError;
}
