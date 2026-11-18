'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppProvider';
import { P, W } from '@/data/vocabulary';
import { stripHarakat, todayStr } from '@/utils/date';
import Icon from '@/components/Icon';

const SESSION_LIMIT = 20;

export default function UlasanPage() {
  const { progress, settings, grade } = useApp();
  const [queue, setQueue] = useState(null);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [okCount, setOkCount] = useState(0);
  const [againCount, setAgainCount] = useState(0);

  const today = todayStr();
  const due = useMemo(
    () => W.filter((w) => progress.srs[w.ar] && progress.srs[w.ar].d <= today).sort((a, b) => progress.srs[a.ar].d.localeCompare(progress.srs[b.ar].d)),
    [progress.srs, today]
  );
  const fresh = useMemo(
    () => P.filter((w) => !progress.srs[w.ar] && !progress.mastered[w.ar]),
    [progress.srs, progress.mastered]
  );

  const start = () => {
    const next = [...due, ...fresh].slice(0, SESSION_LIMIT);
    setQueue(next);
    setIndex(0);
    setRevealed(false);
    setOkCount(0);
    setAgainCount(0);
  };

  const current = queue ? queue[index] : null;
  const finished = queue !== null && index >= queue.length;

  const respond = (ok) => {
    if (!current) return;
    grade(current, ok, false);
    if (ok) setOkCount((v) => v + 1);
    else setAgainCount((v) => v + 1);
    setRevealed(false);
    setIndex((v) => v + 1);
  };

  if (queue === null) {
    const total = Math.min(due.length + fresh.length, SESSION_LIMIT);
    return (
      <div className="page ulasan-page">
        <div className="page-head">
          <span className="eyebrow">Pengulangan berjarak</span>
          <h1>Ulasan</h1>
          <p>Kartu muncul kembali pada waktu yang tepat: 1, 3, 7, lalu 14 hari setelah kamu mengingatnya.</p>
        </div>

        <section className="review-hero">
          <div>
            <span className="chip chip-gold">Hari ini</span>
            <h2>{total ? `${total} kata menunggu diulas` : 'Tidak ada kata yang jatuh tempo'}</h2>
            <p>
              {due.length} kata sudah waktunya diulang, {fresh.length} kata baru siap dipelajari.
              Tandai “Ingat” bila kamu yakin, atau “Lupa” agar kata dijadwalkan ulang hari ini.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary btn-lg" onClick={start} disabled={!total}>
                <Icon name="layers" /> Mulai ulasan
              </button>
              <Link href="/" className="btn btn-ghost">Kembali</Link>
            </div>
          </div>
          <div className="review-rings">
            <div className="ring-stat"><strong>{due.length}</strong><span>jatuh tempo</span></div>
            <div className="ring-stat"><strong>{fresh.length}</strong><span>kata baru</span></div>
            <div className="ring-stat"><strong>{Object.keys(progress.mastered).length}</strong><span>dikuasai</span></div>
          </div>
        </section>

        <section className="card srs-guide">
          <div className="sec-head compact">
            <div><span className="eyebrow">Cara kerja</span><h2>Jadwal yang menyesuaikan ingatan</h2></div>
          </div>
          <div className="srs-steps">
            <div><span>1</span><strong>Lupa</strong><small>Kembali hari ini</small></div>
            <div><span>2</span><strong>1 hari</strong><small>Ulang besok</small></div>
            <div><span>3</span><strong>3 hari</strong><small>Kalau masih ingat</small></div>
            <div><span>4</span><strong>7 hari</strong><small>Menguat</small></div>
            <div><span>5</span><strong>14 hari</strong><small>Dikuasai</small></div>
          </div>
        </section>
      </div>
    );
  }

  if (finished) {
    const answered = okCount + againCount;
    const percent = answered ? Math.round((okCount / answered) * 100) : 0;
    return (
      <div className="page">
        <div className="finish-card">
          <span className="finish-ar">جَزَاكَ اللهُ خَيْرًا</span>
          <h1>Ulasan selesai</h1>
          <p>{okCount} kata diingat, {againCount} kata perlu diulang.</p>
          <div className="score-circle"><strong>{percent}</strong><small>akurasi</small></div>
          <div className="finish-actions">
            <button type="button" className="btn btn-primary" onClick={start}>Ulas lagi</button>
            <Link href="/" className="btn btn-ghost">Ke beranda</Link>
            <Link href="/latihan/kuis" className="btn btn-soft">Uji dengan kuis</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const entry = progress.srs[current.ar];
  const level = entry?.b || 0;
  const showArabic = settings.diff !== 'sulit' || revealed;

  return (
    <div className="page ulasan-play">
      <div className="quiz-topbar">
        <button type="button" className="icon-btn" onClick={() => setQueue(null)} aria-label="Keluar dari ulasan">
          <Icon name="close" />
        </button>
        <div className="quiz-progress-wrap">
          <div className="quiz-progress-label">
            <span>Kartu {index + 1} dari {queue.length}</span>
            <span>{okCount} diingat</span>
          </div>
          <div className="track"><span style={{ width: `${Math.round((index / queue.length) * 100)}%` }} /></div>
        </div>
        <span className="chip chip-soft">{current.t}</span>
      </div>

      <section className="flashcard">
        <div className="flash-top">
          <span className="chip chip-soft">{entry ? `Jadwal ulang` : 'Kata baru'}</span>
          <div className="level-dots" aria-label={`Tingkat ingatan ${level} dari 4`}>
            {[0, 1, 2, 3].map((n) => <span key={n} className={n < level ? 'on' : ''} />)}
          </div>
        </div>

        <div className="flash-arabic">
          {showArabic ? current.ar : stripHarakat(current.ar)}
        </div>

        {revealed ? (
          <div className="flash-answer">
            <span className="flash-translit">{current.tr}</span>
            <h2>{current.id}</h2>
            <p className="muted small">Tema {current.t}{entry ? ` · ulangan ke-${level + 1}` : ' · kata baru'}</p>
          </div>
        ) : (
          <button type="button" className="reveal-big" onClick={() => setRevealed(true)}>
            <Icon name="eye" /> Tampilkan jawaban
          </button>
        )}

        {revealed ? (
          <div className="flash-actions">
            <button type="button" className="btn btn-danger-soft" onClick={() => respond(false)}>
              <Icon name="refresh" /> Lupa
            </button>
            <button type="button" className="btn btn-primary" onClick={() => respond(true)}>
              <Icon name="check" /> Ingat
            </button>
          </div>
        ) : (
          <p className="muted small">Ingat artinya sebelum membuka jawaban.</p>
        )}
      </section>

      <div className="flash-tips">
        <div><strong>{due.length}</strong><span>jatuh tempo</span></div>
        <div><strong>{fresh.length}</strong><span>kata baru</span></div>
        {settings.diff === 'sulit' ? <p><Icon name="info" /> Mode sulit menyembunyikan harakat sampai jawaban dibuka.</p> : null}
      </div>
    </div>
  );
}
