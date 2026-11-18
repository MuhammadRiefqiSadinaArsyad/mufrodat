'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SRS_INTERVALS } from '@/data/themes';
import { dateStr, todayStr, yesterdayStr } from '@/utils/date';
import {
  clearProgress,
  clearSession,
  defaultSettings,
  emptyProgress,
  readProgress,
  readSession,
  readSettings,
  writeProgress,
  writeSession,
  writeSettings
} from '@/utils/storage';

const AppContext = createContext(null);

const applyActivity = (progress, amount) => {
  const today = todayStr();
  const isToday = progress.last === today;
  return {
    ...progress,
    last: today,
    day: today,
    n: isToday ? (progress.n || 0) + amount : amount,
    streak: isToday
      ? progress.streak || 1
      : progress.last === yesterdayStr()
        ? (progress.streak || 0) + 1
        : 1
  };
};

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(null);
  const [progress, setProgress] = useState(emptyProgress);
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const active = readSession();
    setSession(active);
    setProgress(active ? readProgress(active.username) : emptyProgress());
    setSettings(readSettings());
    setReady(true);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  const persist = useCallback(
    (next) => {
      if (session?.username) writeProgress(session.username, next);
      return next;
    },
    [session]
  );

  const login = useCallback((username, password) => {
    const name = String(username || '').trim();
    if (!name) return { ok: false, error: 'Nama pengguna wajib diisi.' };
    if (!String(password || '').trim()) return { ok: false, error: 'Kata sandi wajib diisi.' };
    const next = { username: name, loginAt: Date.now() };
    writeSession(next);
    setSession(next);
    setProgress(readProgress(name));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
    setProgress(emptyProgress());
  }, []);

  const saveSettings = useCallback((patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      writeSettings(next);
      return next;
    });
  }, []);

  const setTheme = useCallback(
    (theme) => saveSettings({ theme }),
    [saveSettings]
  );

  const setDiff = useCallback(
    (diff) => saveSettings({ diff }),
    [saveSettings]
  );

  const setViewMode = useCallback(
    (viewMode) => saveSettings({ viewMode }),
    [saveSettings]
  );

  const grade = useCallback(
    (word, ok, soft = false) => {
      if (!word) return;
      setProgress((prev) => {
        const srs = { ...prev.srs };
        const mastered = { ...prev.mastered };
        if (soft) {
          if (!ok) srs[word.ar] = { b: 0, d: todayStr() };
        } else {
          const b = ok ? Math.min(4, (srs[word.ar]?.b || 0) + 1) : 0;
          if (ok) {
            srs[word.ar] = { b, d: dateStr(SRS_INTERVALS[b]) };
            if (b >= 4) mastered[word.ar] = true;
          } else {
            srs[word.ar] = { b: 0, d: todayStr() };
            delete mastered[word.ar];
          }
        }
        return persist({ ...applyActivity(prev, 1), srs, mastered });
      });
    },
    [persist]
  );

  const toggleMastered = useCallback(
    (word) => {
      if (!word) return;
      setProgress((prev) => {
        const mastered = { ...prev.mastered };
        const srs = { ...prev.srs };
        if (mastered[word.ar]) {
          delete mastered[word.ar];
          delete srs[word.ar];
        } else {
          mastered[word.ar] = true;
          srs[word.ar] = { b: 4, d: dateStr(SRS_INTERVALS[4]) };
        }
        return persist({ ...prev, mastered, srs });
      });
    },
    [persist]
  );

  const saveResult = useCallback(
    (result) => {
      setProgress((prev) =>
        persist({
          ...prev,
          best: Math.max(prev.best || 0, result.score || 0),
          lastResult: { ...result, at: Date.now() }
        })
      );
    },
    [persist]
  );

  const resetProgress = useCallback(() => {
    if (session?.username) clearProgress(session.username);
    setProgress(emptyProgress());
  }, [session]);

  const markActivity = useCallback(() => {
    setProgress((prev) => persist(applyActivity(prev, 1)));
  }, [persist]);

  const value = useMemo(
    () => ({
      ready,
      session,
      progress,
      settings,
      login,
      logout,
      grade,
      toggleMastered,
      saveResult,
      resetProgress,
      markActivity,
      setTheme,
      setDiff,
      setViewMode,
      saveSettings
    }),
    [
      ready,
      session,
      progress,
      settings,
      login,
      logout,
      grade,
      toggleMastered,
      saveResult,
      resetProgress,
      markActivity,
      setTheme,
      setDiff,
      setViewMode,
      saveSettings
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp harus dipakai di dalam AppProvider');
  return ctx;
};
