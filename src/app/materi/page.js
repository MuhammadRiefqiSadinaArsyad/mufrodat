'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/context/AppProvider';
import { THEMES, THEME_DESCRIPTIONS } from '@/data/themes';
import { wordsByTheme } from '@/data/vocabulary';
import { stripHarakat } from '@/utils/date';
import Icon, { ThemeIcon } from '@/components/Icon';

const FILTERS = [
  { id: 'semua', label: 'Semua' },
  { id: 'baru', label: 'Belum dipelajari' },
  { id: 'dikuasai', label: 'Dikuasai' }
];

export default function MateriPage() {
  const { settings, progress, setViewMode, toggleMastered } = useApp();
  const [theme, setTheme] = useState('Keluarga');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('semua');
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('tema');
    if (THEMES.includes(param)) setTheme(param);
  }, []);

  const chooseTheme = (next) => {
    setTheme(next);
    setRevealed({});
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `/materi?tema=${encodeURIComponent(next)}`);
    }
  };

  const themeWords = useMemo(() => wordsByTheme(theme), [theme]);
  const filtered = useMemo(() => {
    const q = stripHarakat(query.trim().toLowerCase());
    return themeWords.filter((word) => {
      const matchesQuery =
        !q ||
        stripHarakat(word.ar).includes(q) ||
        word.tr.toLowerCase().includes(q) ||
        word.id.toLowerCase().includes(q);
      const isDone = Boolean(progress.mastered[word.ar]);
      const matchesFilter =
        filter === 'semua' || (filter === 'dikuasai' ? isDone : !isDone);
      return matchesQuery && matchesFilter;
    });
  }, [themeWords, query, filter, progress.mastered]);

  const masteredInTheme = themeWords.filter((w) => progress.mastered[w.ar]).length;
  const progressPct = themeWords.length
    ? Math.round((masteredInTheme / themeWords.length) * 100)
    : 0;
  const maskArabic = settings.diff === 'sulit';
  const hideTranslit = settings.diff !== 'mudah';

  const reveal = (ar) => setRevealed((prev) => ({ ...prev, [ar]: !prev[ar] }));

  return (
    <div className="page">
      <div className="page-head">
        <div className="subbar">
          <Link href="/" className="back-link"><Icon name="chevLeft" /> Beranda</Link>
          <span className="chip chip-soft"><Icon name="book" /> 10 tema</span>
        </div>
        <div className="page-title-row">
          <div>
            <span className="eyebrow">Perpustakaan kosakata</span>
            <h1>Mufradat</h1>
            <p>{THEME_DESCRIPTIONS[theme]}.</p>
          </div>
          <div className="title-badge">
            <strong>{themeWords.length}</strong>
            <small>kata</small>
          </div>
        </div>
      </div>

      <div className="theme-tabs" role="tablist" aria-label="Tema kosakata">
        {THEMES.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={theme === item}
            className={`theme-tab ${theme === item ? 'active' : ''}`}
            onClick={() => chooseTheme(item)}
          >
            <ThemeIcon theme={item} />
            {item}
          </button>
        ))}
      </div>

      <section className="materi-summary">
        <div className="ms-body">
          <span className="eyebrow">Progres tema</span>
          <h2>{theme}</h2>
          <p>{masteredInTheme} dari {themeWords.length} kata sudah ditandai dikuasai.</p>
          <div className="track"><span style={{ width: `${progressPct}%` }} /></div>
        </div>
        <span className="ms-ring">{progressPct}%</span>
      </section>

      <div className="materi-tools">
        <div className="search-box">
          <Icon name="search" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kata Arab, Latin, atau arti…"
            aria-label="Cari mufradat"
          />
          {query ? (
            <button type="button" className="clear-btn" onClick={() => setQuery('')} aria-label="Hapus pencarian">
              <Icon name="close" />
            </button>
          ) : null}
        </div>
        <div className="view-toggle" role="group" aria-label="Tampilan">
          <button
            type="button"
            className={settings.viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
            aria-label="Tampilan grid"
          >
            <Icon name="grid" />
          </button>
          <button
            type="button"
            className={settings.viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
            aria-label="Tampilan daftar"
          >
            <Icon name="list" />
          </button>
        </div>
      </div>

      <div className="filter-row">
        <div className="seg">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={filter === item.id ? 'active' : ''}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="muted small">{filtered.length} kata ditampilkan</span>
      </div>

      {filtered.length ? (
        <div className={`mufradat-grid ${settings.viewMode === 'list' ? 'list' : ''}`}>
          {filtered.map((word) => {
            const isDone = Boolean(progress.mastered[word.ar]);
            const isNew = !progress.srs[word.ar] && !isDone;
            const showArabic = !maskArabic || revealed[word.ar];
            const showTr = !hideTranslit || revealed[word.ar];
            return (
              <article key={word.ar} className={`mufradat-card ${isDone ? 'mastered' : ''}`}>
                <div className="mc-top">
                  <span className="chip chip-soft">{word.t}</span>
                  <div className="mc-tools">
                    <button
                      type="button"
                      className={`icon-btn master-btn ${isDone ? 'on' : ''}`}
                      onClick={() => toggleMastered(word)}
                      aria-label={isDone ? 'Batalkan dikuasai' : 'Tandai dikuasai'}
                      title={isDone ? 'Batalkan dikuasai' : 'Tandai dikuasai'}
                    >
                      <Icon name={isDone ? 'check' : 'award'} />
                    </button>
                  </div>
                </div>

                <div className="mc-arabic">
                  {showArabic ? word.ar : stripHarakat(word.ar)}
                </div>

                <div className="mc-latin">
                  {showTr ? <span>{word.tr}</span> : <button type="button" className="reveal-btn" onClick={() => reveal(word.ar)}>Intip cara baca</button>}
                </div>
                <p className="mc-meaning">{word.id}</p>

                <div className="mc-bottom">
                  <span className={`chip ${isNew ? 'chip-new' : isDone ? 'chip-done' : 'chip-due'}`}>
                    {isNew ? 'Baru' : isDone ? 'Dikuasai' : 'Diproses'}
                  </span>
                  {maskArabic && !showArabic ? (
                    <button type="button" className="lnk tiny" onClick={() => reveal(word.ar)}>
                      <Icon name="eye" /> Intip harakat
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon"><Icon name="search" /></span>
          <h3>Tidak ada kata yang cocok</h3>
          <p>Coba kata kunci lain atau ubah filter. Semua kosakata tema {theme} tetap bisa dipelajari.</p>
          <button
            type="button"
            className="btn btn-soft"
            onClick={() => {
              setQuery('');
              setFilter('semua');
            }}
          >
            Reset pencarian
          </button>
        </div>
      )}

      <p className="materi-hint">
        <Icon name="info" />
        {settings.diff === 'mudah'
          ? 'Mode mudah menampilkan harakat dan cara baca. Intip bila perlu, lalu tandai kata yang sudah dikuasai.'
          : settings.diff === 'sedang'
            ? 'Mode sedang menyembunyikan cara baca. Gunakan tombol “Intip cara baca” bila perlu.'
            : 'Mode sulit menampilkan teks gundul. Gunakan “Intip harakat” untuk membuka bantuan.'}
      </p>
    </div>
  );
}
