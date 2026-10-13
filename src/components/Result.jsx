import { useState } from 'react';
import { Icons } from './Icons.jsx';
import StageBreakdown from './StageBreakdown.jsx';
import './Result.css';

export default function Result({ mode, thought, output, onEdit, onRegenerate, onStartAnother, usedStages }) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output.copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const canRegenerate = mode.id !== 'math';

  return (
    <div className="dw-result-screen">
      <button className="dw-back-btn" onClick={onStartAnother} aria-label="Start another creation">
        {Icons.arrowLeft({ size: 18 })} Start Another
      </button>

      <h2 className="dw-result-title">{mode.outputTitle}</h2>

      <div className="dw-result-card">
        {output.title && mode.id !== 'math' && (
          <h3 className="dw-result-heading">{output.title}</h3>
        )}

        {output.text && (
          <pre className="dw-result-poem">{output.text}</pre>
        )}

        {output.sections && (
          <div className="dw-result-sections">
            {output.sections.map((s, i) => (
              <div className="dw-result-section" key={i}>
                {s.heading && <p className="dw-result-section-heading">{s.heading}</p>}
                <p className="dw-result-section-text">{s.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dw-result-actions">
        <button className="dw-secondary-btn" onClick={onEdit}>
          {Icons.edit({ size: 16 })} Edit
        </button>
        {canRegenerate && (
          <button className="dw-secondary-btn" onClick={onRegenerate}>
            {Icons.refresh({ size: 16 })} Regenerate
          </button>
        )}
        <button className="dw-secondary-btn" onClick={handleCopy}>
          {copied ? Icons.check({ size: 16 }) : Icons.copy({ size: 16 })} {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {usedStages && (
        <button className="dw-link-btn dw-breakdown-toggle" onClick={() => setShowBreakdown(true)}>
          {Icons.layers({ size: 16 })} How DEWESIA developed this
        </button>
      )}

      {showBreakdown && (
        <StageBreakdown thought={thought} onClose={() => setShowBreakdown(false)} />
      )}
    </div>
  );
}
