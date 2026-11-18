'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/context/AppProvider';
import { P } from '@/data/vocabulary';
import { sample, shuffle } from '@/utils/scoring';
import Icon from '@/components/Icon';

const PAIRS = 5;

export default function CocokkanPage() {
  const { markActivity } = useApp();
  const [seed, setSeed] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(false);
  const [errors, setErrors] = useState(0);
  const [won, setWon] = useState(false);

  const words = useMemo(() => sample(P, PAIRS), [seed]);
  const left = useMemo(() => shuffle(words), [words]);
  const right = useMemo(() => shuffle(words), [words]);

  useEffect(() => {
    if (won) markActivity();
  }, [won, markActivity]);

  const reset = useCallback(() => {
    setSeed((v) => v + 1);
    setSelectedWord(null);
    setSelectedMeaning(null);
    setMatched([]);
    setWrong(false);
    setErrors(0);
    setWon(false);
  }, []);

  const chooseWord = (word) => {
    if (won || matched.includes(word.ar)) return;
    setSelectedWord(word);
    setSelectedMeaning(null);
    setWrong(false);
  };

  const chooseMeaning = (word) => {
    if (won || matched.includes(word.ar) || !selectedWord) return;
    setSelectedMeaning(word);
    if (selectedWord.ar === word.ar) {
      const next = [...matched, word.ar];
      setMatched(next);
      setSelectedWord(null);
      setSelectedMeaning(null);
      setWrong(false);
      if (next.length === PAIRS) setWon(true);
    } else {
      setErrors((v) => v + 1);
      setWrong(true);
      window.setTimeout(() => {
        setWrong(false);
        setSelectedMeaning(null);
      }, 650);
    }
  };

  return (
    <div className="page match-page">
      <div className="subbar">
        <Link href="/latihan" className="back-link"><Icon name="chevLeft" /> Latihan</Link>
        <button type="button" className="lnk" onClick={reset}><Icon name="refresh" /> Pasangan baru</button>
      </div>

      <div className="page-title-row">
        <div>
          <span className="eyebrow">Latihan mencocokkan</span>
          <h1>Cocokkan kata</h1>
          <p>Pilih satu kata Arab di kolom kanan, lalu artinya di kolom kiri.</p>
        </div>
        <div className="mem-scores">
          <div><strong>{matched.length}/{PAIRS}</strong><small>cocok</small></div>
          <div><strong>{errors}</strong><small>salah</small></div>
        </div>
      </div>

      <div className="match-board">
        <div className="match-col">
          <span className="match-label">Arti</span>
          {right.map((word) => {
            const done = matched.includes(word.ar);
            const isSelected = selectedMeaning?.ar === word.ar;
            return (
              <button
                key={`m-${word.ar}`}
                type="button"
                className={`match-item meaning ${done ? 'done' : ''} ${isSelected ? 'selected' : ''} ${wrong && isSelected ? 'wrong' : ''}`}
                onClick={() => chooseMeaning(word)}
                disabled={done || won}
              >
                <span>{word.id}</span>
                <small>{word.t}</small>
                {done ? <Icon name="check" /> : null}
              </button>
            );
          })}
        </div>

        <div className="match-mid" aria-hidden="true">
          <span className="match-line" />
          <span className="match-dots" />
        </div>

        <div className="match-col" dir="rtl">
          <span className="match-label" dir="ltr">Kata Arab</span>
          {left.map((word) => {
            const done = matched.includes(word.ar);
            const isSelected = selectedWord?.ar === word.ar;
            return (
              <button
                key={`w-${word.ar}`}
                type="button"
                className={`match-item arabic ${done ? 'done' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => chooseWord(word)}
                disabled={done || won}
              >
                <span>{word.ar}</span>
                <small dir="ltr">{word.tr}</small>
                {done ? <Icon name="check" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <p className="materi-hint">
        <Icon name="info" />
        {selectedWord ? `Sekarang pilih arti dari “${selectedWord.ar}”.` : won ? 'Semua pasangan sudah cocok.' : 'Pilih kata Arab terlebih dahulu.'}
      </p>

      {won ? (
        <div className="win-panel" role="status">
          <span className="win-ar">أَحْسَنْتَ!</span>
          <div>
            <h3>Lima pasangan selesai</h3>
            <p>{errors ? `Dengan ${errors} percobaan keliru.` : 'Tanpa satu pun kesalahan.'} Lanjutkan ke ulasan agar kata tetap diingat.</p>
          </div>
          <div className="win-actions">
            <button type="button" className="btn btn-primary" onClick={reset}>Main lagi</button>
            <Link href="/ulasan" className="btn btn-ghost">Ulas kata</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
