export const SESSION_KEY = 'almufradat_session';
export const THEME_KEY = 'almufradat_theme';
export const SETTINGS_KEY = 'almufradat_settings';
export const USER_PREFIX = 'almufradat_user_';

export const emptyProgress = () => ({
  mastered: {},
  srs: {},
  streak: 0,
  last: '',
  day: '',
  n: 0,
  best: 0,
  lastResult: null
});

export const safeParse = (raw, fallback) => {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const isBrowser = () => typeof window !== 'undefined';

export const userKey = (username) =>
  USER_PREFIX + encodeURIComponent(String(username).trim().toLowerCase());

export function readSession() {
  if (!isBrowser()) return null;
  const value = safeParse(localStorage.getItem(SESSION_KEY), null);
  return value && value.username ? value : null;
}

export function writeSession(session) {
  if (!isBrowser()) return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_KEY);
}

export function readProgress(username) {
  if (!isBrowser() || !username) return emptyProgress();
  const value = safeParse(localStorage.getItem(userKey(username)), null);
  return { ...emptyProgress(), ...(value || {}) };
}

export function writeProgress(username, progress) {
  if (!isBrowser() || !username) return;
  localStorage.setItem(userKey(username), JSON.stringify(progress));
}

export function clearProgress(username) {
  if (!isBrowser() || !username) return;
  localStorage.removeItem(userKey(username));
}

export const defaultSettings = {
  theme: 'light',
  diff: 'mudah',
  viewMode: 'grid',
  mosquePhoto: '',
  goal: 10
};

export function readSettings() {
  if (!isBrowser()) return defaultSettings;
  const stored = safeParse(localStorage.getItem(SETTINGS_KEY), {});
  const theme = localStorage.getItem(THEME_KEY) || stored.theme || 'light';
  return { ...defaultSettings, ...stored, theme };
}

export function writeSettings(settings) {
  if (!isBrowser()) return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  localStorage.setItem(THEME_KEY, settings.theme || 'light');
}
