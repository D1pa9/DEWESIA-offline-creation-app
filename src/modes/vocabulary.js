import { lookupWord } from '../data/vocabulary.js';
import { cap } from './_shared.js';

function guessRelated(word) {
  const w = word.toLowerCase();
  const related = [];
  if (/e$/.test(w)) related.push(w.slice(0, -1) + 'ing');
  else related.push(w + 'ing');
  if (!/ed$/.test(w)) related.push(/e$/.test(w) ? w + 'd' : w + 'ed');
  if (!/s$/.test(w)) related.push(w + 's');
  return related.slice(0, 3);
}

export function generateVocabulary(thought) {
  const input = (thought.originalInput || '').trim();
  const word = input.split(/\s+/)[0].replace(/[^a-zA-Z'-]/g, '');
  const entry = lookupWord(word);

  if (entry) {
    const sections = [
      { heading: 'Word', text: cap(word) },
      { heading: 'Simple Meaning', text: cap(entry.meaning) },
      { heading: 'Example Sentence', text: entry.example },
      { heading: 'Related Words', text: entry.related.join(', ') },
      { heading: 'Remember It', text: `Try using "${word}" in a sentence about your own day \u2014 that's the fastest way to make it stick.` },
    ];
    return {
      title: cap(word),
      sections,
      copyText: sections.map((s) => `${s.heading}: ${s.text}`).join('\n'),
    };
  }

  // Honest fallback: no invented authoritative definition.
  const related = guessRelated(word);
  const sections = [
    { heading: 'Word', text: cap(word) },
    { heading: 'Simple Meaning', text: `"${word}" isn't in DEWESIA's small offline dictionary yet, so no authoritative definition is given here \u2014 check a dictionary app or site for a verified meaning.` },
    { heading: 'Context', text: `This explanation is context-based only, built from the word's shape, not a verified source.` },
    { heading: 'Related Words', text: related.join(', ') || 'None found.' },
    { heading: 'Remember It', text: `Look up "${word}" once, then write your own example sentence \u2014 that will help it stick better than any definition.` },
  ];
  return {
    title: cap(word),
    sections,
    copyText: sections.map((s) => `${s.heading}: ${s.text}`).join('\n'),
  };
}
