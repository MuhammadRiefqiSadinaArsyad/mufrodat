'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppProvider';
import { DIFF } from '@/data/themes';
import { formatDate } from '@/utils/date';
import { scoreCategory } from '@/utils/scoring';
import Icon from '@/components/Icon';

export default function HasilPage() {
  const { progress } = useApp();
  const result = progress.lastResult;

  if (!result) {
    return (
      <div className="page">
        <div className="empty-state tall">
          <span className="empty-icon"><Icon name="question" /></span>
          <h2>Belum ada hasil kuis</h2>
          <p>Selesaikan satu sesi kuis untuk melihat skor, jawaban yang perlu diulang, dan rekomendasi belajar.</p>
          <Link href="/latihan/kuis" className="btn btn-primary">Mulai kuis</Link>
        </div>
      </div>
    );
  }

  const category = scoreCategory(result.score);
  const debut = DIFF[result.difficulty] || DIFF.mudah;

  return (
    <div className="page result-page">
      <div className="subbar">
        <Link href="/latihan" className="back-link"><Icon name="chevLeft" /> Latihan</Link>
        <span className="chip chip-soft">{debut.label}</span>
      </div>

      <section className="result-hero">
        <div className="result-score">
          <span className="eyebrow">Skor kuis</span>
          <div className="score-circle">
            <strong>{result.score}</strong>
            <small>dari 100</small>
          </div>
          <div className="stars" aria-label={`${category.stars} dari 5 bintang`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Icon key={n} name={n <= category.stars ? 'star' : 'starMuted'} />
            ))}
          </div>
        </div>
        <div className="result-copy">
          <span className="eyebrow">Hasil latihan</span>
          <h1>{category.title}</h1>
          <p>{category.sub}</p>
          <div className="result-stats">
            <div><strong>{result.correct}</strong><span>jawaban benar</span></div>
            <div><strong>{result.total - result.correct}</strong><span>jawaban keliru</span></div>
            <div><strong>{debut.label}</strong><span>tingkat</span></div>
          </div>
          <div className="result-actions">
            <Link href="/latihan/kuis" className="btn btn-primary">Ulangi kuis <Icon name="refresh" /></Link>
            <Link href="/" className="btn btn-ghost">Ke beranda</Link>
          </div>
        </div>
      </section>

      <section className="card result-detail">
        <div className="sec-head compact">
          <div>
            <span className="eyebrow">Perlu diulang</span>
            <h2>{result.wrong.length ? `${result.wrong.length} kata belum tepat` : 'Semua jawaban benar'}</h2>
          </div>
          <span className="chip chip-soft">{formatDate(result.date)}</span>
        </div>

        {result.wrong.length ? (
          <>
            <p className="muted">
              Kata-kata ini otomatis masuk jadwal ulangan hari ini. Buka menu ulasan untuk mengulanginya.
            </p>
            <div className="wrong-list">
              {result.wrong.map((word) => (
                <div key={word.ar} className="wrong-item">
                  <div>
                    <strong>{word.ar}</strong>
                    <span>{word.tr}</span>
                    <small>{word.id} · {word.t}</small>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/ulasan" className="btn btn-gold btn-block">Ulangi kata yang keliru</Link>
          </>
        ) : (
          <div className="perfect-box">
            <span className="perfect-ar">أَحْسَنْتَ</span>
            <p>Semua jawaban tepat. Naikkan tingkat kesulitan atau tambah jumlah soal untuk tantangan berikutnya.</p>
            <Link href="/latihan/kuis" className="btn btn-primary">Coba level lebih tinggi</Link>
          </div>
        )}
      </section>

      <div className="result-tip">
        <Icon name="flame" />
        <p><strong>Jaga ritme.</strong> Skor terbaikmu {progress.best || 0}%. Ulasan singkat setiap hari lebih efektif daripada belajar panjang sekali seminggu.</p>
      </div>
    </div>
  );
}
