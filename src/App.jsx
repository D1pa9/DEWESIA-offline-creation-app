import { useCallback, useState } from 'react';
import Splash from './components/Splash.jsx';
import Home from './components/Home.jsx';
import ModeInput from './components/ModeInput.jsx';
import Processing from './components/Processing.jsx';
import Result from './components/Result.jsx';
import RecentCreations from './components/RecentCreations.jsx';
import Examples from './components/Examples.jsx';
import Privacy from './components/Privacy.jsx';
import { getMode } from './config/modes.js';
import { createOutput } from './modes/index.js';
import {
  getRecentCreations, saveCreation, deleteCreation, clearAllLocalData,
} from './storage/localStorage.js';

const EMPTY_PROMPTS = {
  default: "Tell me a little about what you'd like to create.",
};

function buildPreview(modeId, output) {
  if (!output) return '';
  const raw = output.copyText || output.text || '';
  const oneLine = raw.replace(/\s+/g, ' ').trim();
  return oneLine.length > 70 ? oneLine.slice(0, 70) + '\u2026' : oneLine;
}

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [selectedModeId, setSelectedModeId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [creation, setCreation] = useState(null); // { modeId, input, thought, output, usedStages, variant, error }
  const [recent, setRecent] = useState(() => getRecentCreations());
  const [screenStack, setScreenStack] = useState([]);

  const goTo = useCallback((next) => {
    setScreenStack((stack) => [...stack, screen]);
    setScreen(next);
  }, [screen]);

  const goBackTo = useCallback((fallback) => {
    setScreenStack((stack) => {
      const copy = [...stack];
      const prev = copy.pop();
      setScreen(prev || fallback);
      return copy;
    });
  }, []);

  const handleSplashDone = () => setScreen('home');

  const handleSelectMode = (modeId) => {
    setSelectedModeId(modeId);
    setInputValue('');
    goTo('input');
  };

  const runCreation = (modeId, text, variant = 0) => {
    const trimmed = (text || '').trim();
    if (!trimmed) {
      setCreation({ modeId, input: text, error: EMPTY_PROMPTS.default });
      return;
    }
    const result = createOutput(modeId, trimmed, variant);
    if (!result.output) {
      setCreation({ modeId, input: text, error: EMPTY_PROMPTS.default });
      return;
    }
    setCreation({
      modeId,
      input: trimmed,
      thought: result.thought,
      output: result.output,
      usedStages: result.usedStages,
      variant,
    });
    const updated = saveCreation({
      modeId,
      input: trimmed,
      preview: buildPreview(modeId, result.output),
      output: result.output,
      variant,
    });
    setRecent(updated);
  };

  const handleCreate = (text) => {
    setInputValue(text);
    if (!text.trim()) {
      // Empty input: stay on input-adjacent flow but show friendly guidance
      // via the result screen's fallback state.
      runCreation(selectedModeId, text, 0);
      goTo('result');
      return;
    }
    goTo('processing');
    runCreation(selectedModeId, text, 0);
  };

  const handleProcessingDone = () => {
    setScreen('result');
  };

  const handleEdit = () => {
    setScreenStack((stack) => [...stack, screen]);
    setScreen('input');
  };

  const handleRegenerate = () => {
    if (!creation) return;
    const nextVariant = (creation.variant || 0) + 1;
    runCreation(creation.modeId, creation.input, nextVariant);
  };

  const handleStartAnother = () => {
    setCreation(null);
    setSelectedModeId(null);
    setInputValue('');
    setScreenStack([]);
    setScreen('home');
  };

  const handleOpenRecentItem = (item) => {
    setSelectedModeId(item.modeId);
    setInputValue(item.input);
    setCreation({
      modeId: item.modeId,
      input: item.input,
      thought: item.output && item.modeId !== 'math'
        ? createOutput(item.modeId, item.input, item.variant || 0).thought
        : { empty: false, originalInput: item.input },
      output: item.output,
      usedStages: item.modeId !== 'math',
      variant: item.variant || 0,
    });
    setScreenStack((stack) => [...stack, 'home']);
    setScreen('result');
  };

  const handleDeleteRecent = (id) => {
    setRecent(deleteCreation(id));
  };

  const handleOpenDemo = (demo) => {
    setSelectedModeId(demo.mode);
    setInputValue(demo.sampleInput);
    goTo('processing-demo');
    const result = createOutput(demo.mode, demo.sampleInput, 0);
    setCreation({
      modeId: demo.mode,
      input: demo.sampleInput,
      thought: result.thought,
      output: result.output,
      usedStages: result.usedStages,
      variant: 0,
      isDemo: true,
    });
  };

  const handleClearData = () => {
    clearAllLocalData();
    setRecent([]);
  };

  const currentMode = selectedModeId ? getMode(selectedModeId) : null;

  return (
    <div className="dw-app-root">
      {screen === 'splash' && <Splash onDone={handleSplashDone} />}

      {screen !== 'splash' && (
        <div className="dw-app-shell">
          {screen === 'home' && (
            <Home
              onSelectMode={handleSelectMode}
              onOpenExamples={() => goTo('examples')}
              onOpenRecent={() => goTo('recent')}
              onOpenPrivacy={() => goTo('privacy')}
              recentCount={recent.length}
            />
          )}

          {screen === 'input' && currentMode && (
            <ModeInput
              mode={currentMode}
              initialValue={inputValue}
              onBack={() => goBackTo('home')}
              onCreate={handleCreate}
            />
          )}

          {screen === 'processing' && currentMode && (
            <Processing modeName={currentMode.name} onDone={handleProcessingDone} />
          )}

          {screen === 'processing-demo' && currentMode && (
            <Processing modeName={currentMode.name} onDone={() => setScreen('result')} />
          )}

          {screen === 'result' && currentMode && creation && (
            creation.error ? (
              <ResultEmptyState
                message={creation.error}
                onBack={() => setScreen('input')}
              />
            ) : (
              <Result
                mode={currentMode}
                thought={creation.thought}
                output={creation.output}
                usedStages={creation.usedStages}
                onEdit={handleEdit}
                onRegenerate={handleRegenerate}
                onStartAnother={handleStartAnother}
              />
            )
          )}

          {screen === 'recent' && (
            <RecentCreations
              creations={recent}
              onOpen={handleOpenRecentItem}
              onDelete={handleDeleteRecent}
              onBack={() => goBackTo('home')}
            />
          )}

          {screen === 'examples' && (
            <Examples onOpenDemo={handleOpenDemo} onBack={() => goBackTo('home')} />
          )}

          {screen === 'privacy' && (
            <Privacy onBack={() => goBackTo('home')} onClearData={handleClearData} />
          )}
        </div>
      )}
    </div>
  );
}

function ResultEmptyState({ message, onBack }) {
  return (
    <div className="dw-empty-result">
      <p>{message}</p>
      <button className="dw-primary-btn" onClick={onBack}>Try Again</button>
    </div>
  );
}
