import { useEffect, useState } from 'react';
import './Processing.css';

const MESSAGES = ['Understanding your idea', 'Developing your thoughts', 'Shaping your creation'];

export default function Processing({ modeName, onDone, minDuration = 900 }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const totalDelay = prefersReduced ? 150 : minDuration;
    const rotate = prefersReduced ? null : setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, Math.max(400, totalDelay / MESSAGES.length));
    const finish = setTimeout(onDone, totalDelay);
    return () => {
      if (rotate) clearInterval(rotate);
      clearTimeout(finish);
    };
  }, [onDone, minDuration]);

  return (
    <div className="dw-processing" role="status" aria-live="polite">
      <div className="dw-processing-ring" aria-hidden="true">
        <span />
      </div>
      <p className="dw-processing-title">{`Creating your ${modeName.toLowerCase()}\u2026`}</p>
      <p className="dw-processing-message">{MESSAGES[messageIndex]}</p>
    </div>
  );
}
