// A small built-in dictionary for common words. This is NOT an authoritative
// dictionary — it exists so common words work well offline. For anything not
// listed, the vocabulary mode falls back to an honest, clearly-labeled
// context-based explanation instead of pretending to know a definition.

export const VOCABULARY = {
  resilient: {
    meaning: 'able to recover quickly from difficulty or setbacks.',
    example: 'She stayed resilient after losing the first round and came back to win the match.',
    related: ['resilience', 'tough', 'flexible', 'adaptable'],
  },
  ambitious: {
    meaning: 'having a strong desire to achieve something, often something difficult.',
    example: 'His ambitious goal was to finish the marathon in under four hours.',
    related: ['ambition', 'driven', 'determined', 'goal-oriented'],
  },
  gratitude: {
    meaning: 'the feeling of being thankful and appreciative.',
    example: 'She wrote in her journal every night to practice gratitude.',
    related: ['grateful', 'thankful', 'appreciation'],
  },
  perseverance: {
    meaning: 'continued effort to do or achieve something despite difficulty.',
    example: 'It took perseverance to read three pages every day until the book was finished.',
    related: ['persist', 'determination', 'endurance'],
  },
  curious: {
    meaning: 'eager to know or learn something.',
    example: 'The curious student asked question after question about the experiment.',
    related: ['curiosity', 'inquisitive', 'interested'],
  },
  authentic: {
    meaning: 'genuine, real, not a copy or imitation.',
    example: 'The chef used authentic recipes passed down from her grandmother.',
    related: ['genuine', 'real', 'sincere'],
  },
  concise: {
    meaning: 'giving information clearly, in few words.',
    example: 'The report was concise, covering the key points in one page.',
    related: ['brief', 'succinct', 'clear'],
  },
  empathy: {
    meaning: 'the ability to understand and share the feelings of another person.',
    example: 'Good listeners show empathy by trying to understand how someone else feels.',
    related: ['empathetic', 'compassion', 'understanding'],
  },
  diligent: {
    meaning: 'showing careful and steady effort.',
    example: 'She was diligent about reviewing her notes every evening.',
    related: ['hardworking', 'thorough', 'careful'],
  },
  optimistic: {
    meaning: 'hopeful and confident about the future.',
    example: 'Even after the setback, he stayed optimistic about finishing on time.',
    related: ['hopeful', 'positive', 'confident'],
  },
  procrastinate: {
    meaning: 'to delay or postpone doing something.',
    example: 'He tends to procrastinate on homework until the night before it is due.',
    related: ['delay', 'postpone', 'stall'],
  },
  meticulous: {
    meaning: 'showing great attention to detail; very careful and precise.',
    example: 'The editor was meticulous, checking every sentence twice.',
    related: ['precise', 'careful', 'thorough'],
  },
  candid: {
    meaning: 'honest and direct, without holding back.',
    example: 'Her candid feedback helped the team improve quickly.',
    related: ['honest', 'frank', 'direct'],
  },
  tenacious: {
    meaning: 'holding firmly to a course of action; persistent.',
    example: 'The tenacious researcher kept testing ideas until one finally worked.',
    related: ['persistent', 'determined', 'stubborn'],
  },
  humble: {
    meaning: 'not proud or arrogant; modest.',
    example: 'Despite winning the award, she stayed humble and thanked her team.',
    related: ['modest', 'unassuming', 'down-to-earth'],
  },
};

export function lookupWord(word) {
  const key = word.toLowerCase().trim();
  return VOCABULARY[key] || null;
}
