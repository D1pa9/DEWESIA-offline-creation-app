import { MODES } from '../config/modes.js';
import { Icons } from './Icons.jsx';
import './Home.css';

export default function Home({ onSelectMode, onOpenExamples, onOpenRecent, onOpenPrivacy, recentCount }) {
  return (
    <div className="dw-home">
      <header className="dw-home-header">
        <h1 className="dw-home-title">DEWESIA</h1>
        <p className="dw-home-tagline">Think it. Develop it. Create it.</p>
      </header>

      <h2 className="dw-home-prompt">What would you like to create?</h2>

      <div className="dw-mode-grid">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            className="dw-mode-card"
            onClick={() => onSelectMode(mode.id)}
          >
            <span className="dw-mode-icon">{Icons[toIconKey(mode.icon)]?.({ size: 22 })}</span>
            <span className="dw-mode-name">{mode.name}</span>
            <span className="dw-mode-tagline">{mode.tagline}</span>
          </button>
        ))}
      </div>

      <div className="dw-home-footer">
        <button className="dw-link-btn" onClick={onOpenExamples}>
          {Icons.sparkle({ size: 16 })} Explore Examples
        </button>
        <button className="dw-link-btn" onClick={onOpenRecent}>
          {Icons.clock({ size: 16 })} Recent Creations{recentCount > 0 ? ` (${recentCount})` : ''}
        </button>
        <button className="dw-link-btn" onClick={onOpenPrivacy}>
          {Icons.shield({ size: 16 })} Privacy
        </button>
      </div>
    </div>
  );
}

function toIconKey(name) {
  const map = {
    feather: 'feather', mic: 'mic', 'file-text': 'fileText', 'book-open': 'bookOpen',
    calculator: 'calculator', presentation: 'presentation', book: 'book', glasses: 'glasses',
  };
  return map[name] || 'sparkle';
}
