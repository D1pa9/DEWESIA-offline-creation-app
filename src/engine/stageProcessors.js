import {
  splitSentences, extractNumbers, extractDates, extractNamedLooking,
  isFirstPerson, detectTone,
} from './textAnalyzer.js';
import { extractKeywords, extractKeyPhrases } from './keywordExtractor.js';
import { classifySentences } from './sentenceClassifier.js';

function pickTopic(keywords, namedEntities) {
  if (namedEntities.length) return namedEntities[0];
  if (keywords.length) return keywords[0];
  return null;
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// DEFINE — "What am I talking about?"
function buildDefine({ sentences, keywords, namedEntities, buckets, topic }) {
  if (buckets.define.length) {
    return buckets.define[0];
  }
  if (topic) {
    return `This is about ${topic}${keywords[1] ? ` and ${keywords[1]}` : ''}.`;
  }
  if (sentences.length) return sentences[0];
  return 'No clear topic was given yet.';
}

// EXPLAIN — "What does it mean?"
function buildExplain({ sentences, topic, keywords }) {
  // Prefer any sentence that isn't already used as the topic sentence.
  const descriptive = sentences.find((s) => keywords.some((k) => s.toLowerCase().includes(k)));
  if (descriptive) return descriptive;
  if (topic) return `${capitalize(topic)} is the idea being developed here.`;
  return 'The meaning will grow clearer as more is shared.';
}

// WHY — "Why does it matter?"
function buildWhy({ buckets, topic }) {
  if (buckets.why.length) return buckets.why[0];
  if (topic) return `This seems to matter because it connects to ${topic}, something worth thinking through.`;
  return 'A clear reason was not stated, so this is a cautious guess based only on the idea given.';
}

// EXAMPLE — "What can show my point?"
function buildExample({ buckets, numbers, dates, namedEntities }) {
  const details = [];
  if (buckets.example.length) details.push(buckets.example[0]);
  if (numbers.length) details.push(`Specific numbers mentioned: ${numbers.slice(0, 4).join(', ')}.`);
  if (dates.length) details.push(`Time reference: ${dates.slice(0, 3).join(', ')}.`);
  if (namedEntities.length) details.push(`Named: ${namedEntities.slice(0, 3).join(', ')}.`);
  if (details.length) return details.join(' ');
  return 'No specific example provided.';
}

// SAY IT AGAIN — "How can I say this again?"
function buildSayItAgain({ topic, keywords, define }) {
  const rest = keywords.filter((k) => k !== topic).slice(0, 3);
  if (topic && rest.length) {
    return `In short: ${topic} is really about ${rest.join(', ')}.`;
  }
  if (topic) return `In short, this comes back to ${topic}.`;
  return define;
}

// INSIGHT — "What did I learn or realize?"
function buildInsight({ buckets, topic }) {
  if (buckets.insight.length) return buckets.insight[0];
  if (topic) return `This suggests that ${topic} is worth paying closer attention to.`;
  return 'One thing this shows is that the idea is still taking shape.';
}

// ACTION — "What now?"
function buildAction({ buckets, topic }) {
  if (buckets.action.length) return buckets.action[0];
  if (topic) return `A simple next step: spend a little more time exploring ${topic}.`;
  return 'A simple next step: write one more sentence about what matters most here.';
}

export function processStages(userInput) {
  const sentences = splitSentences(userInput);
  const keywords = extractKeywords(userInput, 12);
  const namedEntities = extractNamedLooking(userInput);
  const numbers = extractNumbers(userInput);
  const dates = extractDates(userInput);
  const buckets = classifySentences(sentences);
  const topic = pickTopic(keywords, namedEntities);
  const tone = detectTone(userInput);
  const firstPerson = sentences.some(isFirstPerson);
  const keyPhrases = extractKeyPhrases(userInput, keywords, 6);

  const ctx = { sentences, keywords, namedEntities, numbers, dates, buckets, topic };

  const define = buildDefine(ctx);
  const explain = buildExplain(ctx);
  const why = buildWhy(ctx);
  const example = buildExample(ctx);
  const sayItAgain = buildSayItAgain({ ...ctx, define });
  const insight = buildInsight(ctx);
  const action = buildAction(ctx);

  return {
    originalInput: userInput,
    topic: topic || (keywords[0] || ''),
    define,
    explain,
    why,
    example,
    sayItAgain,
    insight,
    action,
    keywords,
    entities: namedEntities,
    numbers,
    dates,
    sentences,
    keyPhrases,
    tone,
    firstPerson,
  };
}
