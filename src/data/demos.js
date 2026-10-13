// Built-in demonstration examples. Each demo runs through the exact same
// offline DEWESIA engine as a normal creation — nothing here is precomputed
// or faked, and nothing requires a network connection.

export const DEMOS = [
  {
    id: 'demo-poetry',
    mode: 'poetry',
    displayTitle: 'I Will Just Do It!',
    sampleInput:
      "I want to stop putting things off. I love reading, and I received a 1,375-page book for my birthday. At first I thought it would take years to finish, but I decided to read three pages every day. Small progress every day adds up to a big goal.",
  },
  {
    id: 'demo-speech',
    mode: 'speech',
    displayTitle: 'Here in America',
    sampleInput:
      "I want to give a speech about opportunity here in America. It matters because so many people have built a better life for their families by working hard and never giving up. For example, my own family started with very little and built something lasting over one generation. That reminds me that opportunity is real when people are given a fair chance. Next, I want to encourage everyone listening to keep building, one honest day of work at a time.",
  },
];

export function getDemo(id) {
  return DEMOS.find((d) => d.id === id);
}
