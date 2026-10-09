import 'dotenv/config';

export const config = {
  get port() {
    return Number(process.env.PORT ?? '3000');
  },
  get appInsightsConnectionString() {
    return process.env.APPLICATIONINSIGHTS_CONNECTION_STRING ?? '';
  },
  get geminiApiKey() {
    return process.env.GEMINI_API_KEY ?? '';
  },
  get geminiModel() {
    return process.env.GEMINI_MODEL ?? 'gemini-3.5-flash-lite';
  },
};
