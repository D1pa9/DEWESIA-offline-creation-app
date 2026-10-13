// All persistence is local-only (browser localStorage). Nothing here ever
// makes a network request or sends data anywhere.

const KEYS = {
  creations: 'dewesia.recentCreations',
  prefs: 'dewesia.preferences',
};

const MAX_CREATIONS = 20;

function safeParse(raw, fallback) {
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function isStorageAvailable() {
  try {
    const testKey = '__dewesia_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export const storageAvailable = isStorageAvailable();

export function getRecentCreations() {
  if (!storageAvailable) return [];
  const raw = window.localStorage.getItem(KEYS.creations);
  return safeParse(raw, []);
}

export function saveCreation(creation) {
  if (!storageAvailable) return [];
  const existing = getRecentCreations();
  const withId = {
    id: creation.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: creation.createdAt || Date.now(),
    ...creation,
  };
  const updated = [withId, ...existing.filter((c) => c.id !== withId.id)].slice(0, MAX_CREATIONS);
  window.localStorage.setItem(KEYS.creations, JSON.stringify(updated));
  return updated;
}

export function deleteCreation(id) {
  if (!storageAvailable) return [];
  const existing = getRecentCreations();
  const updated = existing.filter((c) => c.id !== id);
  window.localStorage.setItem(KEYS.creations, JSON.stringify(updated));
  return updated;
}

export function clearAllLocalData() {
  if (!storageAvailable) return;
  window.localStorage.removeItem(KEYS.creations);
  window.localStorage.removeItem(KEYS.prefs);
}

export function getPreferences() {
  if (!storageAvailable) return {};
  return safeParse(window.localStorage.getItem(KEYS.prefs), {});
}

export function savePreferences(prefs) {
  if (!storageAvailable) return;
  const current = getPreferences();
  window.localStorage.setItem(KEYS.prefs, JSON.stringify({ ...current, ...prefs }));
}
