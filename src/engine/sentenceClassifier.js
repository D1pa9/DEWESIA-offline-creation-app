import { isFirstPerson } from './textAnalyzer.js';

// Flexible, reusable pattern -> stage mapping. Patterns are examples, not an
// exhaustive list; the classifier scores every sentence against every stage
// and a sentence can contribute to more than one stage.
const STAGE_PATTERNS = {
  define: [/\bi love\b/i, /\bi enjoy\b/i, /\bi like\b/i, /\bi want\b/i, /\babout\b/i, /\bis a\b/i, /\bis the\b/i],
  why: [/\bbecause\b/i, /\bsince\b/i, /\bso that\b/i, /\bimportant\b/i, /\bhelps?\b/i, /\bmatters?\b/i, /\breason\b/i, /\bbenefit\b/i, /\bgoal\b/i],
  example: [/\bfor example\b/i, /\bsuch as\b/i, /\bwhen\b/i, /\byesterday\b/i, /\blast year\b/i, /\ba time when\b/i, /\d/],
  insight: [/\bi learned\b/i, /\bi realized\b/i, /\bi discovered\b/i, /\bmade me understand\b/i, /\bshowed me\b/i],
  action: [/\bi will\b/i, /\bi plan to\b/i, /\bi want to\b/i, /\bnext\b/i, /\bshould\b/i, /\bneed to\b/i, /\bgoing to\b/i],
};

export function classifySentence(sentence) {
  const scores = {};
  Object.entries(STAGE_PATTERNS).forEach(([stage, patterns]) => {
    scores[stage] = patterns.reduce((count, re) => count + (re.test(sentence) ? 1 : 0), 0);
  });
  if (isFirstPerson(sentence)) {
    scores.define = (scores.define || 0) + 0.5;
  }
  return scores;
}

// Groups sentences by their strongest matching stage(s).
export function classifySentences(sentences) {
  const buckets = { define: [], why: [], example: [], insight: [], action: [] };
  sentences.forEach((sentence) => {
    const scores = classifySentence(sentence);
    const entries = Object.entries(scores).filter(([, v]) => v > 0);
    if (entries.length === 0) return;
    entries.sort((a, b) => b[1] - a[1]);
    const top = entries[0][0];
    buckets[top].push(sentence);
  });
  return buckets;
}
