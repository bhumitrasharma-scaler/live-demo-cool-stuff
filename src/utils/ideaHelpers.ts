export type IdeaAnalysis = {
  feedback: string;
  feasibility: number;
  interest: number;
  tone: string;
};

export function randomIdea<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function evaluateIdea(rawIdea: string): IdeaAnalysis {
  const cleaned = rawIdea.trim();

  if (!cleaned) {
    throw new Error('Idea cannot be empty.');
  }

  const keywords = [
    'ai',
    'community',
    'creator',
    'fitness',
    'coffee',
    'travel',
    'wellness',
    'saas',
    'social',
    'music',
    'crypto',
    'gaming',
    'meme',
    'startup',
    'creator economy',
  ];

  const lower = cleaned.toLowerCase();
  const matchCount = keywords.filter((keyword) => lower.includes(keyword)).length;
  const lengthScore = Math.min(100, Math.max(35, cleaned.length * 1.7));
  const feasibility = Math.min(95, Math.max(45, Math.round(lengthScore * 0.62 + matchCount * 11)));
  const interest = Math.min(96, Math.max(50, Math.round(lengthScore * 0.64 + matchCount * 10)));

  let tone = 'promising';
  if (feasibility < 60) tone = 'exploratory';
  if (interest > 80 && feasibility > 70) tone = 'promising';
  if (matchCount <= 1) tone = 'quirky';

  const feedback =
    feasibility >= 75
      ? 'This concept has a strong “launchable on a weekend” vibe and a clear user hook.'
      : feasibility >= 60
        ? 'The premise is interesting, but it needs a sharper differentiator or a clearer problem statement.'
        : 'The idea has personality, but it may need a tighter target audience and a simpler value prop.';

  return {
    feedback,
    feasibility,
    interest,
    tone,
  };
}
