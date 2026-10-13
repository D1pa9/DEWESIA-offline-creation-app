// The seven permanent DEWESIA stages.
// These questions and names are fixed and must not be altered.

export const STAGES = [
  {
    id: 'define',
    name: 'DEFINE',
    question: 'What am I talking about?',
    purpose: 'Identify the main topic, subject, experience, idea, issue, person, place, or question.',
  },
  {
    id: 'explain',
    name: 'EXPLAIN',
    question: 'What does it mean?',
    purpose: 'Meaning, description, understanding.',
  },
  {
    id: 'why',
    name: 'WHY',
    question: 'Why does it matter?',
    purpose: 'The reason, purpose, importance, or benefit.',
  },
  {
    id: 'example',
    name: 'EXAMPLE',
    question: 'What can show my point?',
    purpose: 'Concrete details: numbers, dates, places, people, events, actions.',
  },
  {
    id: 'sayItAgain',
    name: 'SAY IT AGAIN',
    question: 'How can I say this again?',
    purpose: 'A simpler, clearer restatement of the central idea.',
  },
  {
    id: 'insight',
    name: 'INSIGHT',
    question: 'What did I learn or realize?',
    purpose: 'Learning, realization, discovery.',
  },
  {
    id: 'action',
    name: 'ACTION',
    question: 'What now?',
    purpose: 'Action, audience, remember — a next step.',
  },
];

export const STAGE_ORDER = STAGES.map((s) => s.id);
