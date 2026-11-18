export const pct = (value, total) =>
  total > 0 ? Math.round((value / total) * 100) : 0;

export const scoreCategory = (value) => {
  if (value >= 90) return { title: 'Luar biasa', sub: 'Penguasaanmu sangat baik. Pertahankan!', stars: 5 };
  if (value >= 75) return { title: 'Bagus sekali', sub: 'Sedikit lagi menuju sempurna.', stars: 4 };
  if (value >= 60) return { title: 'Cukup baik', sub: 'Ulangi materi yang masih keliru.', stars: 3 };
  if (value >= 40) return { title: 'Perlu latihan', sub: 'Jangan menyerah, coba sekali lagi.', stars: 2 };
  return { title: 'Ayo semangat', sub: 'Baca ulang mufradat lalu ulangi kuis.', stars: 1 };
};

export const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const sample = (list, count) => shuffle(list).slice(0, count);
