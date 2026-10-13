import { STAGES } from '../config/stages.js';
import { Icons } from './Icons.jsx';
import './StageBreakdown.css';

export default function StageBreakdown({ thought, onClose }) {
  return (
    <div className="dw-breakdown-overlay" role="dialog" aria-modal="true" aria-label="How DEWESIA developed this">
      <div className="dw-breakdown-panel">
        <div className="dw-breakdown-header">
          <h2>How DEWESIA developed this</h2>
          <button className="dw-icon-btn" onClick={onClose} aria-label="Close">
            {Icons.arrowLeft({ size: 18 })}
          </button>
        </div>
        <p className="dw-breakdown-intro">
          {'DEWESIA quietly works through seven stages before creating your result. This is for curiosity only \u2014 you never have to think about these steps yourself.'}
        </p>
        <ol className="dw-breakdown-list">
          {STAGES.map((stage) => (
            <li key={stage.id} className="dw-breakdown-item">
              <div className="dw-breakdown-thread" aria-hidden="true" />
              <div className="dw-breakdown-content">
                <div className="dw-breakdown-label">
                  <span className="dw-breakdown-stage-name">{stage.name}</span>
                  <span className="dw-breakdown-question">{stage.question}</span>
                </div>
                <p className="dw-breakdown-value">{thought[stage.id] || '\u2014'}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
