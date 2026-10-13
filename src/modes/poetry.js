import { pick, cap, trimEnd, fallbackTopic } from './_shared.js';

// Builds a short free-verse poem grounded in the user's own words, numbers,
// and details. Rotates between a few structural patterns for regeneration.
export function generatePoetry(thought, variant = 0) {
  const topic = fallbackTopic(thought);
  const details = [...thought.numbers, ...thought.entities, ...thought.dates].slice(0, 3);
  const keywords = thought.keywords.slice(0, 6);
  const phrase = thought.keyPhrases[0];

  const titleOptions = [
    cap(topic),
    cap(topic) + (details[0] ? `, ${details[0]}` : ''),
    `On ${topic}`,
  ];

  const openingLines = [
    [trimEnd(cap(thought.define)) + '.', keywords[1] ? `${cap(keywords[1])}, still here.` : ''],
    [`I keep coming back to ${topic}.`, phrase ? cap(phrase) + '.' : ''],
    [cap(trimEnd(thought.sayItAgain)) + '.'],
  ];

  const detailLines = [];
  if (details.length) {
    detailLines.push(details.join(' \u2014 '));
  }
  if (thought.numbers.length) {
    detailLines.push(`${thought.numbers[0]}, a number that means something now.`);
  }
  if (!detailLines.length && phrase) {
    detailLines.push(cap(phrase));
  }

  const middleLines = [
    trimEnd(cap(thought.why)) + '.',
    trimEnd(cap(thought.example)) + '.',
  ].filter((l) => l && l !== '.');

  const reflectionLines = [
    trimEnd(cap(thought.insight)) + '.',
    keywords.length ? `${cap(keywords[0])}. ${keywords[1] ? cap(keywords[1]) + '.' : ''}`.trim() : '',
  ].filter(Boolean);

  const closingLines = [
    trimEnd(cap(thought.action)) + '.',
    `One step at a time \u2014 ${topic}.`,
    `So I begin.`,
  ];

  const stanzas = [
    openingLines[variant % openingLines.length].filter(Boolean),
    detailLines,
    middleLines,
    reflectionLines,
    [pick(closingLines, variant)],
  ].filter((s) => s.length > 0);

  const title = pick(titleOptions, variant);
  const lines = stanzas.map((s) => s.join('\n')).join('\n\n');

  return {
    title,
    text: lines,
    copyText: `${title}\n\n${lines}`,
  };
}
