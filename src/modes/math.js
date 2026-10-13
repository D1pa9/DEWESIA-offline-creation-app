import { solveMath } from '../engine/mathSolver.js';

export function generateMath(rawInput) {
  const result = solveMath(rawInput);

  if (!result.ok) {
    return {
      title: 'Your Answer',
      ok: false,
      sections: [
        { heading: 'Problem', text: result.problem },
        { heading: "Couldn't Solve This", text: `${result.error} Try rewriting it using only numbers and + \u2212 \u00d7 \u00f7 ^ ( ).` },
      ],
      copyText: `Problem: ${result.problem}\n${result.error}`,
    };
  }

  const sections = [
    { heading: 'Problem', text: result.problem },
    { heading: 'Steps', text: result.steps.join('\n') },
    { heading: 'Answer', text: String(result.answer) },
    { heading: 'Explanation', text: 'Multiplication and division happen before addition and subtraction, and parentheses are solved first \u2014 that order (order of operations) is what produced this answer.' },
  ];

  return {
    title: 'Your Answer',
    ok: true,
    answer: result.answer,
    sections,
    copyText: `${result.problem} = ${result.answer}\n\n` + result.steps.join('\n'),
  };
}
