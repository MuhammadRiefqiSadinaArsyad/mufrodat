'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppProvider';
import { DIFF, SRS_INTERVALS } from '@/data/themes';
import Icon from '@/components/Icon';
import { ArchDoor } from '@/components/Ornaments';

const GOALS = [5, 10, 15, 20];
const MAX_PHOTO_CHARS = 1_200_000;

const shrinkPhoto = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Foto tidak bisa dibaca.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Berkas ini bukan gambar yang valid.'));
      img.onload = () => {
        const scale = Math.min(1, 1400 / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

export default function PanduanPage() {
  const { session, settings, saveSettings, resetProgress } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);
  const [photoNote, setPhotoNote] = useState('');
  const [photoError, setPhotoError] = useState(false);

  const pickPhoto = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setPhotoError(false);
    if (!file.type.startsWith('image/')) {
      setPhotoError(true);
      setPhotoNote('Pilih berkas gambar, misalnya JPG atau PNG.');
      return;
    }
    setPhotoNote('Memproses foto…');
    try {
      const data = await shrinkPhoto(file);
      if (data.length > MAX_PHOTO_CHARS) {
        setPhotoError(true);
        setPhotoNote('Foto masih terlalu besar setelah dikompres. Pilih gambar lain.');
        return;
      }
      saveSettings({ mosquePhoto: data });
      setPhotoNote('Foto latar tersimpan. Buka Beranda untuk melihatnya.');
    } catch (err) {
      setPhotoError(true);
      setPhotoNote(err.message);
    }
  };

  const removePhoto = () => {
    saveSettings({ mosquePhoto: '' });
    setPhotoError(false);
    setPhotoNote('Foto latar dihapus. Beranda kembali memakai ilustrasi masjid.');
  };


  return (
    <div className="page panduan-page">
      <div className="page-head">
        <span className="eyebrow">Panduan & pengaturan</span>
        <h1>Panduan</h1>
        <p>Kenali cara belajar, atur tampilan, dan kelola data yang tersimpan di perangkatmu.</p>
      </div>

      <section className="guide-hero">
        <div>
          <span className="chip chip-gold">Mulai dari sini</span>
          <h2>Belajar tidak harus lama, yang penting rutin.</h2>
          <p>
            Al-Mufradat menyimpan seluruh kosakata di aplikasi. Progresmu, seperti kata yang dikuasai,
            jadwal ulangan, dan skor terbaik, disimpan di LocalStorage browser untuk nama pengguna
            <strong> {session.username}</strong>.
          </p>
        </div>
        <span className="arch-badge large"><ArchDoor /></span>
      </section>

      <section className="card settings-card">
        <div className="sec-head compact">
          <div><span className="eyebrow">Tampilan</span><h2>Preferensi belajar</h2></div>
        </div>

        <div className="setting-row">
          <div><strong>Tema warna</strong><small>Terang atau gelap, mengikuti pilihanmu.</small></div>
          <div className="seg">
            <button type="button" className={settings.theme === 'light' ? 'active' : ''} onClick={() => saveSettings({ theme: 'light' })}>
              <Icon name="sun" /> Terang
            </button>
            <button type="button" className={settings.theme === 'dark' ? 'active' : ''} onClick={() => saveSettings({ theme: 'dark' })}>
              <Icon name="moon" /> Gelap
            </button>
          </div>
        </div>

        <div className="setting-row column">
          <div><strong>Tingkat kesulitan</strong><small>Berlaku untuk materi, kuis, dan permainan.</small></div>
          <div className="diff-pick">
            {Object.values(DIFF).map((item) => (
              <button
                key={item.id}
                type="button"
                className={settings.diff === item.id ? 'active' : ''}
                onClick={() => saveSettings({ diff: item.id })}
              >
                <strong>{item.label}</strong>
                <small>{item.id === 'mudah' ? 'Harakat + Latin' : item.id === 'sedang' ? 'Latin disembunyikan' : 'Teks gundul'}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="setting-row">
          <div><strong>Target harian</strong><small>Jumlah kata yang ingin diselesaikan setiap hari.</small></div>
          <select
            className="select"
            value={settings.goal}
            onChange={(e) => saveSettings({ goal: Number(e.target.value) })}
            aria-label="Target harian"
          >
            {GOALS.map((goal) => <option key={goal} value={goal}>{goal} kata</option>)}
          </select>
        </div>

        <div className="setting-row column">
          <div><strong>Foto latar masjid</strong><small>Tampil di beranda. Tersimpan lokal di perangkat ini.</small></div>
          <div
            className="photo-preview"
            style={settings.mosquePhoto ? { backgroundImage: `url(${settings.mosquePhoto})`, borderStyle: 'solid' } : undefined}
          >
            {settings.mosquePhoto ? null : <span><Icon name="camera" /> Belum ada foto</span>}
          </div>
          <div className="photo-actions">
            <label className="btn btn-soft">
              <Icon name="upload" /> {settings.mosquePhoto ? 'Ganti foto' : 'Pilih foto'}
              <input type="file" accept="image/*" onChange={pickPhoto} hidden />
            </label>
            {settings.mosquePhoto ? (
              <button type="button" className="btn btn-ghost" onClick={removePhoto}>
                <Icon name="trash" /> Hapus
              </button>
            ) : null}
          </div>
          {photoNote ? <p className={photoError ? 'form-error' : 'form-success'}>{photoNote}</p> : null}
        </div>
      </section>

      <section className="card storage-card">
        <div className="sec-head compact">
          <div><span className="eyebrow">Data & penyimpanan</span><h2>Data di perangkatmu</h2></div>
          <span className="chip chip-soft">Lokal</span>
        </div>
        <p className="storage-note">Progres belajar dan preferensi tersimpan di browser ini. Kata sandi tidak disimpan.</p>
        <div className="danger-zone">
          <div>
            <strong>Atur ulang progres</strong>
            <small>Menghapus kata dikuasai, jadwal ulangan, dan skor.</small>
          </div>
          <button type="button" className="btn btn-danger" onClick={() => setConfirmReset(true)}>
            <Icon name="trash" /> Reset progres
          </button>
        </div>
      </section>

      <section className="card guide-steps-card">
        <div className="sec-head compact">
          <div><span className="eyebrow">Cara pakai</span><h2>Empat kebiasaan kecil</h2></div>
        </div>
        <ol className="steps">
          <li><span>1</span><div><strong>Pilih tema</strong><small>Mulai dari Keluarga atau Angka, lalu perluas ke tema lain.</small></div></li>
          <li><span>2</span><div><strong>Tandai yang dikuasai</strong><small>Buka menu Mufradat, lalu tandai kata yang sudah kamu hafal.</small></div></li>
          <li><span>3</span><div><strong>Ulas setiap hari</strong><small>Menu Ulasan memakai interval {SRS_INTERVALS.join(', ')} hari.</small></div></li>
          <li><span>4</span><div><strong>Uji dengan permainan</strong><small>Kuis dan permainan mengunci ingatan lewat pengambilan informasi aktif.</small></div></li>
        </ol>
      </section>

      <section className="faq">
        <h2>Pertanyaan singkat</h2>
        <details>
          <summary>Apakah progres hilang saat keluar?</summary>
          <p>Tidak. Progres disimpan per nama pengguna. Masuk lagi dengan nama yang sama untuk melanjutkan.</p>
        </details>
        <details>
          <summary>Apakah data dikirim ke server?</summary>
          <p>Tidak. Semua progres disimpan di browser perangkat ini. Menghapus data situs akan menghapus progres.</p>
        </details>
        <details>
          <summary>Bisakah memakai nama berbeda?</summary>
          <p>Bisa. Setiap nama memiliki progres terpisah. Keluar lalu masuk dengan nama lain untuk memulai ruang belajar baru.</p>
        </details>
      </section>

      <footer className="app-foot">
        <span className="brand-mark small"><span /><span /></span>
        <p>Al-Mufradat · Media pembelajaran kosakata Bahasa Arab untuk pemula</p>
        <small>Dibuat untuk belajar mandiri. Data tetap di perangkatmu.</small>
      </footer>

      {confirmReset ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setConfirmReset(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="reset-progress" onClick={(e) => e.stopPropagation()}>
            <h3 id="reset-progress">Hapus seluruh progres?</h3>
            <p>
              Semua kata dikuasai, jadwal ulangan, streak, dan skor untuk <strong>{session.username}</strong> akan dihapus.
              Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setConfirmReset(false)}>Batal</button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  resetProgress();
                  setConfirmReset(false);
                }}
              >
                Ya, hapus
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
