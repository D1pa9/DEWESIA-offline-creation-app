import { cap, trimEnd, fallbackTopic } from './_shared.js';

export function generateEssay(thought, variant = 0) {
  const topic = fallbackTopic(thought);
  const title = variant % 2 === 0 ? `Thinking About ${cap(topic)}` : `On ${cap(topic)}`;

  const sections = [
    { heading: 'Introduction', text: trimEnd(cap(thought.define)) + `. This is worth examining closely.` },
    { heading: 'Main Idea', text: trimEnd(cap(thought.explain)) + '.' },
    { heading: 'Supporting Explanation', text: trimEnd(cap(thought.sayItAgain)) + '.' },
    { heading: 'Why It Matters', text: trimEnd(cap(thought.why)) + '.' },
    { heading: 'Example', text: trimEnd(cap(thought.example)) + '.' },
    { heading: 'Insight', text: trimEnd(cap(thought.insight)) + '.' },
    { heading: 'Conclusion', text: trimEnd(cap(thought.action)) + `. That is the heart of ${topic}.` },
  ];

  const copyText = `${title}\n\n` + sections.map((s) => `${s.heading}\n${s.text}`).join('\n\n');

  return { title, sections, copyText };
}
