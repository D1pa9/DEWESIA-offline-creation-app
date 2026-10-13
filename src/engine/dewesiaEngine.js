import { processStages } from './stageProcessors.js';
import { wordCount, sentenceLengthProfile } from './textAnalyzer.js';

// Runs userInput through the seven DEWESIA stages and returns the internal
// DEWESIA Thought Model. This is the core engine shared by all eight modes.
// It is intentionally deterministic and rule-based — there is no AI/ML here.
export function think(userInput) {
  const input = (userInput || '').trim();

  if (!input) {
    return {
      empty: true,
      originalInput: '',
    };
  }

  const stages = processStages(input);

  return {
    empty: false,
    originalInput: input,
    topic: stages.topic,
    define: stages.define,
    explain: stages.explain,
    why: stages.why,
    example: stages.example,
    sayItAgain: stages.sayItAgain,
    insight: stages.insight,
    action: stages.action,
    keywords: stages.keywords,
    keyPhrases: stages.keyPhrases,
    entities: stages.entities,
    numbers: stages.numbers,
    dates: stages.dates,
    sentences: stages.sentences,
    tone: stages.tone,
    firstPerson: stages.firstPerson,
    meta: {
      words: wordCount(input),
      sentenceProfile: sentenceLengthProfile(stages.sentences),
    },
  };
}
