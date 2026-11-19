'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/context/AppProvider';
import { KAIDAH } from '@/data/kaidah';
import { pct, sample, shuffle } from '@/utils/scoring';
import Icon from '@/components/Icon';

const COUNT = 10;

const build = () =>
  sample(KAIDAH, COUNT).map((item) => ({
    ...item,
    options: shuffle(item.options.map((label, i) => ({ label, correct: i === item.answer })))
  }));

export default function KaidahPage() {
  const { markActivity } = useApp();
  const [rounds, setRounds] = useState(build);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = rounds[index];
  const locked = picked !== null;
  const correct = locked && q.options[picked].correct;

  const restart = () => {
    setRounds(build());
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const next = () => {
    if (index + 1 >= rounds.length) {
      setDone(true);
      markActivity();
      return;
    }
    setIndex((v) => v + 1);
    setPicked(null);
  };

  if (done) {
    return (
      <div className="page">
        <div className="finish-card">
          <span className="finish-ar">أَحْسَنْتَ</span>
          <h1>Latihan kaidah selesai</h1>
          <p>{score} dari {rounds.length} soal benar.</p>
          <div className="score-circle"><strong>{pct(score, rounds.length)}</strong><small>dari 100</small></div>
          <div className="finish-actions">
            <button type="button" className="btn btn-primary" onClick={restart}>Ulangi <Icon name="refresh" /></button>
            <Link href="/latihan" className="btn btn-ghost">Pilih latihan lain</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!q) return null;

  const optionClass = (opt, i) => {
    if (!locked) return 'quiz-option';
    if (opt.correct) return 'quiz-option correct';
    if (i === picked) return 'quiz-option wrong';
    return 'quiz-option muted';
  };

  return (
    <div className="page quiz-play-page">
      <div className="quiz-topbar">
        <Link href="/latihan" className="icon-btn" aria-label="Keluar dari latihan kaidah">
          <Icon name="close" />
        </Link>
        <div className="quiz-progress-wrap">
          <div className="quiz-progress-label">
            <span>Soal {index + 1} dari {rounds.length}</span>
            <span>{score} benar</span>
          </div>
          <div className="track"><span style={{ width: `${pct(index, rounds.length)}%` }} /></div>
        </div>
        <span className="chip chip-soft">Kaidah</span>
      </div>

      <section className="quiz-card">
        <div className="quiz-meta">
          <span className="chip chip-soft">Nahwu &amp; sharaf</span>
          <span className="muted small">{q.ask}</span>
        </div>

        <div className={`quiz-prompt arabic ${q.ar.includes(' ') ? 'phrase' : ''}`}>
          <span>{q.ar}</span>
        </div>

        <div className="quiz-options">
          {q.options.map((opt, i) => (
            <button
              key={opt.label}
              type="button"
              className={optionClass(opt, i)}
              onClick={() => {
                if (locked) return;
                setPicked(i);
                if (opt.correct) setScore((v) => v + 1);
              }}
              disabled={locked}
            >
              <span className="option-key">{String.fromCharCode(65 + i)}</span>
              <span className="option-label">{opt.label}</span>
              {locked && opt.correct ? <Icon name="check" /> : null}
              {locked && i === picked && !opt.correct ? <Icon name="close" /> : null}
            </button>
          ))}
        </div>

        {locked ? (
          <div className={`quiz-feedback ${correct ? 'ok' : 'bad'}`} role="status">
            <Icon name={correct ? 'check' : 'info'} />
            <div>
              <strong>{correct ? 'Benar, lanjutkan!' : 'Belum tepat'}</strong>
              <p>{q.note}</p>
            </div>
          </div>
        ) : null}

        {locked ? (
          <button type="button" className="btn btn-primary btn-block quiz-next" onClick={next}>
            {index + 1 >= rounds.length ? 'Lihat hasil' : 'Soal berikutnya'}
            <Icon name="arrowRight" />
          </button>
        ) : null}
      </section>
    </div>
  );
}
