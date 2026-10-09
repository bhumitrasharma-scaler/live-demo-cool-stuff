import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getIdea, healthCheck, postIdea } from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.static(publicDir));

  app.get('/api/health', healthCheck);
  app.get('/get', getIdea);
  app.post('/post', postIdea);

  app.get('/', (_req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });

  return app;
}
