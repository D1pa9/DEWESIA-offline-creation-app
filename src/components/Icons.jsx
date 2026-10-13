const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Svg({ children, size = 22, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...rest} aria-hidden="true">
      {children}
    </svg>
  );
}

export const Icons = {
  feather: (p) => <Svg {...p}><path d="M20.24 3.76 8.5 15.5a5 5 0 0 0-1.34 2.44L6 22l4.06-1.16A5 5 0 0 0 12.5 19.5L20.24 3.76Z" /><path d="M14 10 8 16" /><path d="M10.5 6.5 4 13a5 5 0 0 0-1 5" /></Svg>,
  mic: (p) => <Svg {...p}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M12 19v3" /><path d="M8 22h8" /></Svg>,
  fileText: (p) => <Svg {...p}><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5" /><path d="M9 13h6" /><path d="M9 17h6" /></Svg>,
  bookOpen: (p) => <Svg {...p}><path d="M2 5c2-1.5 5-1.5 7 0v14c-2-1.5-5-1.5-7 0Z" /><path d="M22 5c-2-1.5-5-1.5-7 0v14c2-1.5 5-1.5 7 0Z" /></Svg>,
  calculator: (p) => <Svg {...p}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8" /><path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" strokeWidth="2.4" /></Svg>,
  presentation: (p) => <Svg {...p}><path d="M3 4h18" /><path d="M4 4v11h16V4" /><path d="M9 20l3-5 3 5" /></Svg>,
  book: (p) => <Svg {...p}><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5Z" /><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /></Svg>,
  glasses: (p) => <Svg {...p}><circle cx="6" cy="14" r="3.5" /><circle cx="18" cy="14" r="3.5" /><path d="M9.5 14h5" /><path d="M2 12l1-4c.3-1 1-2 3-2" /><path d="M22 12l-1-4c-.3-1-1-2-3-2" /></Svg>,
  arrowLeft: (p) => <Svg {...p}><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></Svg>,
  copy: (p) => <Svg {...p}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Svg>,
  refresh: (p) => <Svg {...p}><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" /><path d="M3 21v-5h5" /></Svg>,
  edit: (p) => <Svg {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></Svg>,
  sparkle: (p) => <Svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></Svg>,
  clock: (p) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>,
  trash: (p) => <Svg {...p}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></Svg>,
  shield: (p) => <Svg {...p}><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5Z" /></Svg>,
  layers: (p) => <Svg {...p}><path d="M12 2 2 8l10 6 10-6Z" /><path d="M2 14l10 6 10-6" /></Svg>,
  check: (p) => <Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>,
};
