'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/context/AppProvider';
import { EXPLANATIONS, S } from '@/data/vocabulary';
import { stripHarakat } from '@/utils/date';
import { pct, sample, shuffle } from '@/utils/scoring';
import Icon from '@/components/Icon';

const COUNT = 10;

const build = (difficulty) =>
  sample(S, COUNT).map((sentence) => {
    const ar = sentence.words.join(' ');
    const others = [...new Set(S.filter((s) => s.id !== sentence.id).map((s) => s.id))];
    const options = shuffle([sentence.id, ...sample(others, 3)]);
    return {
      ar: difficulty === 'sulit' ? stripHarakat(ar) : ar,
      id: sentence.id,
      options,
      answer: options.indexOf(sentence.id),
      note: EXPLANATIONS[sentence.words[0]] || 'Perhatikan makna kata tunjuk dan kata benda dalam kalimat.'
    };
  });

export default function TarjamahPage() {
  const { settings, markActivity } = useApp();
  const [rounds, setRounds] = useState(() => build(settings.diff));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = rounds[index];
  const locked = picked !== null;
  const correct = locked && picked === q.answer;

  const restart = () => {
    setRounds(build(settings.diff));
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
          <h1>Latihan terjemah selesai</h1>
          <p>{score} dari {rounds.length} kalimat diterjemahkan benar.</p>
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
    if (i === q.answer) return 'quiz-option correct';
    if (i === picked) return 'quiz-option wrong';
    return 'quiz-option muted';
  };

  return (
    <div className="page quiz-play-page">
      <div className="quiz-topbar">
        <Link href="/latihan" className="icon-btn" aria-label="Keluar dari latihan terjemah">
          <Icon name="close" />
        </Link>
        <div className="quiz-progress-wrap">
          <div className="quiz-progress-label">
            <span>Kalimat {index + 1} dari {rounds.length}</span>
            <span>{score} benar</span>
          </div>
          <div className="track"><span style={{ width: `${pct(index, rounds.length)}%` }} /></div>
        </div>
        <span className="chip chip-soft">Terjemah</span>
      </div>

      <section className="quiz-card">
        <div className="quiz-meta">
          <span className="chip chip-soft">Arab → Indonesia</span>
          <span className="muted small">Pilih terjemahan yang paling tepat</span>
        </div>

        <div className="quiz-prompt arabic phrase">
          <span>{q.ar}</span>
        </div>

        <div className="quiz-options">
          {q.options.map((opt, i) => (
            <button
              key={opt}
              type="button"
              className={optionClass(opt, i)}
              onClick={() => {
                if (locked) return;
                setPicked(i);
                if (i === q.answer) setScore((v) => v + 1);
              }}
              disabled={locked}
            >
              <span className="option-key">{String.fromCharCode(65 + i)}</span>
              <span className="option-label">{opt}</span>
              {locked && i === q.answer ? <Icon name="check" /> : null}
              {locked && i === picked && i !== q.answer ? <Icon name="close" /> : null}
            </button>
          ))}
        </div>

        {locked ? (
          <div className={`quiz-feedback ${correct ? 'ok' : 'bad'}`} role="status">
            <Icon name={correct ? 'check' : 'info'} />
            <div>
              <strong>{correct ? 'Benar, lanjutkan!' : 'Belum tepat'}</strong>
              <small>{q.id}</small>
              <p>{q.note}</p>
            </div>
          </div>
        ) : null}

        {locked ? (
          <button type="button" className="btn btn-primary btn-block quiz-next" onClick={next}>
            {index + 1 >= rounds.length ? 'Lihat hasil' : 'Kalimat berikutnya'}
            <Icon name="arrowRight" />
          </button>
        ) : null}
      </section>
    </div>
  );
}
