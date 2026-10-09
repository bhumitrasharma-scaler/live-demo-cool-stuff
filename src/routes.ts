import type { Request, Response } from 'express';
import { config } from './config.js';
import { presetIdeas } from './data/presetIdeas.js';
import { analyzeIdea } from './services/gemini.js';
import { randomIdea } from './utils/ideaHelpers.js';

export function healthCheck(_req: Request, res: Response): void {
  res.status(200).json({
    status: 'ok',
    services: {
      gemini: config.geminiApiKey ? 'online' : 'offline',
      app: 'online',
    },
  });
}

export function getIdea(_req: Request, res: Response): void {
  const idea = randomIdea(presetIdeas);
  res.status(200).json({
    id: idea.id,
    title: idea.title,
    description: idea.description,
  });
}

export async function postIdea(req: Request, res: Response): Promise<void> {
  const rawIdea = typeof req.body?.idea === 'string' ? req.body.idea : '';

  if (!rawIdea.trim()) {
    res.status(400).json({
      error: {
        code: 'INVALID_IDEA',
        message: 'Idea is required.',
      },
    });
    return;
  }

  try {
    const analysis = await analyzeIdea(rawIdea);
    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'IDEA_ANALYSIS_FAILED',
        message: error instanceof Error ? error.message : 'Failed to analyze idea.',
      },
    });
  }
}
