'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppProvider';
import { P, W } from '@/data/vocabulary';
import { DIFF, THEMES } from '@/data/themes';
import { todayStr } from '@/utils/date';
import Icon, { ThemeIcon } from '@/components/Icon';
import MosqueArt, { ArchDoor, Mandala } from '@/components/Ornaments';

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 11) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 18) return 'Selamat sore';
  return 'Selamat malam';
};

export default function DashboardPage() {
  const { session, progress, settings, setDiff, resetProgress } = useApp();
  const [wod, setWod] = useState(() => P[Math.floor(Date.now() / 864e5) % P.length]);
  const [showReset, setShowReset] = useState(false);

  const today = todayStr();
  const masteredCount = Object.keys(progress.mastered).length;
  const due = useMemo(
    () => W.filter((w) => progress.srs[w.ar] && progress.srs[w.ar].d <= today),
    [progress.srs, today]
  );
  const fresh = useMemo(
    () => P.filter((w) => !progress.srs[w.ar] && !progress.mastered[w.ar]),
    [progress.srs, progress.mastered]
  );
  const goal = settings.goal || 10;
  const todayCount = progress.last === today ? progress.n || 0 : 0;
  const goalPct = Math.min(100, Math.round((todayCount / goal) * 100));
  const reviewList = [...due, ...fresh].slice(0, 3);

  const changeWod = () => {
    const next = P[Math.floor(Math.random() * P.length)];
    setWod(next);
  };

  return (
    <div className="page">
      <section className={`mosque-hero ${settings.mosquePhoto ? 'has-custom' : ''}`}>
        <MosqueArt />
        {settings.mosquePhoto ? (
          <div className="mosque-custom" style={{ backgroundImage: `url(${settings.mosquePhoto})` }} />
        ) : null}
        <div className="hero-content">
          <div className="hero-top">
            <span className="glass-pill">{greeting()}, selamat belajar</span>
            <div className="hero-user">
              <span className="user-avatar">{session.username.charAt(0).toUpperCase()}</span>
              <div>
                <strong>{session.username}</strong>
                <small>Pejuang kosakata</small>
              </div>
            </div>
          </div>
          <h1>
            {session.username}, mari tambah <span className="ar-inline">مُفْرَدَة</span> hari ini.
          </h1>
          <p>
            {greeting()}. Mulai dari kata yang mudah, kenali artinya, lalu uji dengan kuis.
            Sedikit demi sedikit, kosakata Arabmu akan tumbuh.
          </p>
          <div className="hero-actions">
            <Link href="/ulasan" className="btn btn-gold btn-lg">
              <Icon name="layers" />
              Ulas {Math.min(due.length + fresh.length, goal)} kata
            </Link>
            <Link href="/materi" className="btn btn-ghost btn-lg">
              Jelajahi mufradat
              <Icon name="arrowRight" />
            </Link>
          </div>
        </div>
      </section>

      <div className="floating-mode">
        <div className="fm-head">
          <div>
            <span className="eyebrow">Pilih tingkat</span>
            <h3 className="fm-title">{DIFF[settings.diff].full}</h3>
          </div>
          <span className="chip chip-soft">{DIFF[settings.diff].sub}</span>
        </div>
        <div className="mode-split" role="group" aria-label="Tingkat kesulitan">
          {Object.values(DIFF).map((item) => (
            <button
              key={item.id}
              type="button"
              className={`mode-option ${settings.diff === item.id ? 'active' : ''}`}
              onClick={() => setDiff(item.id)}
              aria-pressed={settings.diff === item.id}
            >
              <span className="mode-icon">
                <Icon name={item.id === 'mudah' ? 'sun' : item.id === 'sedang' ? 'target' : 'flame'} />
              </span>
              <span className="mode-meta">
                <strong>{item.label}</strong>
                <small>{item.sub}</small>
              </span>
            </button>
          ))}
        </div>
        <p className="mode-desc">{DIFF[settings.diff].desc}</p>
      </div>

      <section className="sage-stats">
        <div className="stat">
          <span className="stat-icon"><Icon name="award" /></span>
          <div><strong>{masteredCount}</strong><small>kata dikuasai</small></div>
        </div>
        <div className="stat">
          <span className="stat-icon"><Icon name="flame" /></span>
          <div><strong>{progress.streak || 0}</strong><small>hari beruntun</small></div>
        </div>
        <div className="stat">
          <span className="stat-icon"><Icon name="layers" /></span>
          <div><strong>{due.length}</strong><small>jatuh tempo</small></div>
        </div>
        <div className="stat">
          <span className="stat-icon"><Icon name="trophy" /></span>
          <div><strong>{progress.best || 0}%</strong><small>skor terbaik</small></div>
        </div>
      </section>

      <div className="dash-two">
        <section className="card goal-card">
          <div className="sec-head compact">
            <div>
              <span className="eyebrow">Target hari ini</span>
              <h2>{todayCount} dari {goal} kata</h2>
            </div>
            <span className={`goal-ring ${goalPct >= 100 ? 'done' : ''}`}>{goalPct}%</span>
          </div>
          <div className="track"><span style={{ width: `${goalPct}%` }} /></div>
          <p className="muted small">
            {goalPct >= 100
              ? 'Target tercapai. Konsistensi seperti ini yang membuat hafalan menempel.'
              : `Selesaikan ${Math.max(goal - todayCount, 0)} kata lagi untuk menjaga rantai belajar.`}
          </p>
          <div className="goal-actions">
            <Link href="/ulasan" className="lnk">Mulai ulasan <Icon name="arrowRight" /></Link>
            <span className="chip chip-soft">🔥 {progress.streak || 0} hari</span>
          </div>
        </section>

        <section className="card wod-card">
          <span className="arch-badge"><ArchDoor /></span>
          <div className="wod-body">
            <span className="eyebrow">Mufradat pilihan</span>
            <div className="wod-arabic">{wod.ar}</div>
            <div className="wod-translit">{wod.tr}</div>
            <p>{wod.id} · {wod.t}</p>
            <div className="wod-actions">
              <button type="button" className="icon-btn" onClick={changeWod} aria-label="Ganti kata">
                <Icon name="shuffle" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <section className="section">
        <div className="sec-head">
          <div>
            <span className="eyebrow">Jelajahi</span>
            <h2>Kategori mufradat</h2>
            <p>Sepuluh tema, dari keluarga sampai kata kerja sehari-hari.</p>
          </div>
          <Link href="/materi" className="lnk">Lihat semua <Icon name="arrowRight" /></Link>
        </div>
        <div className="kategori-grid">
          {THEMES.map((theme, index) => {
            const words = W.filter((w) => w.t === theme);
            const done = words.filter((w) => progress.mastered[w.ar]).length;
            const p = words.length ? Math.round((done / words.length) * 100) : 0;
            return (
              <Link key={theme} href={`/materi?tema=${encodeURIComponent(theme)}`} className={`kat-card tone-${index % 4}`}>
                <Mandala />
                <span className="kat-icon"><ThemeIcon theme={theme} /></span>
                <span className="kat-body">
                  <strong>{theme}</strong>
                  <small>{done}/{words.length} dikuasai</small>
                  <span className="track mini"><span style={{ width: `${p}%` }} /></span>
                </span>
                <Icon name="chevRight" className="kat-arrow" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="sec-head">
          <div>
            <span className="eyebrow">Latihan</span>
            <h2>Asah pemahamanmu</h2>
            <p>Empat cara berbeda untuk menguji kosakata yang sudah dipelajari.</p>
          </div>
          <Link href="/latihan" className="lnk">Semua latihan <Icon name="arrowRight" /></Link>
        </div>
        <div className="lat-grid">
          <Link href="/latihan/kuis" className="lat-card">
            <span className="lat-icon"><Icon name="question" /></span>
            <strong>Kuis pilihan ganda</strong>
            <small>10–100 soal, dengan timer sesuai tingkat.</small>
            <span className="lnk">Mulai kuis <Icon name="arrowRight" /></span>
          </Link>
          <Link href="/latihan/kalimat" className="lat-card">
            <span className="lat-icon"><Icon name="layers" /></span>
            <strong>Susun kalimat</strong>
            <small>Urutkan kata Arab menjadi kalimat bermakna.</small>
            <span className="lnk">Mulai menyusun <Icon name="arrowRight" /></span>
          </Link>
          <Link href="/latihan/memory" className="lat-card">
            <span className="lat-icon"><Icon name="cards" /></span>
            <strong>Permainan memori</strong>
            <small>Cocokkan kata Arab dengan artinya.</small>
            <span className="lnk">Mainkan <Icon name="arrowRight" /></span>
          </Link>
          <Link href="/latihan/cocokkan" className="lat-card">
            <span className="lat-icon"><Icon name="target" /></span>
            <strong>Cocokkan cepat</strong>
            <small>Tarik garis ingatan antara kata dan makna.</small>
            <span className="lnk">Mulai mencocokkan <Icon name="arrowRight" /></span>
          </Link>
        </div>
      </section>

      {reviewList.length ? (
        <section className="section">
          <div className="sec-head">
            <div>
              <span className="eyebrow">Pengulangan berjarak</span>
              <h2>Ulangi sebelum lupa</h2>
              <p>{due.length} kata jatuh tempo dan {fresh.length} kata baru siap dipelajari.</p>
            </div>
            <Link href="/ulasan" className="btn btn-primary">Buka ulasan</Link>
          </div>
          <div className="review-strip">
            {reviewList.map((w) => (
              <div key={w.ar} className="review-item">
                <div>
                  <strong>{w.ar}</strong>
                  <small>{w.id}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="quote-card">
        <span className="quote-ar">مَنْ سَارَ عَلَى الدَّرْبِ وَصَلَ</span>
        <p>“Siapa yang berjalan di atas jalan, ia akan sampai.”</p>
        <span>Langkah kecil setiap hari lebih baik daripada semangat sesaat.</span>
      </section>

      <div className="dash-foot">
        <button type="button" className="lnk danger" onClick={() => setShowReset(true)}>Atur ulang progres</button>
        <span className="muted small">Data tersimpan lokal di browser ini.</span>
      </div>

      {showReset ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowReset(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="reset-title" onClick={(e) => e.stopPropagation()}>
            <h3 id="reset-title">Atur ulang progres?</h3>
            <p>Semua tanda dikuasai, jadwal ulangan, dan riwayat skor untuk akun {session.username} akan dihapus. Kata-kata tetap ada.</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setShowReset(false)}>Batal</button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  resetProgress();
                  setShowReset(false);
                }}
              >
                Ya, hapus progres
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
