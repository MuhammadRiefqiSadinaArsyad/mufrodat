'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppProvider';
import { DIFF } from '@/data/themes';
import { EXPLANATIONS, S, findWord } from '@/data/vocabulary';
import { sample, shuffle } from '@/utils/scoring';
import Icon from '@/components/Icon';

const COUNTS = [10, 20, 50];

const poolFor = (difficulty) => {
  if (difficulty === 'sulit') return S.filter((s) => s.words.length === 3);
  if (difficulty === 'sedang') return S.filter((s) => s.words.length >= 2 && s.words.length <= 3);
  return S.filter((s) => s.words.length === 2);
};

const makeRound = (sentence, difficulty, all) => {
  const extras =
    difficulty === 'sulit'
      ? sample(
          all.filter((s) => s.words[1] !== sentence.words[1]),
          2
        ).map((s) => s.words[1])
      : [];
  const tiles = shuffle(
    [...sentence.words, ...extras].map((word, i) => ({ word, key: `${word}-${i}-${Math.random()}` }))
  );
  return { sentence, tiles, extras };
};

export default function KalimatPage() {
  const { settings, grade } = useApp();
  const [phase, setPhase] = useState('setup');
  const [count, setCount] = useState(20);
  const [rounds, setRounds] = useState([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState([]);
  const [used, setUsed] = useState([]);
  const [checked, setChecked] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const pool = useMemo(() => poolFor(settings.diff), [settings.diff]);
  const round = rounds[index];

  const start = () => {
    const source = sample(pool, Math.min(count, pool.length));
    const nextRounds = source.map((sentence) => makeRound(sentence, settings.diff, S));
    setRounds(nextRounds);
    setIndex(0);
    setPicked([]);
    setUsed([]);
    setChecked(null);
    setScore(0);
    setFinished(false);
    setPhase('play');
  };

  const pickTile = (tile, tileIndex) => {
    if (checked || used.includes(tileIndex)) return;
    setPicked((prev) => [...prev, tile]);
    setUsed((prev) => [...prev, tileIndex]);
  };

  const removeChip = (position) => {
    if (checked) return;
    const tile = picked[position];
    setPicked((prev) => prev.filter((_, i) => i !== position));
    setUsed((prev) => prev.filter((i) => rounds[index].tiles[i] !== tile));
  };

  const check = () => {
    if (!round || !picked.length) return;
    const attempt = picked.map((t) => t.word).join(' ');
    const target = round.sentence.words.join(' ');
    const ok = attempt === target;
    setChecked(ok);
    if (ok) setScore((v) => v + 1);
    const focusWord = round.sentence.words.map(findWord).find(Boolean);
    if (focusWord) grade(focusWord, ok, true);
  };

  const next = () => {
    if (index + 1 >= rounds.length) {
      setFinished(true);
      return;
    }
    setIndex((v) => v + 1);
    setPicked([]);
    setUsed([]);
    setChecked(null);
  };

  if (phase === 'setup') {
    return (
      <div className="page">
        <div className="subbar">
          <Link href="/latihan" className="back-link"><Icon name="chevLeft" /> Latihan</Link>
          <span className="chip chip-soft"><Icon name="layers" /> Susun kalimat</span>
        </div>
        <div className="page-title-row">
          <div>
            <span className="eyebrow">Latihan tata bahasa</span>
            <h1>Susun kalimat</h1>
            <p>Susun kata Arab sesuai arti. Tingkat sulit menambahkan kata pengecoh.</p>
          </div>
          <span className="title-badge"><strong>{pool.length}</strong><small>kalimat siap</small></span>
        </div>

        <section className="quiz-setup">
          <div className="setup-block">
            <div className="sec-head compact">
              <div><span className="eyebrow">Langkah 1</span><h2>Jumlah kalimat</h2></div>
            </div>
            <div className="count-grid three">
              {COUNTS.map((n) => (
                <button key={n} type="button" className={`count-btn ${count === n ? 'active' : ''}`} onClick={() => setCount(n)}>
                  <strong>{n}</strong><small>kalimat</small>
                </button>
              ))}
            </div>
          </div>

          <div className="setup-block">
            <div className="sec-head compact">
              <div><span className="eyebrow">Langkah 2</span><h2>Tingkat aktif</h2></div>
              <span className="chip chip-gold">{DIFF[settings.diff].label}</span>
            </div>
            <div className="sentence-demo">
              <span className="ar-inline">هَذَا كِتَابٌ جَدِيدٌ</span>
              <p>Ini buku baru</p>
              <small>
                {settings.diff === 'mudah'
                  ? 'Kalimat dua kata tanpa pengecoh.'
                  : settings.diff === 'sedang'
                    ? 'Campuran kalimat dua dan tiga kata.'
                    : 'Kalimat tiga kata dengan dua pengecoh.'}
              </small>
            </div>
            <p className="muted small">Ubah tingkat di beranda atau panduan bila ingin variasi lain.</p>
          </div>

          <div className="setup-summary">
            <div><span>Jumlah kalimat</span><strong>{count}</strong></div>
            <div><span>Tersedia di tingkat ini</span><strong>{pool.length}</strong></div>
            <div><span>Pengecoh</span><strong>{settings.diff === 'sulit' ? '2 kata' : 'Tidak ada'}</strong></div>
            <div><span>Penjelasan</span><strong>Setiap kalimat</strong></div>
          </div>

          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={start} disabled={!pool.length}>
            Mulai menyusun <Icon name="arrowRight" />
          </button>
        </section>
      </div>
    );
  }

  if (!round) return null;

  if (finished) {
    const percent = rounds.length ? Math.round((score / rounds.length) * 100) : 0;
    return (
      <div className="page">
        <div className="finish-card">
          <span className="finish-ar">بَارَكَ اللهُ فِيكَ</span>
          <h1>Latihan selesai</h1>
          <p>{score} dari {rounds.length} kalimat tersusun benar.</p>
          <div className="score-circle"><strong>{percent}</strong><small>dari 100</small></div>
          <div className="finish-actions">
            <button type="button" className="btn btn-primary" onClick={start}>Ulangi <Icon name="refresh" /></button>
            <Link href="/latihan" className="btn btn-ghost">Pilih latihan lain</Link>
          </div>
        </div>
      </div>
    );
  }

  const target = round.sentence.words.join(' ');
  const answer = picked.map((t) => t.word).join(' ');

  return (
    <div className="page sentence-page">
      <div className="quiz-topbar">
        <button type="button" className="icon-btn" onClick={() => setPhase('setup')} aria-label="Keluar">
          <Icon name="close" />
        </button>
        <div className="quiz-progress-wrap">
          <div className="quiz-progress-label">
            <span>Kalimat {index + 1} dari {rounds.length}</span>
            <span>{score} benar</span>
          </div>
          <div className="track"><span style={{ width: `${Math.round((index / rounds.length) * 100)}%` }} /></div>
        </div>
        <span className="chip chip-gold">{DIFF[settings.diff].label}</span>
      </div>

      <section className="sentence-card">
        <span className="eyebrow">Susun kalimat untuk arti berikut</span>
        <h2 className="sentence-meaning">{round.sentence.id}</h2>

        <div className={`answer-zone ${checked === true ? 'ok' : checked === false ? 'bad' : ''}`} dir="rtl">
          {picked.length ? (
            picked.map((tile, i) => (
              <button key={tile.key} type="button" className="word-chip" onClick={() => removeChip(i)} disabled={checked !== null}>
                {tile.word}
              </button>
            ))
          ) : (
            <span className="answer-placeholder">Tekan kata di bawah untuk menyusun kalimat…</span>
          )}
        </div>

        <div className="word-bank" dir="rtl">
          {round.tiles.map((tile, i) => (
            <button
              key={tile.key}
              type="button"
              className={`word-chip bank ${used.includes(i) ? 'used' : ''}`}
              onClick={() => pickTile(tile, i)}
              disabled={used.includes(i) || checked !== null}
            >
              {tile.word}
            </button>
          ))}
        </div>

        {checked === null ? (
          <div className="sentence-actions">
            <button type="button" className="btn btn-ghost" onClick={() => { setPicked([]); setUsed([]); }}>Kosongkan</button>
            <button type="button" className="btn btn-primary" onClick={check} disabled={!picked.length}>
              Periksa jawaban <Icon name="check" />
            </button>
          </div>
        ) : (
          <div className={`sentence-feedback ${checked ? 'ok' : 'bad'}`} role="status">
            <div className="sf-head">
              <Icon name={checked ? 'check' : 'info'} />
              <div>
                <strong>{checked ? 'Susunan tepat!' : 'Susunan belum tepat'}</strong>
                <small>{checked ? answer : `Jawaban benar: ${target}`}</small>
              </div>
            </div>
            {EXPLANATIONS[round.sentence.words[0]] ? (
              <p>{EXPLANATIONS[round.sentence.words[0]]}</p>
            ) : (
              <p>Perhatikan posisi kata tunjuk, kata benda, dan sifat dalam kalimat Arab.</p>
            )}
            <button type="button" className="btn btn-primary btn-block" onClick={next}>
              {index + 1 >= rounds.length ? 'Lihat hasil' : 'Kalimat berikutnya'}
              <Icon name="arrowRight" />
            </button>
          </div>
        )}
      </section>

      <p className="materi-hint"><Icon name="info" /> Tekan kata di kotak jawaban untuk mengembalikannya ke pilihan.</p>
    </div>
  );
}
