import { useState } from 'react';
import { Icons } from './Icons.jsx';
import { storageAvailable } from '../storage/localStorage.js';
import './ListScreens.css';
import './Privacy.css';

export default function Privacy({ onBack, onClearData }) {
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleClear = () => {
    onClearData();
    setConfirming(false);
    setCleared(true);
    setTimeout(() => setCleared(false), 2500);
  };

  return (
    <div className="dw-list-screen">
      <button className="dw-back-btn" onClick={onBack}>
        {Icons.arrowLeft({ size: 18 })} Back
      </button>
      <h2 className="dw-list-title">Privacy &amp; Data</h2>

      <div className="dw-privacy-block">
        <p className="dw-privacy-lead">
          DEWESIA's offline version processes your creations on this device. Your content is not sent to an AI service or DEWESIA server.
        </p>

        <ul className="dw-privacy-list">
          <li>No account or login is required.</li>
          <li>{'No AI API is used \u2014 DEWESIA runs a local, rule-based engine.'}</li>
          <li>No analytics, tracking, or advertising.</li>
          <li>Recent Creations are stored only in this browser's local storage.</li>
          <li>Nothing you type is transmitted over the network.</li>
        </ul>

        <p className="dw-privacy-note">
          Storage status: {storageAvailable ? 'Local storage is available on this device.' : 'Local storage is unavailable \u2014 Recent Creations won\u2019t be saved this session.'}
        </p>
      </div>

      <div className="dw-privacy-block">
        <h3 className="dw-privacy-subhead">Clear Local Data</h3>
        <p className="dw-list-subtitle">
          Deletes Recent Creations, drafts, and saved preferences from this device. This cannot be undone.
        </p>

        {!confirming ? (
          <button className="dw-secondary-btn dw-danger-btn" onClick={() => setConfirming(true)}>
            {Icons.trash({ size: 16 })} Clear Local Data
          </button>
        ) : (
          <div className="dw-confirm-row">
            <button className="dw-secondary-btn dw-danger-btn" onClick={handleClear}>
              {Icons.check({ size: 16 })} Confirm Clear
            </button>
            <button className="dw-secondary-btn" onClick={() => setConfirming(false)}>Cancel</button>
          </div>
        )}
        {cleared && <p className="dw-cleared-note">Local data cleared.</p>}
      </div>
    </div>
  );
}
