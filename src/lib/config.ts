export const config = {
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY,
  isDevelopment: import.meta.env.DEV,
};

export function validateConfig() {
  if (!config.geminiApiKey) {
    throw new Error(
      'Missing VITE_GEMINI_API_KEY environment variable. Please add it to your .env file.'
    );
  }
}
