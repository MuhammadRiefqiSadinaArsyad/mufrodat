'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppProvider';
import { DIFF } from '@/data/themes';
import { todayStr } from '@/utils/date';
import { W } from '@/data/vocabulary';
import Icon from '@/components/Icon';
import { ArchDoor } from '@/components/Ornaments';

const MODES = [
  {
    href: '/latihan/kuis',
    icon: 'question',
    title: 'Kuis pilihan ganda',
    desc: 'Uji pemahaman dengan 10 sampai 100 soal, dari teks Arab ke arti dan sebaliknya.',
    tag: '10–100 soal',
    tone: 'a'
  },
  {
    href: '/latihan/kalimat',
    icon: 'layers',
    title: 'Susun kalimat',
    desc: 'Susun potongan kata menjadi kalimat Arab yang benar, lengkap dengan penjelasan pola kalimatnya.',
    tag: '16–100 kalimat',
    tone: 'b'
  },
  {
    href: '/latihan/memory',
    icon: 'cards',
    title: 'Permainan memori',
    desc: 'Balik kartu dan temukan pasangan kata Arab dengan arti Indonesianya. Enam pasangan setiap putaran.',
    tag: '6 pasangan',
    tone: 'c'
  },
  {
    href: '/latihan/cocokkan',
    icon: 'target',
    title: 'Cocokkan cepat',
    desc: 'Pilih kata Arab lalu pasangkan dengan arti yang tepat. Lima pasangan, tanpa batas waktu.',
    tag: '5 pasangan',
    tone: 'd'
  },
  {
    href: '/latihan/kaidah',
    icon: 'book',
    title: 'Kaidah dasar',
    desc: 'Bedakan isim, fi‘il, dan harf, lalu kenali jumlah ismiyyah, fi‘liyyah, serta bentuk kata.',
    tag: '10 soal',
    tone: 'b'
  },
  {
    href: '/latihan/tarjamah',
    icon: 'eye',
    title: 'Terjemah kalimat',
    desc: 'Baca kalimat Arab berharakat lalu pilih terjemahan Indonesianya yang tepat.',
    tag: '10 kalimat',
    tone: 'a'
  }
];

export default function LatihanPage() {
  const { progress, settings } = useApp();
  const today = todayStr();
  const due = W.filter((w) => progress.srs[w.ar] && progress.srs[w.ar].d <= today).length;

  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">Ruang latihan</span>
        <h1>Latihan</h1>
        <p>Pilih cara belajar yang paling cocok hari ini. Setiap latihan mencatat progres ke akunmu.</p>
      </div>

      <section className="latihan-hero">
        <div className="lh-copy">
          <span className="chip chip-gold">Tingkat aktif: {DIFF[settings.diff].label}</span>
          <h2>Sedikit latihan, banyak yang menempel.</h2>
          <p>{DIFF[settings.diff].desc}</p>
          <div className="lh-stats">
            <div><strong>{Object.keys(progress.mastered).length}</strong><small>kata dikuasai</small></div>
            <div><strong>{due}</strong><small>jatuh tempo</small></div>
            <div><strong>{progress.streak || 0}</strong><small>hari beruntun</small></div>
          </div>
        </div>
        <span className="arch-badge large"><ArchDoor /></span>
      </section>

      <div className="latihan-list">
        {MODES.map((mode) => (
          <Link href={mode.href} key={mode.href} className={`latihan-card tone-${mode.tone}`}>
            <span className="latihan-icon"><Icon name={mode.icon} /></span>
            <div className="latihan-body">
              <div className="latihan-title">
                <h3>{mode.title}</h3>
                <span className="chip chip-soft">{mode.tag}</span>
              </div>
              <p>{mode.desc}</p>
            </div>
            <span className="latihan-go"><Icon name="arrowRight" /></span>
          </Link>
        ))}
      </div>

      <div className="guide-grid">
        <section className="card mini-guide">
          <span className="eyebrow">Alur yang disarankan</span>
          <h3>Belajar → ulangi → uji</h3>
          <ol className="steps">
            <li><span>1</span><div><strong>Baca mufradat</strong><small>Kenali kata, arti, dan cara bacanya di menu Mufradat.</small></div></li>
            <li><span>2</span><div><strong>Ulas dengan kartu</strong><small>Tandai “masih ingat” atau “lupa”. Jadwal ulangan diatur otomatis.</small></div></li>
            <li><span>3</span><div><strong>Uji lewat permainan</strong><small>Kuis, susun kalimat, kaidah, terjemah, memori, dan mencocokkan mengunci ingatanmu.</small></div></li>
          </ol>
        </section>
        <section className="card mini-guide">
          <span className="eyebrow">Catatan timer</span>
          <h3>Waktu sesuai tingkat</h3>
          <div className="timer-list">
            <div><span>Mudah</span><strong>Tanpa timer</strong></div>
            <div><span>Sedang</span><strong>20 detik / soal</strong></div>
            <div><span>Sulit</span><strong>12 detik / soal</strong></div>
          </div>
          <p className="muted small">Timer hanya berlaku pada kuis. Latihan lain bisa diselesaikan tanpa tekanan waktu.</p>
          <Link href="/panduan" className="lnk">Ubah tingkat di panduan <Icon name="arrowRight" /></Link>
        </section>
      </div>
    </div>
  );
}
