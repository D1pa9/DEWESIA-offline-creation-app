export function pick(list, variant = 0) {
  if (!list.length) return '';
  return list[variant % list.length];
}

export function cap(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function trimEnd(s) {
  return (s || '').replace(/[.!?]+\s*$/, '');
}

export function topKeywords(thought, n = 4) {
  return (thought.keywords || []).slice(0, n);
}

export function joinList(list, conj = 'and') {
  const items = list.filter(Boolean);
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conj} ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, ${conj} ${items[items.length - 1]}`;
}

export function fallbackTopic(thought) {
  return thought.topic || topKeywords(thought, 1)[0] || 'this idea';
}
