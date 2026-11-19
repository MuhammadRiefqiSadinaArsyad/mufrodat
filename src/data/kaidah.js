const JENIS = ['Isim (kata benda)', 'Fi‘il (kata kerja)', 'Harf (kata tugas)'];
const JUMLAH = ['Jumlah ismiyyah', 'Jumlah fi‘liyyah'];
const GENDER = ['Mudzakkar', 'Muannats'];
const BILANGAN = ['Mufrad', 'Mutsanna', 'Jamak'];
const BENTUK = ['Fi‘il madhi', 'Fi‘il mudhari‘', 'Fi‘il amr'];

export const KAIDAH = [
  { ar: 'الْكِتَابُ', ask: 'Jenis kata', options: JENIS, answer: 0, note: 'الْكِتَابُ adalah isim karena menunjukkan benda “buku”.' },
  { ar: 'يَكْتُبُ', ask: 'Jenis kata', options: JENIS, answer: 1, note: 'يَكْتُبُ adalah fi‘il karena menunjukkan pekerjaan “menulis”.' },
  { ar: 'مِنْ', ask: 'Jenis kata', options: JENIS, answer: 2, note: 'مِنْ adalah harf, kata tugas yang tidak berubah bentuk.' },
  { ar: 'الْمَدْرَسَةُ', ask: 'Jenis kata', options: JENIS, answer: 0, note: 'الْمَدْرَسَةُ adalah isim yang berarti “sekolah”.' },
  { ar: 'ذَهَبَ', ask: 'Jenis kata', options: JENIS, answer: 1, note: 'ذَهَبَ adalah fi‘il madhi yang berarti “telah pergi”.' },
  { ar: 'فِي', ask: 'Jenis kata', options: JENIS, answer: 2, note: 'فِي adalah harf jar yang berarti “di” atau “di dalam”.' },
  { ar: 'الطَّالِبُ يَقْرَأُ', ask: 'Susunan kalimat', options: JUMLAH, answer: 0, note: 'Jumlah ismiyyah diawali isim; di sini الطَّالِبُ menjadi mubtada’.' },
  { ar: 'يَقْرَأُ الطَّالِبُ', ask: 'Susunan kalimat', options: JUMLAH, answer: 1, note: 'Kalimat diawali fi‘il يَقْرَأُ, jadi jumlah fi‘liyyah.' },
  { ar: 'مُحَمَّدٌ مُجْتَهِدٌ', ask: 'Susunan kalimat', options: JUMLAH, answer: 0, note: 'Susunan ini diawali isim مُحَمَّدٌ, jadi jumlah ismiyyah.' },
  { ar: 'كَتَبَ أَحْمَدُ الدَّرْسَ', ask: 'Susunan kalimat', options: JUMLAH, answer: 1, note: 'Kalimat diawali fi‘il كَتَبَ, jadi jumlah fi‘liyyah.' },
  { ar: 'مَدْرَسَةٌ', ask: 'Jenis kelamin kata', options: GENDER, answer: 1, note: 'Ta’ marbutah pada akhir kata menandai muannats.' },
  { ar: 'كِتَابٌ', ask: 'Jenis kelamin kata', options: GENDER, answer: 0, note: 'كِتَابٌ tidak bertanda muannats, jadi mudzakkar.' },
  { ar: 'هَذِهِ', ask: 'Kata tunjuk untuk', options: GENDER, answer: 1, note: 'هَذِهِ dipakai untuk isim muannats, misalnya هَذِهِ مَدْرَسَةٌ.' },
  { ar: 'هَذَا', ask: 'Kata tunjuk untuk', options: GENDER, answer: 0, note: 'هَذَا dipakai untuk isim mudzakkar, misalnya هَذَا كِتَابٌ.' },
  { ar: 'كِتَابَانِ', ask: 'Jumlah benda', options: BILANGAN, answer: 1, note: 'Akhiran ـَانِ menandai mutsanna, yaitu dua benda.' },
  { ar: 'كُتُبٌ', ask: 'Jumlah benda', options: BILANGAN, answer: 2, note: 'كُتُبٌ adalah jamak dari كِتَابٌ, berarti banyak buku.' },
  { ar: 'قَلَمٌ', ask: 'Jumlah benda', options: BILANGAN, answer: 0, note: 'قَلَمٌ menunjukkan satu pena, jadi mufrad.' },
  { ar: 'يَكْتُبُ', ask: 'Bentuk fi‘il', options: BENTUK, answer: 1, note: 'يَكْتُبُ adalah fi‘il mudhari‘, pekerjaan yang sedang berlangsung.' },
  { ar: 'كَتَبَ', ask: 'Bentuk fi‘il', options: BENTUK, answer: 0, note: 'كَتَبَ adalah fi‘il madhi, pekerjaan yang sudah selesai.' },
  { ar: 'اُكْتُبْ', ask: 'Bentuk fi‘il', options: BENTUK, answer: 2, note: 'اُكْتُبْ adalah fi‘il amr, perintah “tulislah”.' }
];
