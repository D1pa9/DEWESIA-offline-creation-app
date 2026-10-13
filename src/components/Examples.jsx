import { Icons } from './Icons.jsx';
import { DEMOS } from '../data/demos.js';
import { getMode } from '../config/modes.js';
import './ListScreens.css';

export default function Examples({ onOpenDemo, onBack }) {
  return (
    <div className="dw-list-screen">
      <button className="dw-back-btn" onClick={onBack}>
        {Icons.arrowLeft({ size: 18 })} Back
      </button>
      <h2 className="dw-list-title">Explore Examples</h2>
      <p className="dw-list-subtitle">
        Two built-in demonstrations, created entirely offline by the DEWESIA engine.
      </p>

      <ul className="dw-demo-list">
        {DEMOS.map((demo) => {
          const mode = getMode(demo.mode);
          return (
            <li key={demo.id}>
              <button className="dw-demo-card" onClick={() => onOpenDemo(demo)}>
                <span className="dw-demo-mode">{mode?.name}</span>
                <span className="dw-demo-title">{demo.displayTitle}</span>
                {Icons.sparkle({ size: 16 })}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
