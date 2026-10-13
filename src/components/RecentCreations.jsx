import { Icons } from './Icons.jsx';
import { getMode } from '../config/modes.js';
import './ListScreens.css';

export default function RecentCreations({ creations, onOpen, onDelete, onBack }) {
  return (
    <div className="dw-list-screen">
      <button className="dw-back-btn" onClick={onBack}>
        {Icons.arrowLeft({ size: 18 })} Back
      </button>
      <h2 className="dw-list-title">Recent Creations</h2>
      <p className="dw-list-subtitle">
        Saved only on this device. Nothing here is sent anywhere.
      </p>

      {creations.length === 0 ? (
        <div className="dw-empty-state">
          <p>Nothing here yet. Creations you make will appear in this list, on this device only.</p>
        </div>
      ) : (
        <ul className="dw-creation-list">
          {creations.map((c) => {
            const mode = getMode(c.modeId);
            return (
              <li key={c.id} className="dw-creation-item">
                <button className="dw-creation-open" onClick={() => onOpen(c)}>
                  <span className="dw-creation-mode">{mode?.name || c.modeId}</span>
                  <span className="dw-creation-preview">{c.preview}</span>
                  <span className="dw-creation-date">{formatDate(c.createdAt)}</span>
                </button>
                <button
                  className="dw-icon-btn"
                  onClick={() => onDelete(c.id)}
                  aria-label={`Delete ${mode?.name || 'creation'}`}
                >
                  {Icons.trash({ size: 17 })}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function formatDate(ts) {
  try {
    return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}
