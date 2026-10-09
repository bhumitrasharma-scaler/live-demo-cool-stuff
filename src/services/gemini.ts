import { config } from '../config.js';

export type IdeaEvaluation = {
  feedback: string;
  feasibility: number;
  interest: number;
  tone: string;
};

function parseGeminiText(rawText: string): IdeaEvaluation {
  const cleanedText = rawText.trim();

  if (!cleanedText) {
    throw new Error('Gemini returned no content.');
  }

  const parsed = JSON.parse(cleanedText);

  return {
    feedback: String(parsed.feedback ?? 'The concept is interesting, but it needs a clearer customer problem.'),
    feasibility: Number(parsed.feasibility ?? 0),
    interest: Number(parsed.interest ?? 0),
    tone: String(parsed.tone ?? 'exploratory'),
  };
}

export async function analyzeIdea(rawIdea: string): Promise<IdeaEvaluation> {
  const apiKey = config.geminiApiKey;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${config.geminiModel}:generateContent?key=${apiKey}`;
  const prompt = `You are a Gen-Z startup analyst with a meme brain and actual founder instincts. Be extra playful, trend-aware, and a little chaotic, but still give a legit product read.

Return JSON only with exactly these keys: feedback, feasibility, interest, tone.

Rules:
- feedback: one short, punchy sentence full of Gen-Z slang and startup energy, like "this is lowkey fire for the right niche" or "the hook is cute, but the pain point needs more bite"
- feasibility: integer from 0 to 100
- interest: integer from 0 to 100
- tone: one short label from this set: "promising", "exploratory", "mid", "chaotic-good", "slay", "doomed", "viral"
- Make it meme-heavy, internet-native, funny, and obviously Gen-Z without becoming unreadable
- Keep the vibe startup-y, creator-economy-coded, and a little chaotic in the best way
- No markdown, no extra text, no commentary outside the JSON

Idea: ${rawIdea}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const message =
      typeof errorPayload?.error?.message === 'string'
        ? errorPayload.error.message
        : 'Gemini request failed.';
    throw new Error(message);
  }

  const payload = await response.json();
  const text = payload?.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part?.text ?? '')
    .join('')
    .trim();

  return parseGeminiText(text ?? '');
}
