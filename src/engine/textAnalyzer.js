// Deterministic, rule-based text analysis.
// This is NOT machine learning and NOT AI. Every function here is a plain
// JavaScript heuristic operating on the text the user typed.

export const STOP_WORDS = new Set([
  'the','a','an','and','or','but','is','are','was','were','to','of','in','on',
  'for','with','i','you','it','this','that','as','at','be','have','has','do',
  'does','my','your','our','their','he','she','they','we','them','his','her',
  'its','be','been','being','am','if','then','than','so','not','no','yes',
  'from','by','about','into','over','after','before','up','down','out','off',
  'again','further','once','here','there','when','where','why','how','all',
  'any','both','each','few','more','most','other','some','such','only','own',
  'same','too','very','can','will','just','should','now','did','doing','also',
]);

const FIRST_PERSON = /\b(i|i'm|i've|i'll|i'd|my|me|mine)\b/i;
const QUESTION_WORDS = /\b(what|why|how|when|where|who|which)\b/i;

export function splitSentences(text) {
  if (!text) return [];
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  // Split on sentence-ending punctuation while keeping it, then trim.
  const raw = clean.match(/[^.!?]+[.!?]*/g) || [clean];
  return raw
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function splitParagraphs(text) {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function tokenize(text) {
  if (!text) return [];
  const matches = text.toLowerCase().match(/[a-z0-9']+/g);
  return matches || [];
}

export function isStopWord(word) {
  return STOP_WORDS.has(word.toLowerCase());
}

export function extractNumbers(text) {
  if (!text) return [];
  const matches = text.match(/\b\d[\d,]*(\.\d+)?%?\b/g) || [];
  return matches.map((m) => m.trim());
}

export function extractDates(text) {
  if (!text) return [];
  const monthNames = '(january|february|march|april|may|june|july|august|september|october|november|december)';
  const patterns = [
    new RegExp(`\\b${monthNames}\\s+\\d{1,2}(st|nd|rd|th)?(,?\\s*\\d{4})?\\b`, 'gi'),
    /\b(yesterday|today|tomorrow|last year|last week|last month|this year|this week|next year|next week)\b/gi,
    /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g,
    /\b\d{4}\b/g,
  ];
  const found = new Set();
  patterns.forEach((re) => {
    const matches = text.match(re) || [];
    matches.forEach((m) => found.add(m.trim()));
  });
  return Array.from(found);
}

export function extractNamedLooking(text) {
  // Capitalized multi-word or standalone phrases that aren't sentence-starts,
  // used as a lightweight proxy for names/places/entities.
  if (!text) return [];
  const words = text.split(/\s+/);
  const found = new Set();
  for (let i = 0; i < words.length; i++) {
    const w = words[i].replace(/[^A-Za-z']/g, '');
    if (!w) continue;
    const isCapitalized = /^[A-Z][a-z']+$/.test(w);
    const atSentenceStart = i === 0 || /[.!?]$/.test(words[i - 1] || '');
    if (isCapitalized && !atSentenceStart && !STOP_WORDS.has(w.toLowerCase())) {
      found.add(w);
    }
  }
  return Array.from(found);
}

export function isFirstPerson(sentence) {
  return FIRST_PERSON.test(sentence);
}

export function isQuestion(sentence) {
  return /\?\s*$/.test(sentence.trim()) || QUESTION_WORDS.test(sentence.split(' ').slice(0, 2).join(' '));
}

const POSITIVE_WORDS = new Set([
  'love','enjoy','like','happy','great','good','excited','glad','wonderful',
  'amazing','helpful','hope','proud','grateful','joy','fun','excellent',
  'best','beautiful','peace','calm','strong','better','improve','win',
]);

const NEGATIVE_WORDS = new Set([
  'hate','sad','bad','angry','worried','fear','afraid','difficult','hard',
  'problem','struggle','tired','stress','stressed','worse','lost','lonely',
  'upset','frustrated','anxious','pain','hurt','fail','failure',
]);

export function detectTone(text) {
  const tokens = tokenize(text);
  let pos = 0;
  let neg = 0;
  tokens.forEach((t) => {
    if (POSITIVE_WORDS.has(t)) pos += 1;
    if (NEGATIVE_WORDS.has(t)) neg += 1;
  });
  if (pos === 0 && neg === 0) return 'neutral';
  if (pos > neg) return 'positive';
  if (neg > pos) return 'reflective';
  return 'mixed';
}

const ACTION_VERBS = new Set([
  'will','plan','want','need','should','start','begin','try','practice',
  'read','write','build','make','create','learn','finish','continue','share',
  'ask','tell','go','do','decide','choose','commit',
]);

export function detectActionVerbs(text) {
  const tokens = tokenize(text);
  return tokens.filter((t) => ACTION_VERBS.has(t));
}

export function wordCount(text) {
  return tokenize(text).length;
}

export function sentenceLengthProfile(sentences) {
  if (!sentences.length) return 'short';
  const avg = sentences.reduce((sum, s) => sum + tokenize(s).length, 0) / sentences.length;
  if (avg < 8) return 'short';
  if (avg < 18) return 'medium';
  return 'long';
}
