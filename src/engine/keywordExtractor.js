import { tokenize, isStopWord, splitSentences } from './textAnalyzer.js';

// Generic verbs that often outrank the actual subject matter purely on
// frequency (e.g. "received", "decided", "thought"). They are not stop
// words -- they carry some meaning -- but they should rarely win over a
// concrete noun the user actually named.
const WEAK_VERBS = new Set([
  'received', 'decided', 'thought', 'would', 'could', 'should', 'believe',
  'believed', 'seemed', 'seems', 'wanted', 'thinking', 'think', 'said',
  'told', 'felt', 'feel', 'getting', 'got', 'going', 'went', 'take', 'took',
]);

// Prioritizes repeated meaningful words, longer meaningful words, and words
// that appear across multiple sentences. Purely frequency/heuristic based.
export function extractKeywords(text, limit = 10) {
  if (!text) return [];
  const sentences = splitSentences(text);
  const freq = new Map();
  const sentenceSpread = new Map();

  sentences.forEach((sentence, idx) => {
    const seenInSentence = new Set();
    tokenize(sentence).forEach((word) => {
      if (isStopWord(word) || word.length < 3) return;
      freq.set(word, (freq.get(word) || 0) + 1);
      if (!seenInSentence.has(word)) {
        sentenceSpread.set(word, (sentenceSpread.get(word) || 0) + 1);
        seenInSentence.add(word);
      }
    });
  });

  const scored = Array.from(freq.entries()).map(([word, count]) => {
    const spread = sentenceSpread.get(word) || 1;
    const lengthBonus = Math.min(word.length / 12, 1);
    const weakPenalty = WEAK_VERBS.has(word) ? 0.5 : 1;
    const score = (count * 2 + spread * 1.5 + lengthBonus) * weakPenalty;
    return { word, count, spread, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.word);
}

// Finds short, meaningful phrases (2-4 words) built around keywords, useful
// for surfacing something closer to what the user actually said.
export function extractKeyPhrases(text, keywords, limit = 5) {
  if (!text || !keywords.length) return [];
  const sentences = splitSentences(text);
  const keywordSet = new Set(keywords);
  const phrases = [];

  sentences.forEach((sentence) => {
    const words = sentence.replace(/[.,!?;:]/g, '').split(/\s+/);
    words.forEach((w, i) => {
      if (keywordSet.has(w.toLowerCase()) && phrases.length < limit * 3) {
        const start = Math.max(0, i - 1);
        const end = Math.min(words.length, i + 2);
        const phrase = words.slice(start, end).join(' ').trim();
        if (phrase.split(' ').length >= 2) phrases.push(phrase);
      }
    });
  });

  return Array.from(new Set(phrases)).slice(0, limit);
}
