'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import quizConfig from '@/data/quiz.json';
import { DIFF } from '@/data/themes';
import { P } from '@/data/vocabulary';
import { useApp } from '@/context/AppProvider';
import { stripHarakat, todayStr } from '@/utils/date';
import { sample, shuffle } from '@/utils/scoring';
import Icon from '@/components/Icon';

const buildQuestions = (count, difficulty) => {
  const types = [0, 1];
  const words = sample(P, Math.min(count, P.length));
  return shuffle(
    words.map((word, i) => {
      const type = types[i % types.length];
      const distractors = sample(
        P.filter((w) => w.id !== word.id && w.ar !== word.ar),
        3
      );
      if (type === 1) {
        return {
          word,
          type,
          prompt: word.id,
          hint: 'Pilih tulisan Arab yang tepat',
          options: shuffle([
            { label: word.ar, correct: true, latin: word.tr },
            ...distractors.map((w) => ({ label: w.ar, latin: w.tr, correct: false }))
          ])
        };
      }
      return {
        word,
        type,
        prompt: word.ar,
        hint:
          difficulty === 'sulit'
              ? 'Teks Arab ditampilkan tanpa harakat pada mode sulit.'
              : 'Pilih arti yang paling tepat',
        options: shuffle([
          { label: word.id, correct: true },
          ...distractors.map((w) => ({ label: w.id, correct: false }))
        ])
      };
    })
  );
};

export default function QuizPage() {
  const router = useRouter();
  const { settings, grade, saveResult } = useApp();
  const [phase, setPhase] = useState('setup');
  const [count, setCount] = useState(quizConfig.defaultCount);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timer = quizConfig.timers[settings.diff] || 0;

  const question = questions[index];
  const total = questions.length;
  const correctCount = answers.filter((a) => a.correct).length;

  useEffect(() => {
    if (phase !== 'play' || locked || !timer) return undefined;
    if (timeLeft <= 0) {
      const id = setTimeout(() => answer(null, true), 50);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, locked, timer, timeLeft, index]);

  const start = () => {
    const next = buildQuestions(count, settings.diff);
    setQuestions(next);
    setAnswers([]);
    setIndex(0);
    setSelected(null);
    setLocked(false);
    setTimeLeft(timer);
    setPhase('play');
  };

  const finish = (allAnswers) => {
    const correct = allAnswers.filter((a) => a.correct).length;
    const score = allAnswers.length ? Math.round((correct / allAnswers.length) * 100) : 0;
    const seen = new Set();
    const wrong = [];
    allAnswers.forEach((a) => {
      if (!a.correct && !seen.has(a.word.ar)) {
        seen.add(a.word.ar);
        wrong.push({ ar: a.word.ar, tr: a.word.tr, id: a.word.id, t: a.word.t });
      }
    });
    saveResult({
      score,
      correct,
      total: allAnswers.length,
      difficulty: settings.diff,
      wrong,
      date: todayStr()
    });
    router.push('/latihan/hasil');
  };

  function answer(choice, timedOut = false) {
    if (locked || !question) return;
    const correct = choice !== null && question.options[choice]?.correct;
    const record = {
      word: question.word,
      type: question.type,
      correct: Boolean(correct),
      choice,
      timedOut
    };
    const nextAnswers = [...answers, record];
    setLocked(true);
    setSelected(choice);
    setAnswers(nextAnswers);
    grade(question.word, Boolean(correct), true);
    if (index + 1 >= questions.length) {
      window.setTimeout(() => finish(nextAnswers), 950);
    } else {
      window.setTimeout(() => {
        setIndex((value) => value + 1);
        setSelected(null);
        setLocked(false);
        setTimeLeft(timer);
      }, 950);
    }
  }

  const optionClass = (opt, i) => {
    if (!locked) return 'quiz-option';
    if (opt.correct) return 'quiz-option correct';
    if (i === selected) return 'quiz-option wrong';
    return 'quiz-option muted';
  };

  if (phase === 'setup') {
    return (
      <div className="page quiz-page">
        <div className="subbar">
          <Link href="/latihan" className="back-link"><Icon name="chevLeft" /> Latihan</Link>
          <span className="chip chip-soft"><Icon name="question" /> Kuis</span>
        </div>

        <div className="page-title-row">
          <div>
            <span className="eyebrow">Uji pemahaman</span>
            <h1>Kuis mufradat</h1>
            <p>Pilih jumlah soal. Setiap jawaban langsung memperbarui jadwal ulanganmu.</p>
          </div>
          <span className="title-badge"><strong>{P.length}</strong><small>kata tersedia</small></span>
        </div>

        <section className="quiz-setup">
          <div className="setup-block">
            <div className="sec-head compact">
              <div><span className="eyebrow">Langkah 1</span><h2>Jumlah soal</h2></div>
            </div>
            <div className="count-grid">
              {quizConfig.counts.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`count-btn ${count === n ? 'active' : ''}`}
                  onClick={() => setCount(n)}
                >
                  <strong>{n}</strong>
                  <small>soal</small>
                </button>
              ))}
            </div>
          </div>

          <div className="setup-block">
            <div className="sec-head compact">
              <div><span className="eyebrow">Langkah 2</span><h2>Tingkat kesulitan</h2></div>
              <span className="chip chip-gold">{DIFF[settings.diff].label}</span>
            </div>
            <div className="diff-stack">
              {Object.values(DIFF).map((item) => (
                <div key={item.id} className={`diff-row ${settings.diff === item.id ? 'active' : ''}`}>
                  <span className="diff-dot" />
                  <div><strong>{item.label}</strong><small>{item.desc}</small></div>
                  {settings.diff === item.id ? <Icon name="check" /> : null}
                </div>
              ))}
            </div>
            <p className="muted small">Ubah tingkat di beranda atau panduan sebelum memulai kuis.</p>
          </div>

          <div className="setup-summary">
            <div><span>Jumlah soal</span><strong>{count}</strong></div>
            <div><span>Timer</span><strong>{timer ? `${timer} detik / soal` : 'Tanpa batas'}</strong></div>
            <div><span>Tipe soal</span><strong>2 tipe</strong></div>
          </div>

          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={start}>
            Mulai kuis <Icon name="arrowRight" />
          </button>
        </section>
      </div>
    );
  }

  if (!question) return null;

  const progressPct = total ? Math.round((index / total) * 100) : 0;

  return (
    <div className="page quiz-play-page">
      <div className="quiz-topbar">
        <button type="button" className="icon-btn" onClick={() => router.push('/latihan')} aria-label="Keluar dari kuis">
          <Icon name="close" />
        </button>
        <div className="quiz-progress-wrap">
          <div className="quiz-progress-label">
            <span>Soal {index + 1} dari {total}</span>
            <span>{correctCount} benar</span>
          </div>
          <div className="track"><span style={{ width: `${progressPct}%` }} /></div>
        </div>
        {timer ? (
          <div className={`quiz-timer ${timeLeft <= 5 ? 'danger' : ''}`} aria-label={`Sisa waktu ${timeLeft} detik`}>
            <Icon name="clock" /> {timeLeft}
          </div>
        ) : (
          <span className="chip chip-soft">Santai</span>
        )}
      </div>

      <section className="quiz-card">
        <div className="quiz-meta">
          <span className="chip chip-soft">
            {question.type === 0 ? 'Arab → Arti' : 'Arti → Arab'}
          </span>
          <span className="muted small">{question.hint}</span>
        </div>

        <div className={`quiz-prompt ${question.type === 1 ? 'latin' : 'arabic'}`}>
          {question.type === 1 ? <span>{question.prompt}</span> : <span className="arabic-text">{settings.diff === 'sulit' ? stripHarakat(question.prompt) : question.prompt}</span>}
        </div>

        <div className={`quiz-options ${question.type === 1 ? 'arabic-options' : ''}`}>
          {question.options.map((opt, i) => (
            <button
              key={`${opt.label}-${i}`}
              type="button"
              className={optionClass(opt, i)}
              onClick={() => answer(i)}
              disabled={locked}
            >
              <span className="option-key">{String.fromCharCode(65 + i)}</span>
              <span className="option-label">{settings.diff === 'sulit' && question.type === 1 ? stripHarakat(opt.label) : opt.label}</span>
              {opt.latin && question.type === 1 ? <small>{opt.latin}</small> : null}
              {locked && opt.correct ? <Icon name="check" /> : null}
              {locked && i === selected && !opt.correct ? <Icon name="close" /> : null}
            </button>
          ))}
        </div>

        {locked ? (
          <div className={`quiz-feedback ${selected !== null && question.options[selected]?.correct ? 'ok' : 'bad'}`} role="status">
            <Icon name={selected !== null && question.options[selected]?.correct ? 'check' : 'info'} />
            <div>
              <strong>
                {selected !== null && question.options[selected]?.correct
                  ? 'Benar, lanjutkan!'
                  : selected === null
                    ? 'Waktu habis'
                    : 'Belum tepat'}
              </strong>
              <small>
                {question.word.ar} — {question.word.id}
                {question.type === 1 ? '' : ` · ${question.word.tr}`}
              </small>
            </div>
          </div>
        ) : null}
      </section>

      <div className="quiz-foot">
        <span>Menjawab salah akan menjadwalkan kata ini untuk diulang hari ini.</span>
        <strong>{correctCount}/{answers.length || 0} benar</strong>
      </div>
    </div>
  );
}
