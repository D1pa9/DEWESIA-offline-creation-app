# DEWESIA — Offline Thinking & Creation App

**Think it. Develop it. Create it.**

DEWESIA is a privacy-first, offline-capable web application that transforms user ideas into structured creative outputs through a seven-stage thinking framework.

Users can create poetry, speeches, essays, stories, math answers, presentation outlines, vocabulary explanations, and reading responses — all directly in their browser.

> **Privacy first:** DEWESIA uses a deterministic, rule-based JavaScript engine. It does not use AI APIs, require API keys, or depend on a backend service.

##  Features

- **8 creation modes:** Poetry, Speech, Essay, Story, Math, Presentation, Vocabulary, and Reading.
- **Seven-stage thinking framework:** DEFINE, EXPLAIN, WHY, EXAMPLE, SAY IT AGAIN, INSIGHT, and ACTION.
- **Offline functionality:** Core application features work without an internet connection after the app loads.
- **Privacy-focused storage:** Recent creations are stored locally in the browser.
- **Safe math parser:** Evaluates supported mathematical expressions without using JavaScript `eval()`.
- **Edit and regenerate:** Modify, regenerate, or copy generated results.
- **Stage breakdown:** Explore how the framework processes an idea.
- **Responsive interface:** Mobile-first design with accessibility considerations.
- **Local data controls:** Delete individual creations or clear stored data.

## Tech Stack

- React
- JavaScript (ES6+)
- Vite
- HTML5 and CSS3
- Browser Local Storage

##  Getting Started

### Prerequisites

- Node.js
- npm

### Production Build

```bash
npm run build
npm run preview
```

## The DEWESIA Framework

Every idea passes through seven stages:

1. **DEFINE** — Identify the central idea.
2. **EXPLAIN** — Develop its meaning.
3. **WHY** — Explore its significance.
4. **EXAMPLE** — Provide relevant illustrations.
5. **SAY IT AGAIN** — Restate the core idea.
6. **INSIGHT** — Highlight a useful takeaway.
7. **ACTION** — Suggest a practical next step.

## Privacy & Offline Support

- No AI or external inference APIs.
- No user accounts or backend.
- No API keys required.
- Recent creations remain in browser `localStorage`.
- Core functionality is designed to work offline after the application loads.

**Note:** Local data is stored per browser and device. Clearing browser storage can remove saved creations.

##  Limitations

- Output is generated using deterministic rules and templates, not a large language model.
- The built-in vocabulary dictionary covers a limited set of words.
- Output quality and variety depend on the input and implemented rules.
- Android and iOS packages are not included; the current project is a web application.

##  Future Improvements

- Expand vocabulary coverage.
- Api ,Backend
- Improve rule-based text analysis.
- Add automated tests for all creation modes.
- Package the web application for Android using Capacitor.

