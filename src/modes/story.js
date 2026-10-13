import { cap, trimEnd, fallbackTopic, pick } from './_shared.js';

// Story mode is the one place light creative connective tissue is allowed,
// since the user explicitly asked for creative writing. It still never
// states invented details as if they were real facts about the user.
export function generateStory(thought, variant = 0) {
  const topic = fallbackTopic(thought);
  const titles = [`The Day ${cap(topic)} Changed`, `A Story About ${cap(topic)}`, `What ${cap(topic)} Taught`];
  const title = pick(titles, variant);

  const sections = [
    { heading: 'Beginning', text: trimEnd(cap(thought.define)) + '. It started simply, the way most things do.' },
    { heading: 'Situation', text: trimEnd(cap(thought.explain)) + '.' },
    { heading: 'Development', text: trimEnd(cap(thought.why)) + ', and that made all the difference.' },
    { heading: 'Turning Point', text: thought.example !== 'No specific example provided.' ? trimEnd(cap(thought.example)) + '.' : `Then, one ordinary moment made ${topic} suddenly clear.` },
    { heading: 'Reflection', text: trimEnd(cap(thought.insight)) + '.' },
    { heading: 'Ending', text: trimEnd(cap(thought.action)) + '. And that was only the beginning.' },
  ];

  const copyText = `${title}\n\n` + sections.map((s) => s.text).join('\n\n');

  return { title, sections, copyText };
}
