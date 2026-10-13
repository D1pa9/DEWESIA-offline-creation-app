import { useEffect } from 'react';
import './Splash.css';

export default function Splash({ onDone }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = prefersReduced ? 200 : 1300;
    const t = setTimeout(onDone, delay);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="dw-splash" role="status" aria-label="Loading DEWESIA">
      <div className="dw-splash-mark">
        <span className="dw-splash-thread" aria-hidden="true" />
        <h1 className="dw-splash-title">DEWESIA</h1>
        <p className="dw-splash-tagline">Think it. Develop it. Create it.</p>
      </div>
    </div>
  );
}
