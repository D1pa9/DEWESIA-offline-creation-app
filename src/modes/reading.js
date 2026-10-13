import { cap, trimEnd } from './_shared.js';
import { splitSentences } from '../engine/textAnalyzer.js';

export function generateReading(thought) {
  const sentences = splitSentences(thought.originalInput);
  const keyPoints = sentences.slice(0, Math.min(3, sentences.length));

  const sections = [
    { heading: 'Main Idea', text: trimEnd(cap(thought.define)) + '.' },
    { heading: 'Key Points', text: keyPoints.map((s) => `\u2022 ${s.trim()}`).join('\n') || 'No distinct points were found in the passage.' },
    { heading: 'Important Details', text: [...thought.numbers, ...thought.dates, ...thought.entities].join(', ') || 'No specific numbers, dates, or names were found.' },
    { heading: 'Why It Matters', text: trimEnd(cap(thought.why)) + '.' },
    { heading: 'Evidence From the Text', text: trimEnd(cap(thought.example)) + '.' },
    { heading: 'Restatement', text: trimEnd(cap(thought.sayItAgain)) + '.' },
    { heading: 'Insight', text: trimEnd(cap(thought.insight)) + '.' },
    { heading: 'Questions to Think About', text: [
      `What is the author most trying to show about ${thought.topic || 'this topic'}?`,
      `What would happen next if this idea continued?`,
      `Do you agree with the point being made \u2014 why or why not?`,
    ].map((q) => `\u2022 ${q}`).join('\n') },
  ];

  return {
    title: 'Your Reading',
    sections,
    copyText: sections.map((s) => `${s.heading}\n${s.text}`).join('\n\n'),
  };
}
