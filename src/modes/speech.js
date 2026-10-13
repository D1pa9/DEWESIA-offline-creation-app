import { cap, trimEnd, fallbackTopic, pick } from './_shared.js';

export function generateSpeech(thought, variant = 0) {
  const topic = fallbackTopic(thought);
  const openers = [
    `I want to talk to you today about ${topic}.`,
    `Let's talk about something worth our time: ${topic}.`,
    `Today, I want to share a thought with you about ${topic}.`,
  ];

  const title = `On ${cap(topic)}`;

  const sections = [
    { heading: 'Opening', text: pick(openers, variant) },
    { heading: 'Main Idea', text: trimEnd(cap(thought.define)) + '.' },
    { heading: 'Explanation', text: trimEnd(cap(thought.explain)) + '.' },
    { heading: 'Why It Matters', text: trimEnd(cap(thought.why)) + '.' },
    { heading: 'Example', text: trimEnd(cap(thought.example)) + '.' },
    { heading: 'Reflection', text: trimEnd(cap(thought.insight)) + '.' },
    { heading: 'Call to Action', text: trimEnd(cap(thought.action)) + '.' },
    { heading: 'Closing', text: `That is why ${topic} matters \u2014 and why it's worth acting on, starting now. Thank you.` },
  ];

  const copyText = `${title}\n\n` + sections.map((s) => `${s.text}`).join('\n\n');

  return { title, sections, copyText };
}
