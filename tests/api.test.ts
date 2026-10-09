import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { analyzeIdea } from '../src/services/gemini.js';

const app = createApp();

describe('Idea Analyser API', () => {
  beforeEach(() => {
    process.env.GEMINI_API_KEY = 'test-key';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      feedback: 'This idea has a strong product angle.',
                      feasibility: 82,
                      interest: 88,
                      tone: 'promising',
                    }),
                  },
                ],
              },
            },
          ],
        }),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns health status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 'ok',
      services: {
        gemini: 'online',
      },
    });
  });

  it('returns a random preset idea', async () => {
    const response = await request(app).get('/get');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
  });

  it('calls Gemini API for idea analysis', async () => {
    const result = await analyzeIdea('AI tutor for gym bros who hate spreadsheets');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('models/gemini-2.5-flash-lite:generateContent'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    );

    expect(result).toMatchObject({
      feedback: 'This idea has a strong product angle.',
      feasibility: 82,
      interest: 88,
      tone: 'promising',
    });
  });

  it('accepts a raw idea and responds with analysis', async () => {
    const response = await request(app).post('/post').send({
      idea: 'AI tutor for gym bros who hate spreadsheets',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      feedback: expect.any(String),
      feasibility: expect.any(Number),
      interest: expect.any(Number),
      tone: expect.any(String),
    });
  });

  it('rejects empty ideas', async () => {
    const response = await request(app).post('/post').send({ idea: '' });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('INVALID_IDEA');
  });
});
