// A small, safe recursive-descent parser/evaluator for arithmetic
// expressions. No eval(), no Function() — this only ever reads digits,
// parentheses, and + - * / ^ % operators.

function normalizeExpression(raw) {
  return raw
    .replace(/\u00d7/g, '*')
    .replace(/\u00f7/g, '/')
    .replace(/x/gi, (m, offset, str) => {
      // Only treat standalone 'x' surrounded by spaces/digits as multiply,
      // not letters inside words.
      const before = str[offset - 1];
      const after = str[offset + 1];
      const looksLikeMultiply = (!before || /[\d\s)]/.test(before)) && (!after || /[\d\s(.]/.test(after));
      return looksLikeMultiply ? '*' : m;
    })
    .replace(/,/g, '')
    .trim();
}

class Parser {
  constructor(expr) {
    this.tokens = this.tokenize(expr);
    this.pos = 0;
    this.steps = [];
  }

  tokenize(expr) {
    const re = /(\d+\.?\d*%?|\+|\-|\*|\/|\^|\(|\))/g;
    const tokens = expr.match(re);
    if (!tokens) throw new Error('No valid math expression found.');
    return tokens;
  }

  peek() { return this.tokens[this.pos]; }
  next() { return this.tokens[this.pos++]; }

  parseExpression() {
    let value = this.parseTerm();
    while (this.peek() === '+' || this.peek() === '-') {
      const op = this.next();
      const rhs = this.parseTerm();
      value = op === '+' ? value + rhs : value - rhs;
      this.steps.push(`${op === '+' ? 'Add' : 'Subtract'}: running total is ${round(value)}`);
    }
    return value;
  }

  parseTerm() {
    let value = this.parseFactor();
    while (this.peek() === '*' || this.peek() === '/') {
      const op = this.next();
      const rhs = this.parseFactor();
      if (op === '/') {
        if (rhs === 0) throw new Error('Cannot divide by zero.');
        value = value / rhs;
        this.steps.push(`Divide: running total is ${round(value)}`);
      } else {
        value = value * rhs;
        this.steps.push(`Multiply: running total is ${round(value)}`);
      }
    }
    return value;
  }

  parseFactor() {
    let value = this.parsePower();
    return value;
  }

  parsePower() {
    let base = this.parseUnary();
    if (this.peek() === '^') {
      this.next();
      const exp = this.parsePower();
      base = Math.pow(base, exp);
      this.steps.push(`Apply exponent: running total is ${round(base)}`);
    }
    return base;
  }

  parseUnary() {
    if (this.peek() === '-') {
      this.next();
      return -this.parseUnary();
    }
    if (this.peek() === '+') {
      this.next();
      return this.parseUnary();
    }
    return this.parsePrimary();
  }

  parsePrimary() {
    const token = this.next();
    if (token === undefined) throw new Error('Unexpected end of expression.');
    if (token === '(') {
      const value = this.parseExpression();
      if (this.peek() !== ')') throw new Error('Missing closing parenthesis.');
      this.next();
      return value;
    }
    if (token.endsWith('%')) {
      return parseFloat(token.slice(0, -1)) / 100;
    }
    const num = parseFloat(token);
    if (Number.isNaN(num)) throw new Error(`Unrecognized value: ${token}`);
    return num;
  }
}

function round(n) {
  return Math.round(n * 1e6) / 1e6;
}

export function looksLikeMathExpression(text) {
  if (!text) return false;
  const stripped = text.trim();
  // Must contain a digit and at least one operator, and be mostly
  // numbers/operators rather than prose.
  const hasDigit = /\d/.test(stripped);
  const hasOperator = /[+\-*/^%\u00d7\u00f7]/.test(stripped);
  const wordCount = (stripped.match(/[a-zA-Z]{2,}/g) || []).length;
  return hasDigit && hasOperator && wordCount <= 2;
}

export function solveMath(rawInput) {
  const normalized = normalizeExpression(rawInput);
  try {
    const parser = new Parser(normalized);
    const result = parser.parseExpression();
    if (parser.pos < parser.tokens.length) {
      throw new Error('Could not fully understand the expression.');
    }
    return {
      ok: true,
      problem: rawInput.trim(),
      normalized,
      answer: round(result),
      steps: parser.steps.length ? parser.steps : [`Result: ${round(result)}`],
    };
  } catch (err) {
    return {
      ok: false,
      problem: rawInput.trim(),
      error: err.message || 'This problem could not be safely understood.',
    };
  }
}
