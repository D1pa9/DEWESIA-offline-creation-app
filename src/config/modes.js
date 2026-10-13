// Central configuration for the eight creation modes.
// Do not scatter mode-specific copy elsewhere in the application.

export const MODES = [
  {
    id: 'poetry',
    name: 'Poetry',
    tagline: 'Turn a thought into a poem',
    icon: 'feather',
    inputPrompt: "What would you like your poem to be about?",
    outputTitle: 'Your Poem',
    placeholder: 'Tell DEWESIA what you\u2019re thinking about\u2026',
  },
  {
    id: 'speech',
    name: 'Speech',
    tagline: 'Shape an idea into a speech',
    icon: 'mic',
    inputPrompt: "What would you like your speech to be about?",
    outputTitle: 'Your Speech',
    placeholder: 'What do you want to say, and to whom?',
  },
  {
    id: 'essay',
    name: 'Essay',
    tagline: 'Develop an idea into an essay',
    icon: 'file-text',
    inputPrompt: "What would you like to write about?",
    outputTitle: 'Your Essay',
    placeholder: 'Share the idea you want to explore\u2026',
  },
  {
    id: 'story',
    name: 'Story',
    tagline: 'Grow a spark into a story',
    icon: 'book-open',
    inputPrompt: "What story would you like to create?",
    outputTitle: 'Your Story',
    placeholder: 'A character, a place, a moment \u2014 anything works\u2026',
  },
  {
    id: 'math',
    name: 'Math',
    tagline: 'Solve and understand a problem',
    icon: 'calculator',
    inputPrompt: 'Enter your math problem.',
    outputTitle: 'Your Answer',
    placeholder: 'e.g. 12 + 8 \u00d7 2',
  },
  {
    id: 'presentation',
    name: 'Presentation',
    tagline: 'Outline it into slides',
    icon: 'presentation',
    inputPrompt: "What would you like your presentation to be about?",
    outputTitle: 'Your Presentation',
    placeholder: 'What\u2019s the presentation about?',
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    tagline: 'Understand and use a word',
    icon: 'book',
    inputPrompt: "Enter a word you'd like to understand and use.",
    outputTitle: 'Your Word',
    placeholder: 'Type a single word\u2026',
  },
  {
    id: 'reading',
    name: 'Reading',
    tagline: 'Make sense of a passage',
    icon: 'glasses',
    inputPrompt: "Paste the text you'd like to understand and respond to.",
    outputTitle: 'Your Reading',
    placeholder: 'Paste a passage, article, or paragraph\u2026',
  },
];

export const getMode = (id) => MODES.find((m) => m.id === id);
