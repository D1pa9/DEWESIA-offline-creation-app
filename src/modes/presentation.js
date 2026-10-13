import { cap, trimEnd, fallbackTopic } from './_shared.js';

export function generatePresentation(thought, variant = 0) {
  const topic = fallbackTopic(thought);
  const title = cap(topic);

  const slides = [
    { heading: 'Slide 1 \u2014 Title', text: cap(topic) },
    { heading: 'Slide 2 \u2014 Introduction', text: trimEnd(cap(thought.define)) + '.' },
    { heading: 'Slide 3 \u2014 Main Point 1', text: trimEnd(cap(thought.explain)) + '.' },
    { heading: 'Slide 4 \u2014 Main Point 2', text: trimEnd(cap(thought.why)) + '.' },
    { heading: 'Slide 5 \u2014 Example', text: trimEnd(cap(thought.example)) + '.' },
    { heading: 'Slide 6 \u2014 Key Insight', text: trimEnd(cap(thought.insight)) + '.' },
    { heading: 'Slide 7 \u2014 Conclusion / Action', text: trimEnd(cap(thought.action)) + '.' },
  ];

  const copyText = slides.map((s) => `${s.heading}\n${s.text}`).join('\n\n');

  return { title, sections: slides, copyText };
}
