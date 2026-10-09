export type PresetIdea = {
  id: number;
  title: string;
  description: string;
  category: string;
  vibe: string;
  risk: 'low' | 'medium' | 'high';
};

export const presetIdeas: PresetIdea[] = [
  {
    id: 1,
    title: 'Glow-up for your old Wi‑Fi router',
    description: 'A collectible router upgrade service that gives forgotten home internet a designer aesthetic and personality profile.',
    category: 'SaaS',
    vibe: 'trendy',
    risk: 'medium',
  },
  {
    id: 2,
    title: 'Late-night ramen delivery for coding doomscrollers',
    description: 'A warm, low-key meal service optimized for developers burned out by deadlines and doomscrolling energy crashes.',
    category: 'Consumer',
    vibe: 'chaotic',
    risk: 'low',
  },
  {
    id: 3,
    title: 'AI tutor for gym bros who hate spreadsheets',
    description: 'A motivational fitness assistant that translates workout data into punchy coaching insights and progress streaks.',
    category: 'EdTech',
    vibe: 'funny',
    risk: 'medium',
  },
  {
    id: 4,
    title: 'Moodboard app for broke digital nomads',
    description: 'A travel-friendly inspiration board that helps users map budgets, aesthetic vibes, and destination plans in one flow.',
    category: 'Lifestyle',
    vibe: 'trendy',
    risk: 'medium',
  },
  {
    id: 5,
    title: 'Predictive playlist for crisis texting',
    description: 'A small emotional support tool that curates music based on vibes, texts, and chaotic life events.',
    category: 'Wellness',
    vibe: 'creative',
    risk: 'high',
  },
];
