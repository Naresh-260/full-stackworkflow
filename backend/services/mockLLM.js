export function mockAnswer(query, context) {
  const excerpt = context ? context.slice(0, 400) + (context.length > 400 ? '...' : '') : 'No indexed context found.';
  // Simple, friendly mock answer that references the context
  return `🤖 Mock Answer\n\nContext excerpt:\n${excerpt}\n\nAnswer to "${query}":\nI am a mock assistant for demo purposes. I found the above context as the most relevant document and used it to generate this response. Replace this module with a real LLM (OpenAI/HF/Gemini) when you have an API key.`;
}
