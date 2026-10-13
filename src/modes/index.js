import { think } from '../engine/dewesiaEngine.js';
import { generatePoetry } from './poetry.js';
import { generateSpeech } from './speech.js';
import { generateEssay } from './essay.js';
import { generateStory } from './story.js';
import { generateMath } from './math.js';
import { generatePresentation } from './presentation.js';
import { generateVocabulary } from './vocabulary.js';
import { generateReading } from './reading.js';

// Runs the full DEWESIA pipeline for a given mode: userInput -> seven
// stages -> mode transformer -> final output. Math mode bypasses the
// seven-stage narrative engine since it needs a literal, deterministic
// calculation instead.
export function createOutput(modeId, userInput, variant = 0) {
  if (modeId === 'math') {
    const output = generateMath(userInput);
    return { thought: { empty: !userInput.trim(), originalInput: userInput }, output, usedStages: false };
  }

  const thought = think(userInput);
  if (thought.empty) {
    return { thought, output: null, usedStages: false };
  }

  let output;
  switch (modeId) {
    case 'poetry': output = generatePoetry(thought, variant); break;
    case 'speech': output = generateSpeech(thought, variant); break;
    case 'essay': output = generateEssay(thought, variant); break;
    case 'story': output = generateStory(thought, variant); break;
    case 'presentation': output = generatePresentation(thought, variant); break;
    case 'vocabulary': output = generateVocabulary(thought); break;
    case 'reading': output = generateReading(thought); break;
    default: output = generateEssay(thought, variant);
  }

  return { thought, output, usedStages: true };
}
