# Al-Mufradat

Media pembelajaran kosakata Bahasa Arab untuk pemula. Next.js, tanpa database: materi dari file JSON, progres pengguna di LocalStorage.

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build produksi
npm start       # jalankan hasil build
```

## Halaman

| URL                   | Isi                                    |
| --------------------- | -------------------------------------- |
| `/login`              | Masuk dengan nama dan kata sandi bebas |
| `/`                   | Dashboard, progres, kata pilihan hari ini |
| `/materi`             | 10 tema kosakata, pencarian, 3 tingkat kesulitan |
| `/latihan`            | Menu latihan                           |
| `/latihan/kuis`       | Kuis pilihan ganda 10–100 soal         |
| `/latihan/hasil`      | Hasil kuis terakhir                    |
| `/latihan/kalimat`    | Susun kalimat Arab                     |
| `/latihan/memory`     | Permainan kartu memori                 |
| `/latihan/cocokkan`   | Cocokkan kata dan arti                 |
| `/ulasan`             | Ulasan harian dengan pengulangan berjarak |
| `/panduan`            | Panduan, pengaturan, unggah foto latar, reset progres |

## Data

- `src/data/vocabulary.js` — kosakata dan tema.
- `src/data/sentences.json` — soal susun kalimat.
- `src/data/quiz.json`, `src/data/themes.js` — pengaturan kuis dan tingkat kesulitan.

LocalStorage:

- `almufradat_session` — sesi aktif, tanpa kata sandi.
- `almufradat_settings` — tema, tingkat kesulitan, target harian, foto latar.
- `almufradat_theme` — tema aktif untuk render awal.
- `almufradat_user_<nama>` — progres per pengguna: kata dikuasai, jadwal ulangan, streak, skor.

## Batasan

- Login hanya gerbang tampilan; tidak ada verifikasi identitas.
- Progres tidak tersinkron antarperangkat.
- Text-to-Speech bergantung pada suara Arab yang terpasang di perangkat.
- Foto latar disimpan sebagai data URL yang sudah dikompres; kuota LocalStorage terbatas.
