import sentences from './sentences.json';

const nm = (n) => String(n);

const X = [
  ...[
    ['أَحَدَ عَشَرَ', 'ahada ’asyara', 'sebelas', 11],
    ['اِثْنَا عَشَرَ', 'itsna ’asyara', 'dua belas', 12],
    ['ثَلَاثَةَ عَشَرَ', 'tsalatsata ’asyara', 'tiga belas', 13],
    ['أَرْبَعَةَ عَشَرَ', 'arba’ata ’asyara', 'empat belas', 14],
    ['خَمْسَةَ عَشَرَ', 'khamsata ’asyara', 'lima belas', 15],
    ['سِتَّةَ عَشَرَ', 'sittata ’asyara', 'enam belas', 16],
    ['سَبْعَةَ عَشَرَ', 'sab’ata ’asyara', 'tujuh belas', 17],
    ['ثَمَانِيَةَ عَشَرَ', 'tsamaniyata ’asyara', 'delapan belas', 18],
    ['تِسْعَةَ عَشَرَ', 'tis’ata ’asyara', 'sembilan belas', 19],
    ['عِشْرُونَ', '’isyrun', 'dua puluh', 20],
    ['ثَلَاثُونَ', 'tsalatsun', 'tiga puluh', 30],
    ['أَرْبَعُونَ', 'arba’un', 'empat puluh', 40],
    ['خَمْسُونَ', 'khamsun', 'lima puluh', 50],
    ['سِتُّونَ', 'sittun', 'enam puluh', 60],
    ['سَبْعُونَ', 'sab’un', 'tujuh puluh', 70],
    ['ثَمَانُونَ', 'tsamanun', 'delapan puluh', 80],
    ['تِسْعُونَ', 'tis’un', 'sembilan puluh', 90],
    ['مِائَةٌ', 'mi’ah', 'seratus', 100],
    ['أَلْفٌ', 'alf', 'seribu', 1000],
    ['صِفْرٌ', 'shifr', 'nol', 0]
  ].map((a) => [a[0], a[1], a[2] + ' (' + a[3] + ')', nm(a[3]), 'Angka']),
  ['عَمَّةٌ', '’ammah', 'bibi (dari ayah)', '', 'Keluarga', 'f'],
  ['خَالَةٌ', 'khalah', 'bibi (dari ibu)', '', 'Keluarga', 'f'],
  ['أُسْرَةٌ', 'usrah', 'keluarga', '', 'Keluarga', 'f'],
  ['صَدِيقٌ', 'shadiq', 'teman', '', 'Keluarga', 'm'],
  ['جَارٌ', 'jar', 'tetangga', '', 'Keluarga', 'm'],
  ['ضَيْفٌ', 'dhaif', 'tamu', '', 'Keluarga', 'm'],
  ['طِفْلٌ', 'thifl', 'anak kecil', '', 'Keluarga', 'm'],
  ['مِسْطَرَةٌ', 'mistharah', 'penggaris', '', 'Sekolah', 'f'],
  ['مِمْحَاةٌ', 'mimhah', 'penghapus', '', 'Sekolah', 'f'],
  ['دَفْتَرٌ', 'daftar', 'buku tulis', '', 'Sekolah', 'm'],
  ['مَكْتَبَةٌ', 'maktabah', 'perpustakaan', '', 'Sekolah', 'f'],
  ['فَصْلٌ', 'fashl', 'kelas', '', 'Sekolah', 'm'],
  ['مِقَصٌّ', 'miqashsh', 'gunting', '', 'Sekolah', 'm'],
  ['سَاعَةٌ', 'sa’ah', 'jam', '', 'Sekolah', 'f'],
  ['دَرْسٌ', 'dars', 'pelajaran', '', 'Sekolah', 'm'],
  ['بُنِّيٌّ', 'bunni', 'cokelat', '', 'Warna'],
  ['رَمَادِيٌّ', 'ramadi', 'abu-abu', '', 'Warna'],
  ['وَرْدِيٌّ', 'wardi', 'merah muda', '', 'Warna'],
  ['ذَهَبِيٌّ', 'dzahabi', 'emas', '', 'Warna'],
  ['وَجْهٌ', 'wajh', 'wajah', '', 'Tubuh', 'm'],
  ['شَعْرٌ', 'sya’r', 'rambut', '', 'Tubuh', 'm'],
  ['رَقَبَةٌ', 'raqabah', 'leher', '', 'Tubuh', 'f'],
  ['بَطْنٌ', 'bathn', 'perut', '', 'Tubuh', 'm'],
  ['قَلْبٌ', 'qalb', 'hati', '', 'Tubuh', 'm'],
  ['إِصْبَعٌ', 'ishba’', 'jari', '', 'Tubuh', 'm'],
  ['كَتِفٌ', 'katif', 'bahu', '', 'Tubuh', 'f'],
  ['سَرِيرٌ', 'sarir', 'tempat tidur', '', 'Rumah', 'm'],
  ['كُرْسِيٌّ', 'kursi', 'kursi', '', 'Rumah', 'm'],
  ['طَاوِلَةٌ', 'thawilah', 'meja makan', '', 'Rumah', 'f'],
  ['حَمَّامٌ', 'hammam', 'kamar mandi', '', 'Rumah', 'm'],
  ['مِصْبَاحٌ', 'mishbah', 'lampu', '', 'Rumah', 'm'],
  ['تِلْفَازٌ', 'tilfaz', 'televisi', '', 'Rumah', 'm'],
  ['هَاتِفٌ', 'hatif', 'telepon', '', 'Rumah', 'm'],
  ['مِرْآةٌ', 'mir’ah', 'cermin', '', 'Rumah', 'f'],
  ['فِيلٌ', 'fil', 'gajah', '', 'Hewan', 'm'],
  ['أَرْنَبٌ', 'arnab', 'kelinci', '', 'Hewan', 'm'],
  ['دَجَاجَةٌ', 'dajajah', 'ayam', '', 'Hewan', 'f'],
  ['خَرُوفٌ', 'kharuf', 'domba', '', 'Hewan', 'm'],
  ['فَرَاشَةٌ', 'farasyah', 'kupu-kupu', '', 'Hewan', 'f'],
  ['ثَعْبَانٌ', 'tsu’ban', 'ular', '', 'Hewan', 'm'],
  ['قِرْدٌ', 'qird', 'monyet', '', 'Hewan', 'm'],
  ['نَحْلَةٌ', 'nahlah', 'lebah', '', 'Hewan', 'f'],
  ['خُبْزٌ', 'khubz', 'roti', '', 'Makanan', 'm'],
  ['مَاءٌ', 'ma’', 'air', '', 'Makanan', 'm'],
  ['حَلِيبٌ', 'halib', 'susu', '', 'Makanan', 'm'],
  ['تُفَّاحَةٌ', 'tuffahah', 'apel', '', 'Makanan', 'f'],
  ['مَوْزٌ', 'mauz', 'pisang', '', 'Makanan', 'm'],
  ['أَرُزٌّ', 'aruzz', 'nasi', '', 'Makanan', 'm'],
  ['بَيْضَةٌ', 'baidhah', 'telur', '', 'Makanan', 'f'],
  ['شَايٌ', 'syay', 'teh', '', 'Makanan', 'm'],
  ['شَمْسٌ', 'syams', 'matahari', '', 'Alam', 'f'],
  ['قَمَرٌ', 'qamar', 'bulan', '', 'Alam', 'm'],
  ['نَجْمٌ', 'najm', 'bintang', '', 'Alam', 'm'],
  ['بَحْرٌ', 'bahr', 'laut', '', 'Alam', 'm'],
  ['جَبَلٌ', 'jabal', 'gunung', '', 'Alam', 'm'],
  ['مَطَرٌ', 'mathar', 'hujan', '', 'Alam', 'm'],
  ['سَحَابٌ', 'sahab', 'awan', '', 'Alam', 'm'],
  ['زَهْرَةٌ', 'zahrah', 'bunga', '', 'Alam', 'f'],
  ['كَتَبَ', 'kataba', 'menulis', '', 'Kata Kerja'],
  ['قَرَأَ', 'qara’a', 'membaca', '', 'Kata Kerja'],
  ['ذَهَبَ', 'dzahaba', 'pergi', '', 'Kata Kerja'],
  ['أَكَلَ', 'akala', 'makan', '', 'Kata Kerja'],
  ['شَرِبَ', 'syariba', 'minum', '', 'Kata Kerja'],
  ['نَامَ', 'nama', 'tidur', '', 'Kata Kerja'],
  ['فَتَحَ', 'fataha', 'membuka', '', 'Kata Kerja'],
  ['لَعِبَ', 'la’iba', 'bermain', '', 'Kata Kerja']
];

const NU = [
  ['وَاحِدٌ', 'wahid', 'satu'],
  ['اِثْنَانِ', 'itsnan', 'dua'],
  ['ثَلَاثَةٌ', 'tsalatsah', 'tiga'],
  ['أَرْبَعَةٌ', 'arba’ah', 'empat'],
  ['خَمْسَةٌ', 'khamsah', 'lima'],
  ['سِتَّةٌ', 'sittah', 'enam'],
  ['سَبْعَةٌ', 'sab’ah', 'tujuh'],
  ['ثَمَانِيَةٌ', 'tsamaniyah', 'delapan'],
  ['تِسْعَةٌ', 'tis’ah', 'sembilan']
];

const NT = [
  ['عِشْرُونَ', '’isyrun', 'dua puluh'],
  ['ثَلَاثُونَ', 'tsalatsun', 'tiga puluh'],
  ['أَرْبَعُونَ', 'arba’un', 'empat puluh'],
  ['خَمْسُونَ', 'khamsun', 'lima puluh'],
  ['سِتُّونَ', 'sittun', 'enam puluh'],
  ['سَبْعُونَ', 'sab’un', 'tujuh puluh'],
  ['ثَمَانُونَ', 'tsamanun', 'delapan puluh'],
  ['تِسْعُونَ', 'tis’un', 'sembilan puluh']
];

const GEN = [];
NT.forEach((t, i) => {
  NU.forEach((u, j) => {
    const n = (i + 2) * 10 + j + 1;
    GEN.push([u[0] + ' وَ' + t[0], u[1] + ' wa ' + t[1], t[2] + ' ' + u[2] + ' (' + n + ')', nm(n), 'Angka', undefined, 1]);
  });
});

const T = (theme, arr) => arr.map((x) => [x[0], x[1], x[2], '', theme, x[4]]);

const NEW = [
  ...T('Keluarga', [
    ['عَمٌّ', '’amm', 'paman (dari ayah)', '', 'm'],
    ['خَالٌ', 'khal', 'paman (dari ibu)', '', 'm'],
    ['زَوْجٌ', 'zauj', 'suami', '', 'm'],
    ['زَوْجَةٌ', 'zaujah', 'istri', '', 'f'],
    ['وَالِدَانِ', 'walidan', 'orang tua', '', 'm'],
    ['صَدِيقَةٌ', 'shadiqah', 'teman perempuan', '', 'f'],
    ['قَرِيبٌ', 'qarib', 'kerabat', '', 'm'],
    ['وَلَدٌ', 'walad', 'anak (laki-laki)', '', 'm'],
    ['رَجُلٌ', 'rajul', 'laki-laki dewasa', '', 'm'],
    ['اِمْرَأَةٌ', 'imra’ah', 'perempuan dewasa', '', 'f'],
    ['شَابٌّ', 'syabb', 'pemuda', '', 'm'],
    ['عَجُوزٌ', '’ajuz', 'lansia', '', 'm'],
    ['مُسْلِمٌ', 'muslim', 'muslim', '', 'm'],
    ['مُسْلِمَةٌ', 'muslimah', 'muslimah', '', 'f'],
    ['عَرُوسٌ', '’arus', 'pengantin', '', 'm']
  ]),
  ...T('Sekolah', [
    ['مُدِيرٌ', 'mudir', 'kepala sekolah', '', 'm'],
    ['جَامِعَةٌ', 'jami’ah', 'universitas', '', 'f'],
    ['اِمْتِحَانٌ', 'imtihan', 'ujian', '', 'm'],
    ['وَاجِبٌ', 'wajib', 'tugas (PR)', '', 'm'],
    ['قَامُوسٌ', 'qamus', 'kamus', '', 'm'],
    ['خَرِيطَةٌ', 'kharithah', 'peta', '', 'f'],
    ['مُخْتَبَرٌ', 'mukhtabar', 'laboratorium', '', 'm'],
    ['مَلْعَبٌ', 'mal’ab', 'lapangan', '', 'm'],
    ['جَرَسٌ', 'jaras', 'bel', '', 'm'],
    ['شَهَادَةٌ', 'syahadah', 'ijazah', '', 'f'],
    ['مِحْفَظَةٌ', 'mihfazhah', 'dompet', '', 'f'],
    ['سُؤَالٌ', 'su’al', 'pertanyaan', '', 'm']
  ]),
  ...T('Warna', [
    ['فِضِّيٌّ', 'fidhdhi', 'perak', ''],
    ['سَمَاوِيٌّ', 'sama’i', 'biru langit', ''],
    ['كُحْلِيٌّ', 'kuhli', 'biru tua', ''],
    ['أَرْجُوَانِيٌّ', 'arjuwani', 'ungu tua', ''],
    ['قِرْمِزِيٌّ', 'qirmizi', 'merah tua', ''],
    ['لَوْنٌ', 'lawn', 'warna', '', 'm'],
    ['أَلْوَانٌ', 'alwan', 'warna-warna', '', 'm'],
    ['فَاتِحٌ', 'fatih', 'muda, terang', ''],
    ['دَاكِنٌ', 'dakin', 'tua, gelap', ''],
    ['مُلَوَّنٌ', 'mulawwan', 'berwarna', ''],
    ['لَامِعٌ', 'lami’', 'berkilau', ''],
    ['شَفَّافٌ', 'syaffaf', 'bening', ''],
    ['فُرْشَاةٌ', 'fursyah', 'kuas', '', 'f'],
    ['رَسْمٌ', 'rasm', 'gambar', '', 'm'],
    ['طِلَاءٌ', 'thila’', 'cat', '', 'm'],
    ['قَوْسُ قُزَحٍ', 'qausu quzah', 'pelangi', '', 'm'],
    ['بِيجٌ', 'bij', 'krem', ''],
    ['زَيْتُونِيٌّ', 'zaituni', 'hijau zaitun', '']
  ]),
  ...T('Tubuh', [
    ['ظَهْرٌ', 'zhahr', 'punggung', '', 'm'],
    ['صَدْرٌ', 'shadr', 'dada', '', 'm'],
    ['رُكْبَةٌ', 'rukbah', 'lutut', '', 'f'],
    ['ذِرَاعٌ', 'dzira’', 'lengan', '', 'f'],
    ['لِسَانٌ', 'lisan', 'lidah', '', 'm'],
    ['حَاجِبٌ', 'hajib', 'alis', '', 'm'],
    ['جَبْهَةٌ', 'jabhah', 'dahi', '', 'f'],
    ['خَدٌّ', 'khadd', 'pipi', '', 'm'],
    ['ظُفْرٌ', 'zhufr', 'kuku', '', 'm'],
    ['عَظْمٌ', '’azhm', 'tulang', '', 'm'],
    ['دَمٌ', 'dam', 'darah', '', 'm'],
    ['جِلْدٌ', 'jild', 'kulit', '', 'm'],
    ['دِمَاغٌ', 'dimagh', 'otak', '', 'm'],
    ['قَدَمٌ', 'qadam', 'telapak kaki', '', 'f'],
    ['شَفَةٌ', 'syafah', 'bibir', '', 'f']
  ]),
  ...T('Rumah', [
    ['سَقْفٌ', 'saqf', 'atap', '', 'm'],
    ['جِدَارٌ', 'jidar', 'dinding', '', 'm'],
    ['مِرْوَحَةٌ', 'mirwahah', 'kipas', '', 'f'],
    ['سُلَّمٌ', 'sullam', 'tangga', '', 'm'],
    ['مِكْنَسَةٌ', 'miknasah', 'sapu', '', 'f'],
    ['صَحْنٌ', 'shahn', 'piring', '', 'm'],
    ['كُوبٌ', 'kub', 'gelas', '', 'm'],
    ['مِلْعَقَةٌ', 'mil’aqah', 'sendok', '', 'f'],
    ['سِكِّينٌ', 'sikkin', 'pisau', '', 'm'],
    ['ثَلَّاجَةٌ', 'tsallajah', 'kulkas', '', 'f'],
    ['غَسَّالَةٌ', 'ghassalah', 'mesin cuci', '', 'f'],
    ['مِظَلَّةٌ', 'mizhallah', 'payung', '', 'f'],
    ['شُرْفَةٌ', 'syurfah', 'balkon', '', 'f'],
    ['لُعْبَةٌ', 'lu’bah', 'mainan', '', 'f']
  ]),
  ...T('Hewan', [
    ['ذِئْبٌ', 'dzi’b', 'serigala', '', 'm'],
    ['نَمِرٌ', 'namir', 'harimau', '', 'm'],
    ['دُبٌّ', 'dubb', 'beruang', '', 'm'],
    ['زَرَافَةٌ', 'zarafah', 'jerapah', '', 'f'],
    ['بَطَّةٌ', 'baththah', 'bebek', '', 'f'],
    ['حَمَامَةٌ', 'hamamah', 'merpati', '', 'f'],
    ['فَأْرٌ', 'fa’r', 'tikus', '', 'm'],
    ['ضِفْدَعٌ', 'dhifda’', 'katak', '', 'm'],
    ['سُلْحُفَاةٌ', 'sulhufah', 'kura-kura', '', 'f'],
    ['حُوتٌ', 'hut', 'paus', '', 'm'],
    ['نَسْرٌ', 'nasr', 'elang', '', 'm'],
    ['نَمْلَةٌ', 'namlah', 'semut', '', 'f'],
    ['عَقْرَبٌ', '’aqrab', 'kalajengking', '', 'm'],
    ['بُومَةٌ', 'bumah', 'burung hantu', '', 'f']
  ]),
  ...T('Makanan', [
    ['لَحْمٌ', 'lahm', 'daging', '', 'm'],
    ['جُبْنٌ', 'jubn', 'keju', '', 'm'],
    ['عَصِيرٌ', '’ashir', 'jus', '', 'm'],
    ['قَهْوَةٌ', 'qahwah', 'kopi', '', 'f'],
    ['سُكَّرٌ', 'sukkar', 'gula', '', 'm'],
    ['مِلْحٌ', 'milh', 'garam', '', 'm'],
    ['زُبْدَةٌ', 'zubdah', 'mentega', '', 'f'],
    ['عَسَلٌ', '’asal', 'madu', '', 'm'],
    ['تَمْرٌ', 'tamr', 'kurma', '', 'm'],
    ['بُرْتُقَالٌ', 'burtuqal', 'jeruk', '', 'm'],
    ['عِنَبٌ', '’inab', 'anggur', '', 'm'],
    ['فَرَاوِلَةٌ', 'farawilah', 'stroberi', '', 'f'],
    ['بَطِّيخٌ', 'bathikh', 'semangka', '', 'm'],
    ['جَزَرٌ', 'jazar', 'wortel', '', 'm'],
    ['طَمَاطِمُ', 'thamathim', 'tomat', '', 'm'],
    ['بَطَاطِسُ', 'bathathis', 'kentang', '', 'm'],
    ['دَجَاجٌ', 'dajaj', 'daging ayam', '', 'm'],
    ['حَلْوَى', 'halwa', 'kue', '', 'f'],
    ['شُورْبَةٌ', 'syurbah', 'sup', '', 'f'],
    ['سَلَطَةٌ', 'salathah', 'salad', '', 'f'],
    ['فَطُورٌ', 'futhur', 'sarapan', '', 'm'],
    ['غَدَاءٌ', 'ghada’', 'makan siang', '', 'm']
  ]),
  ...T('Alam', [
    ['سَمَاءٌ', 'sama’', 'langit', '', 'f'],
    ['أَرْضٌ', 'ardh', 'bumi', '', 'f'],
    ['نَهْرٌ', 'nahr', 'sungai', '', 'm'],
    ['بُحَيْرَةٌ', 'buhairah', 'danau', '', 'f'],
    ['صَحْرَاءُ', 'shahra’', 'gurun', '', 'f'],
    ['غَابَةٌ', 'ghabah', 'hutan', '', 'f'],
    ['شَاطِئٌ', 'syathi’', 'pantai', '', 'm'],
    ['جَزِيرَةٌ', 'jazirah', 'pulau', '', 'f'],
    ['رِيحٌ', 'rih', 'angin', '', 'f'],
    ['ثَلْجٌ', 'tsalj', 'salju', '', 'm'],
    ['نَارٌ', 'nar', 'api', '', 'f'],
    ['تُرَابٌ', 'turab', 'tanah', '', 'm'],
    ['حَجَرٌ', 'hajar', 'batu', '', 'm'],
    ['رَمْلٌ', 'raml', 'pasir', '', 'm'],
    ['بَرْقٌ', 'barq', 'kilat', '', 'm'],
    ['رَعْدٌ', 'ra’d', 'guntur', '', 'm'],
    ['عَاصِفَةٌ', '’ashifah', 'badai', '', 'f'],
    ['هَوَاءٌ', 'hawa’', 'udara', '', 'm'],
    ['وَرَقَةٌ', 'waraqah', 'daun', '', 'f'],
    ['عُشْبٌ', '’usyb', 'rumput', '', 'm'],
    ['صَخْرَةٌ', 'shakhrah', 'batu besar', '', 'f'],
    ['كَوْكَبٌ', 'kaukab', 'planet', '', 'm']
  ]),
  ...T('Kata Kerja', [
    ['جَلَسَ', 'jalasa', 'duduk', ''],
    ['وَقَفَ', 'waqafa', 'berdiri', ''],
    ['رَكَضَ', 'rakadha', 'berlari', ''],
    ['سَمِعَ', 'sami’a', 'mendengar', ''],
    ['نَظَرَ', 'nazhara', 'melihat', ''],
    ['تَكَلَّمَ', 'takallama', 'berbicara', ''],
    ['دَرَسَ', 'darasa', 'belajar', ''],
    ['عَلَّمَ', '’allama', 'mengajar', ''],
    ['فَهِمَ', 'fahima', 'memahami', ''],
    ['رَجَعَ', 'raja’a', 'kembali', ''],
    ['جَاءَ', 'ja’a', 'datang', ''],
    ['خَرَجَ', 'kharaja', 'keluar', ''],
    ['دَخَلَ', 'dakhala', 'masuk', ''],
    ['أَخَذَ', 'akhadza', 'mengambil', ''],
    ['أَعْطَى', 'a’tha', 'memberi', ''],
    ['رَسَمَ', 'rasama', 'menggambar', ''],
    ['غَسَلَ', 'ghasala', 'mencuci', ''],
    ['طَبَخَ', 'thabakha', 'memasak', ''],
    ['اِشْتَرَى', 'isytara', 'membeli', ''],
    ['بَاعَ', 'ba’a', 'menjual', ''],
    ['سَافَرَ', 'safara', 'bepergian', ''],
    ['صَلَّى', 'shalla', 'salat', '']
  ])
];

const W1 = [
  ['أَبٌ', 'ab', 'ayah', '', 'Keluarga', 'm'],
  ['أُمٌّ', 'umm', 'ibu', '', 'Keluarga', 'f'],
  ['أَخٌ', 'akh', 'saudara laki-laki', '', 'Keluarga', 'm'],
  ['أُخْتٌ', 'ukht', 'saudara perempuan', '', 'Keluarga', 'f'],
  ['جَدٌّ', 'jadd', 'kakek', '', 'Keluarga', 'm'],
  ['جَدَّةٌ', 'jaddah', 'nenek', '', 'Keluarga', 'f'],
  ['اِبْنٌ', 'ibn', 'anak laki-laki', '', 'Keluarga', 'm'],
  ['بِنْتٌ', 'bint', 'anak perempuan', '', 'Keluarga', 'f'],
  ['وَاحِدٌ', 'wahid', 'satu (1)', '1', 'Angka'],
  ['اِثْنَانِ', 'itsnan', 'dua (2)', '2', 'Angka'],
  ['ثَلَاثَةٌ', 'tsalatsah', 'tiga (3)', '3', 'Angka'],
  ['أَرْبَعَةٌ', 'arba’ah', 'empat (4)', '4', 'Angka'],
  ['خَمْسَةٌ', 'khamsah', 'lima (5)', '5', 'Angka'],
  ['سِتَّةٌ', 'sittah', 'enam (6)', '6', 'Angka'],
  ['سَبْعَةٌ', 'sab’ah', 'tujuh (7)', '7', 'Angka'],
  ['ثَمَانِيَةٌ', 'tsamaniyah', 'delapan (8)', '8', 'Angka'],
  ['تِسْعَةٌ', 'tis’ah', 'sembilan (9)', '9', 'Angka'],
  ['عَشَرَةٌ', '’asyarah', 'sepuluh (10)', '10', 'Angka'],
  ['كِتَابٌ', 'kitab', 'buku', '', 'Sekolah', 'm'],
  ['قَلَمٌ', 'qalam', 'pena', '', 'Sekolah', 'm'],
  ['مَدْرَسَةٌ', 'madrasah', 'sekolah', '', 'Sekolah', 'f'],
  ['مُعَلِّمٌ', 'mu’allim', 'guru', '', 'Sekolah', 'm'],
  ['طَالِبٌ', 'thalib', 'siswa', '', 'Sekolah', 'm'],
  ['مَكْتَبٌ', 'maktab', 'meja', '', 'Sekolah', 'm'],
  ['حَقِيبَةٌ', 'haqibah', 'tas', '', 'Sekolah', 'f'],
  ['بَابٌ', 'bab', 'pintu', '', 'Sekolah', 'm'],
  ['مَسْجِدٌ', 'masjid', 'masjid', '', 'Sekolah', 'm'],
  ['سَبُّورَةٌ', 'sabburah', 'papan tulis', '', 'Sekolah', 'f'],
  ['أَحْمَرُ', 'ahmar', 'merah', '', 'Warna'],
  ['أَزْرَقُ', 'azraq', 'biru', '', 'Warna'],
  ['أَخْضَرُ', 'akhdhar', 'hijau', '', 'Warna'],
  ['أَصْفَرُ', 'ashfar', 'kuning', '', 'Warna'],
  ['أَبْيَضُ', 'abyadh', 'putih', '', 'Warna'],
  ['أَسْوَدُ', 'aswad', 'hitam', '', 'Warna'],
  ['بُرْتُقَالِيٌّ', 'burtuqali', 'oranye', '', 'Warna'],
  ['بَنَفْسَجِيٌّ', 'banafsaji', 'ungu', '', 'Warna'],
  ['رَأْسٌ', 'ra’s', 'kepala', '', 'Tubuh', 'm'],
  ['عَيْنٌ', '’ain', 'mata', '', 'Tubuh', 'f'],
  ['أُذُنٌ', 'udzun', 'telinga', '', 'Tubuh', 'f'],
  ['أَنْفٌ', 'anf', 'hidung', '', 'Tubuh', 'm'],
  ['فَمٌ', 'fam', 'mulut', '', 'Tubuh', 'm'],
  ['يَدٌ', 'yad', 'tangan', '', 'Tubuh', 'f'],
  ['رِجْلٌ', 'rijl', 'kaki', '', 'Tubuh', 'f'],
  ['سِنٌّ', 'sinn', 'gigi', '', 'Tubuh', 'f'],
  ['بَيْتٌ', 'bait', 'rumah', '', 'Rumah', 'm'],
  ['غُرْفَةٌ', 'ghurfah', 'kamar', '', 'Rumah', 'f'],
  ['مَطْبَخٌ', 'mathbakh', 'dapur', '', 'Rumah', 'm'],
  ['نَافِذَةٌ', 'nafidzah', 'jendela', '', 'Rumah', 'f'],
  ['سَيَّارَةٌ', 'sayyarah', 'mobil', '', 'Rumah', 'f'],
  ['شَجَرَةٌ', 'syajarah', 'pohon', '', 'Rumah', 'f'],
  ['حَدِيقَةٌ', 'hadiqah', 'kebun', '', 'Rumah', 'f'],
  ['مِفْتَاحٌ', 'miftah', 'kunci', '', 'Rumah', 'm'],
  ['قِطَّةٌ', 'qitthah', 'kucing', '', 'Hewan', 'f'],
  ['كَلْبٌ', 'kalb', 'anjing', '', 'Hewan', 'm'],
  ['جَمَلٌ', 'jamal', 'unta', '', 'Hewan', 'm'],
  ['حِصَانٌ', 'hishan', 'kuda', '', 'Hewan', 'm'],
  ['بَقَرَةٌ', 'baqarah', 'sapi', '', 'Hewan', 'f'],
  ['عُصْفُورٌ', 'ushfur', 'burung', '', 'Hewan', 'm'],
  ['سَمَكَةٌ', 'samakah', 'ikan', '', 'Hewan', 'f'],
  ['أَسَدٌ', 'asad', 'singa', '', 'Hewan', 'm']
]
  .concat(X, GEN, NEW)
  .map((a) => ({
    ar: a[0],
    tr: a[1],
    id: a[2],
    em: a[3],
    t: a[4],
    g: a[5],
    c: a[6],
    k: Number((/\((\d+)\)/.exec(a[2]) || [0, 0])[1])
  }));

export const W = [
  ...W1.filter((w) => w.t !== 'Angka'),
  ...W1.filter((w) => w.t === 'Angka' && w.k > 0 && w.k < 101).sort((a, b) => a.k - b.k)
].map((w, idx) => ({ ...w, idx }));

export const P = W.filter((w) => !w.c);

const ADJ = [
  ['جَدِيدٌ', 'جَدِيدَةٌ', 'baru'],
  ['كَبِيرٌ', 'كَبِيرَةٌ', 'besar'],
  ['جَمِيلٌ', 'جَمِيلَةٌ', 'bagus']
];

const generated = [];
W.filter((w) => w.g).forEach((w, i) => {
  const m = w.g === 'm';
  const a = m ? 'هَذَا' : 'هَذِهِ';
  generated.push({ words: [a, w.ar], id: 'Ini ' + w.id });
  generated.push({ words: [m ? 'ذَلِكَ' : 'تِلْكَ', w.ar], id: 'Itu ' + w.id });
  generated.push({ words: ['هَلْ', a, w.ar], id: 'Apakah ini ' + w.id + '?' });
  if (['Sekolah', 'Rumah', 'Hewan', 'Makanan', 'Alam'].includes(w.t)) {
    const d = ADJ[i % 3];
    generated.push({ words: [a, w.ar, m ? d[0] : d[1]], id: 'Ini ' + w.id + ' ' + d[2] });
  }
});

export const S = [...sentences.base, ...generated];
export const EXPLANATIONS = sentences.explanations;

export const findWord = (ar) => W.find((w) => w.ar === ar);
export const wordsByTheme = (theme) => W.filter((w) => w.t === theme);
export const wordOfDay = () => P[Math.floor(Date.now() / 864e5) % P.length];
