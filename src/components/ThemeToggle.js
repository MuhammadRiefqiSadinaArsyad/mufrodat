'use client';

import { useApp } from '@/context/AppProvider';
import Icon from './Icon';

export default function ThemeToggle({ compact = false }) {
  const { settings, setTheme } = useApp();
  const dark = settings.theme === 'dark';
  return (
    <button
      type="button"
      className={`theme-btn ${compact ? 'compact' : ''}`}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      title={dark ? 'Mode terang' : 'Mode gelap'}
    >
      <Icon name={dark ? 'sun' : 'moon'} className="ic-lg" />
    </button>
  );
}
