import { useState } from 'react';
import { Icons } from './Icons.jsx';
import './ModeInput.css';

export default function ModeInput({ mode, initialValue = '', onBack, onCreate }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(value);
  };

  return (
    <div className="dw-input-screen">
      <button className="dw-back-btn" onClick={onBack} aria-label="Back to home">
        {Icons.arrowLeft({ size: 18 })} Back
      </button>

      <h2 className="dw-input-mode-name">{mode.name}</h2>
      <p className="dw-input-prompt">{mode.inputPrompt}</p>

      <form onSubmit={handleSubmit} className="dw-input-form">
        <textarea
          className="dw-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={mode.placeholder}
          rows={7}
          maxLength={4000}
          autoFocus
          aria-label={mode.inputPrompt}
        />
        <div className="dw-input-footer">
          <span className="dw-char-count">{value.length}/4000</span>
          <button type="submit" className="dw-primary-btn">Create</button>
        </div>
      </form>
    </div>
  );
}
