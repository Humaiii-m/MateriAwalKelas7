import { TopicMaterial } from '../types';

export const TOPIC_MATERIALS: TopicMaterial[] = [
  {
    id: 'perangkat-komputer',
    title: 'Perangkat Komputer',
    subtitle: 'Mengenal perangkat keras (hardware) dan perangkat lunak (software) komputer serta cara kerjanya.',
    category: 'Sistem Komputer',
    icon: 'Cpu',
    color: 'from-[#7D8F69] to-[#5E6F4B]',
    bannerColor: 'bg-[#F2F6EE] border-[#D6E2CE] text-[#3D4D2F]',
    badge: 'Hardware & Software',
    estimatedTime: '20 Menit',
    objectives: [
      'Memahami 4 siklus kerja komputer: Input, Process, Output, dan Storage.',
      'Mengidentifikasi dan mengelompokkan ragam perangkat keras (hardware).',
      'Mengenal jenis perangkat lunak (software): Sistem Operasi dan Aplikasi.',
      'Mampu melakukan manajemen file dan folder komputer secara rapi.'
    ],
    sections: [
      {
        id: 'konsep-dasar',
        title: '1. Apa itu Komputer & Bagaimana Cara Kerjanya?',
        iconName: 'Laptop',
        summary: 'Komputer adalah alat elektronik pengolah data menjadi informasi bermanfaat melalui alur pemrosesan terstruktur.',
        contentPoints: [
          'Input (Masukan): Data atau instruksi dimasukkan pengguna melalui perangkat masukan.',
          'Processing (Pemrosesan): Data diolah oleh Processor (CPU) sesuai instruksi program.',
          'Storage (Penyimpanan): Hasil olahan disimpan di memori sementara (RAM) atau permanen (SSD/HDD).',
          'Output (Keluaran): Informasi hasil olahan disajikan kepada pengguna melalui monitor, speaker, atau printer.'
        ],
        keyHighlight: 'Prinsip kerja komputer: Input ➔ Proses (CPU/RAM) ➔ Output / Storage.',
        exampleCase: {
          title: 'Contoh Nyata Saat Mengetik Tugas',
          scenario: 'Ketika kamu menekan tombol huruf di keyboard (Input), processor mengolah sinyal teks (Process), teks muncul seketika di layar (Output), lalu kamu menekan Ctrl+S untuk menyimpannya ke flashdisk/SSD (Storage).',
          takeaway: 'Setiap aksi komputasi selalu melibatkan kombinasi perangkat input, proses, output, dan penyimpanan.'
        }
      },
      {
        id: 'hardware-komputer',
        title: '2. Perangkat Keras (Hardware)',
        iconName: 'HardDrive',
        summary: 'Hardware adalah semua komponen fisik komputer yang dapat dilihat, disentuh, dan dipindahkan.',
        contentPoints: [
          'Perangkat Input: Keyboard (mengetik), Mouse (navigasi kursor), Mikrofon (suara), Webcam (video), dan Scanner (pindai dokumen).',
          'Perangkat Pemroses (Processing): CPU / Processor (otak utama komputer), Motherboard (papan sirkuit penghubung), RAM (memori kerja sementara berkecepatan tinggi), VGA/GPU (pengolah grafis/visual).',
          'Perangkat Penyimpanan (Storage): SSD (solid-state drive, cepat dan tahan guncangan), HDD (hard disk drive, kapasitas besar), Flashdisk, dan MicroSD.',
          'Perangkat Output: Monitor (tampilan visual), Printer (cetak dokumen fisik), Speaker/Headset (keluaran audio), dan Proyektor.'
        ],
        keyHighlight: 'RAM menyimpan data saat komputer menyala saja (volatile), sedangkan SSD/HDD menyimpan data secara permanen meskipun komputer dimatikan.',
        exampleCase: {
          title: 'Memilih Media Penyimpanan',
          scenario: 'Laptop modern saat ini beralih dari Hard Disk (HDD) ke SSD. Mengapa? Karena SSD tidak memiliki piringan berputar sehingga booting Windows hanya butuh 10 detik dibandingkan HDD yang butuh 1-2 menit.',
          takeaway: 'Kecepatan baca-tulis media penyimpanan sangat menentukan performa responsivitas komputer.'
        }
      },
      {
        id: 'software-komputer',
        title: '3. Perangkat Lunak (Software)',
        iconName: 'Layers',
        summary: 'Software adalah sekumpulan instruksi, program, atau data elektronik yang menjalankan perangkat keras.',
        contentPoints: [
          'Sistem Operasi (OS): Jembatan utama antara pengguna dan hardware. Contoh: Microsoft Windows, Linux (Ubuntu, Debian), Apple macOS, Android, dan iOS.',
          'Software Aplikasi (Application): Program untuk tugas spesifik pengguna. Contoh: Pengolah Kata (Word/Google Docs), Pengolah Angka (Excel), Web Browser (Chrome, Firefox), Editor Grafis (Canva, Photoshop).',
          'Software Utility (Alat Bantu): Program pendukung perawatan sistem, seperti Antivirus (Windows Defender), Pengarsip (WinRAR/7-Zip), dan Disk Cleaner.'
        ],
        keyHighlight: 'Hardware tanpa Sistem Operasi (OS) hanyalah sekumpulan logam dan sirkuit mati yang tidak dapat digunakan sama sekali.'
      },
      {
        id: 'manajemen-file',
        title: '4. Manajemen File dan Folder',
        iconName: 'FolderTree',
        summary: 'Menyusun berkas digital dengan hierarki yang jelas memudahkan pencarian tugas sekolah.',
        contentPoints: [
          'Gunakan Struktur Folder Berjenjang: Contoh "Tugas SMP" ➔ "Kelas 8" ➔ "Informatika" ➔ "Bab 1".',
          'Pemberian Nama File yang Konsisten: Format yang disarankan: [NamaTugas]_[Materi]_[NamaSiswa]. Contoh: "Tugas1_Hardware_Aisyah.docx".',
          'Pahami Ekstensi File: Dokumen (.docx, .pdf), Gambar (.png, .jpg), Presentasi (.pptx), Arsip (.zip).'
        ],
        keyHighlight: 'Jangan menyimpan semua file tugas di folder "Downloads" atau "Desktop" agar tidak hilang atau tertimpa secara tidak sengaja.'
      }
    ],
    practiceTasks: [
      {
        id: 'task-hw-sw-sort',
        title: 'Aktivitas 1: Klasifikasi Hardware & Software',
        description: 'Kelompokkan benda-benda digital berikut ke dalam kategori yang tepat: Hardware (Input, Output, Processing, Storage) atau Software (OS, Aplikasi).',
        steps: [
          'Buka komputer atau catat di buku tugas.',
          'Tentukan kategori untuk: Mouse, Windows 11, Processor Core i5, Google Chrome, SSD 512GB, Printer Epson.',
          'Gunakan mini simulasi interaktif di bawah untuk menguji pemahamanmu!'
        ],
        type: 'interactive_sort'
      },
      {
        id: 'task-folder-struct',
        title: 'Aktivitas 2: Praktik Manajemen Folder di Komputer / HP',
        description: 'Buat struktur folder pembelajaran Informatika di komputermu sendiri agar berkas tertata rapi.',
        steps: [
          'Buat folder utama bernama "Belajar_IT_SMP".',
          'Di dalam folder tersebut, buat 3 sub-folder: "01_Perangkat_Komputer", "02_Internet_Jaringan", dan "03_Etika_Digital".',
          'Simpan atau pindahkan dokumen rangkuman tugasmu ke folder yang sesuai.',
          'Centang checklist setelah kamu berhasil membuatnya!'
        ],
        type: 'checklist'
      }
    ],
    questions: [
      {
        id: 'q1-1',
        question: 'Komponen fisik komputer yang bertugas sebagai "otak utama" untuk memproses segala instruksi dan perhitungan adalah...',
        options: ['RAM (Random Access Memory)', 'CPU (Central Processing Unit / Processor)', 'Power Supply', 'Hard Disk Drive'],
        correctIndex: 1,
        explanation: 'CPU (Central Processing Unit) sering disebut sebagai otak komputer karena bertugas mengeksekusi semua instruksi komputasi.'
      },
      {
        id: 'q1-2',
        question: 'Berikut ini yang merupakan contoh perangkat keras masukan (input device) adalah...',
        options: ['Monitor dan Speaker', 'Printer dan Proyektor', 'Keyboard dan Mouse', 'SSD dan Flashdisk'],
        correctIndex: 2,
        explanation: 'Keyboard dan Mouse berfungsi memasukkan data/perintah dari pengguna ke dalam komputer.'
      },
      {
        id: 'q1-3',
        question: 'Apa perbedaan mendasar antara memori RAM dan media penyimpanan SSD/HDD?',
        options: [
          'RAM menyimpan data permanen sedangkan SSD sementara',
          'RAM menyimpan data sementara saat komputer aktif (volatile), sedangkan SSD menyimpan data permanen',
          'RAM hanya digunakan untuk video game, sedangkan SSD untuk dokumen',
          'RAM dan SSD memiliki fungsi yang persis sama tanpa perbedaan'
        ],
        correctIndex: 1,
        explanation: 'RAM bersifat volatile (hilang saat listrik mati) untuk kecepatan proses, sedangkan SSD/HDD bersifat non-volatile (permanen).'
      },
      {
        id: 'q1-4',
        question: 'Manakah di bawah ini yang tergolong sebagai Perangkat Lunak Sistem Operasi (Operating System)?',
        options: ['Microsoft Word dan Excel', 'Google Chrome dan Mozilla Firefox', 'Microsoft Windows 11 dan Linux Ubuntu', 'Adobe Photoshop dan Canva'],
        correctIndex: 2,
        explanation: 'Windows 11 dan Linux Ubuntu adalah Sistem Operasi yang mengelola seluruh sumber daya hardware dan menjadi dasar berjalannya software aplikasi.'
      },
      {
        id: 'q1-5',
        question: 'Di antara format penamaan file tugas sekolah berikut, manakah yang paling rapi dan mudah diidentifikasi oleh guru?',
        options: [
          'tugas_baru_fix_banget_final.docx',
          'Tugas1_Hardware_Aisyah_8A.docx',
          'doc12345.pdf',
          'untitled_document(1).docx'
        ],
        correctIndex: 1,
        explanation: 'Penamaan terstruktur dengan format [NamaTugas]_[Materi]_[NamaSiswa]_[Kelas] memudahkan arsip dan penilaian oleh guru.'
      }
    ]
  },
  {
    id: 'internet-dan-jaringan',
    title: 'Internet dan Jaringan Komputer',
    subtitle: 'Mengenal konsep internet, jaringan komputer, web browser, dan cara mencari informasi secara efektif.',
    category: 'Jaringan & Komunikasi',
    icon: 'Globe',
    color: 'from-[#4A4E69] to-[#34384E]',
    bannerColor: 'bg-[#F0F1F6] border-[#D9DCE8] text-[#2B2D42]',
    badge: 'Jaringan & Web',
    estimatedTime: '20 Menit',
    objectives: [
      'Memahami pengertian jaringan komputer (LAN, MAN, WAN) dan internet.',
      'Membedakan peran antara Web Browser dan Mesin Pencari (Search Engine).',
      'Mengenal anatomi alamat website (URL) dan protokol keamanan HTTPS.',
      'Menguasai teknik pencarian informasi yang cepat, akurat, dan efektif di internet.'
    ],
    sections: [
      {
        id: 'pengertian-jaringan',
        title: '1. Apa itu Jaringan Komputer & Internet?',
        iconName: 'Network',
        summary: 'Jaringan komputer adalah sistem yang menghubungkan dua atau lebih komputer untuk berbagi data, informasi, dan perangkat.',
        contentPoints: [
          'LAN (Local Area Network): Jaringan lokal dengan cakupan sempit, seperti laboratorium komputer sekolah atau satu rumah.',
          'MAN (Metropolitan Area Network): Jaringan yang menghubungkan antar gedung dalam satu kota (misal kantor cabang dinas kota).',
          'WAN (Wide Area Network): Jaringan luas antarkota, antarpulau, atau antarnegara.',
          'Internet (Interconnected Network): Jaringan komputer raksasa di seluruh dunia yang saling terhubung menggunakan protokol standar TCP/IP.'
        ],
        keyHighlight: 'Internet adalah "jaringan dari jaringan-jaringan komputer" di seluruh belahan bumi.'
      },
      {
        id: 'browser-vs-searchengine',
        title: '2. Membedakan Web Browser vs Mesin Pencari (Search Engine)',
        iconName: 'Compass',
        summary: 'Sering dianggap sama oleh pemula, padahal Browser dan Search Engine memiliki peran yang sangat berbeda!',
        contentPoints: [
          'Web Browser: Software / aplikasi di perangkatmu untuk membuka dan membaca halaman web. Contoh: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari.',
          'Search Engine (Mesin Pencari): Layanan website di internet yang membantu kita mencari indeks informasi. Contoh: Google Search, Bing, DuckDuckGo.',
          'Analogi Sederhana: Browser adalah mobil yang kamu kendarai, sedangkan Search Engine adalah peta atau penunjuk arah tempat tujuanmu.'
        ],
        keyHighlight: 'Untuk menggunakan Search Engine seperti Google, kamu harus membukanya terlebih dahulu lewat Web Browser!'
      },
      {
        id: 'anatomi-url',
        title: '3. Membaca Alamat Website (URL) & Keamanan HTTPS',
        iconName: 'ShieldCheck',
        summary: 'URL (Uniform Resource Locator) adalah alamat spesifik suatu halaman di internet.',
        contentPoints: [
          'Protokol (https://): Huruf "s" menandakan "Secure" (terenkripsi gembok aman). Hindari memasukkan password pada website yang hanya "http://".',
          'Nama Domain (www.kemdikbud.go.id): Menunjukkan pemilik atau identitas situs web.',
          'Ekstensi Domain: .go.id (Pemerintah RI), .sch.id / .ac.id (Sekolah / Kampus), .org (Organisasi), .com / .co.id (Komersial).',
          'Path Halaman (/berita/it-smp): Menunjukkan folder atau dokumen spesifik di dalam server.'
        ],
        keyHighlight: 'Domain berakhiran .sch.id dan .go.id adalah domain resmi yang memerlukan izin khusus sehingga informasinya lebih terpercaya.'
      },
      {
        id: 'tips-search-efektif',
        title: '4. Trik Mencari Informasi Efektif di Google',
        iconName: 'Search',
        summary: 'Kuasai kata kunci pintar (search operators) agar tugas sekolah selesai lebih cepat dan akurat.',
        contentPoints: [
          'Gunakan Tanda Kutip ("..."): Mencari frasa persis berurutan. Contoh: "komponen sistem operasi".',
          'Gunakan Operator filetype: Mencari format dokumen langsung. Contoh: materi perangkat keras filetype:pdf.',
          'Gunakan Operator site: Mencari hanya di situs web terpercaya. Contoh: kurikulum merdeka informatika site:kemdikbud.go.id.',
          'Verifikasi Sumber (Cek Fakta): Jangan langsung percaya satu blog pribadi; selalu bandingkan minimal 2-3 sumber referensi kredibel.'
        ],
        keyHighlight: 'Kombinasi kata kunci spesifik menghemat waktumu daripada mengetik kalimat panjang seperti bertanya ke orang.'
      }
    ],
    practiceTasks: [
      {
        id: 'task-search-operators',
        title: 'Aktivitas 1: Simulasi Pencarian Berkas Materi Edukatif',
        description: 'Praktikkan penggunaan operator pencarian canggih untuk menemukan materi resmi pembelajaran.',
        steps: [
          'Buka browser dan buka google.com.',
          'Ketik kata kunci: materi jaringan komputer smp filetype:pdf.',
          'Coba bandingkan hasilnya dengan pencarian biasa tanpa kata filetype:pdf.',
          'Perhatikan perbedaannya pada dokumen materi yang muncul!'
        ],
        type: 'search_sim'
      },
      {
        id: 'task-url-analyzer',
        title: 'Aktivitas 2: Analisis Keamanan Alamat Web (URL)',
        description: 'Periksa URL website yang sering kamu kunjungi.',
        steps: [
          'Buka salah satu situs berita edukasi atau portal sekolah.',
          'Periksa apakah terdapat ikon gembok (HTTPS) di sebelah kiri address bar browser.',
          'Identifikasi domain dan ekstensinya (.sch.id, .com, atau .org).',
          'Centang checklist setelah kamu berhasil memverifikasinya!'
        ],
        type: 'checklist'
      }
    ],
    questions: [
      {
        id: 'q2-1',
        question: 'Jaringan komputer yang menghubungkan komputer di dalam satu ruangan laboratorium sekolah termasuk jenis jaringan...',
        options: ['LAN (Local Area Network)', 'MAN (Metropolitan Area Network)', 'WAN (Wide Area Network)', 'Internet Global'],
        correctIndex: 0,
        explanation: 'LAN (Local Area Network) mencakup wilayah geografis lokal berskala kecil seperti laboratorium, ruangan kelas, atau rumah.'
      },
      {
        id: 'q2-2',
        question: 'Manakah pernyataan yang BENAR mengenai perbedaan Web Browser dan Mesin Pencari (Search Engine)?',
        options: [
          'Web Browser adalah mesin pencari, sedangkan Google adalah sistem operasi',
          'Web Browser adalah aplikasi untuk menampilkan situs web (misal Chrome), sedangkan Search Engine adalah situs penyedia layanan pencarian informasi (misal Google Search)',
          'Keduanya adalah hal yang sama persis dan tidak ada perbedaan fungsi',
          'Search Engine hanya bisa digunakan tanpa sambungan internet'
        ],
        correctIndex: 1,
        explanation: 'Chrome, Firefox, dan Edge adalah Browser (alat pembuka web), sedangkan Google, Bing, dan DuckDuckGo adalah Search Engine (mesin pengindeks data).'
      },
      {
        id: 'q2-3',
        question: 'Ikon gembok dan awalan "https://" pada alamat website di browser menandakan bahwa...',
        options: [
          'Situs web tersebut terkunci dan tidak bisa dibaca publik',
          'Koneksi komunikasi data antara perangkatmu dan server terenkripsi secara aman',
          'Situs web tersebut gratis tanpa kuota',
          'Situs web tersebut hanya boleh dibuka oleh guru'
        ],
        correctIndex: 1,
        explanation: 'Huruf "s" pada HTTPS berarti Secure, di mana data lalu lintas informasi dienkripsi sehingga tidak mudah disadap pihak ketiga.'
      },
      {
        id: 'q2-4',
        question: 'Jika kamu ingin mencari materi Informatika dalam bentuk dokumen PDF di situs resmi Kemendikbud, sintaks pencarian terbaik di Google adalah...',
        options: [
          'tolong carikan saya pdf informatika di kemdikbud dong',
          'materi informatika smp filetype:pdf site:kemdikbud.go.id',
          'download gratis pdf semua pelajaran',
          'www.google.com/pdf/kemdikbud/materi'
        ],
        correctIndex: 1,
        explanation: 'Penggunaan operator filetype:pdf dan site:kemdikbud.go.id memfilter hasil secara presisi hanya format PDF dari domain resmi pemerintah.'
      },
      {
        id: 'q2-5',
        question: 'Domain internet dengan akhiran ".sch.id" secara khusus diperuntukkan bagi institusi...',
        options: ['Pemerintahan Indonesia', 'Perusahaan Bisnis Swasta', 'Lembaga Sekolah di Indonesia', 'Organisasi Nirlaba Internasional'],
        correctIndex: 2,
        explanation: '.sch.id adalah singkatan dari School Indonesia, domain resmi yang dikhususkan bagi lembaga pendidikan jenjang SD, SMP, dan SMA/SMK.'
      }
    ]
  },
  {
    id: 'etika-digital',
    title: 'Etika Digital',
    subtitle: 'Belajar menggunakan teknologi secara aman, beradab, bertanggung jawab, dan memahami jejak digital.',
    category: 'Kewargaan Digital',
    icon: 'ShieldAlert',
    color: 'from-[#D9824C] to-[#B86432]',
    bannerColor: 'bg-[#FDF4ED] border-[#F5D8C3] text-[#7A3E1B]',
    badge: 'Cyber Safety & Netiket',
    estimatedTime: '20 Menit',
    objectives: [
      'Memahami konsep etika berinternet (Netiket) dan saling menghargai di dunia maya.',
      'Mampu membuat dan mengelola password akun yang kuat dan tidak mudah diretas.',
      'Menyadari dampak jangka panjang dari jejak digital (digital footprint).',
      'Mengenali bahaya kejahatan siber seperti Phishing, Hoax, dan Cyberbullying.'
    ],
    sections: [
      {
        id: 'pengertian-netiket',
        title: '1. Netiket (Etika Berinternet) & Komunikasi Digital',
        iconName: 'MessageSquareText',
        summary: 'Di balik layar dan akun media sosial, ada manusia nyata dengan perasaan yang harus dihargai.',
        contentPoints: [
          'Gunakan Bahasa yang Sopan: Hindari mengetik dengan HURUF KAPITAL SEMUA karena diartikan sebagai membentak atau berteriak.',
          'Hormati Privasi Orang Lain: Jangan menyebarkan nomor telepon, foto pribadi, alamat rumah, atau identitas teman tanpa izin (Doxxing).',
          'Tolak Cyberbullying: Jangan pernah menghina, mengejek, atau mengucilkan teman di grup obrolan atau kolom komentar.',
          'Hargai Hak Cipta: Selalu cantumkan sumber referensi saat menggunakan tulisan, foto, atau karya orang lain untuk tugas sekolah.'
        ],
        keyHighlight: 'Ingat aturan emas: "Jika kamu tidak pantas mengatakannya langsung di depan kelas, jangan ketik di internet!"'
      },
      {
        id: 'keamanan-password',
        title: '2. Rahasia Password Kuat & Keamanan Akun',
        iconName: 'LockKeyhole',
        summary: 'Password adalah kunci utama rumah digitalmu (email, game, media sosial). Buat yang kuat dan jangan pernah dibagikan ke teman!',
        contentPoints: [
          'Panjang Minimal: Gunakan minimal 8 sampai 12 karakter.',
          'Kombinasi 4 Elemen: Gabungkan Huruf Besar (A-Z), Huruf Kecil (a-z), Angka (0-9), dan Simbol khusus (@, #, $, !).',
          'Hindari Password Pasaran: Jangan gunakan tanggal lahir, nama sendiri, "12345678", "password", atau nama hewan peliharaan.',
          'Aktifkan 2FA (Verifikasi 2 Langkah): Lapisan keamanan tambahan melalui kode OTP atau notifikasi ponsel saat login di perangkat baru.'
        ],
        keyHighlight: 'Jangan pernah membagikan password akunmu kepada siapapun, termasuk teman dekat atau pacar. Password bersifat 100% rahasia pribadi.',
        exampleCase: {
          title: 'Perbandingan Password Lemah vs Kuat',
          scenario: 'Password "aisyah2012" dapat ditebak software hacker dalam 2 detik. Sedangkan passphrase "Kopi#Panas88!Enak" membutuhkan ribuan tahun untuk dipecahkan komputer.',
          takeaway: 'Gunakan metode rangkaian kata unik (passphrase) yang mudah kamu ingat namun rumit ditebak orang lain.'
        }
      },
      {
        id: 'jejak-digital',
        title: '3. Jejak Digital (Digital Footprint)',
        iconName: 'Footprints',
        summary: 'Segala hal yang kamu unggah, cari, dan komentari di internet akan meninggalkan jejak permanen yang sulit dihapus.',
        contentPoints: [
          'Jejak Digital Aktif: Foto yang diunggah, postingan status, komentar di media sosial, chat grup publik.',
          'Jejak Digital Pasif: Riwayat tontonan YouTube, lokasi GPS yang terekam aplikasi, riwayat pencarian Google.',
          'Dampak Nyata: Postingan kasar atau tidak pantas saat remaja bisa ditemukan calon sekolah lanjutan, universitas, atau tempat kerja di masa depan.',
          'Terapkan Prinsip "Think Before You Post": Apakah bermanfaat? Apakah benar? Apakah menyakiti orang lain?'
        ],
        keyHighlight: 'Tombol "Delete" di media sosial tidak menjamin data hilang sepenuhnya karena orang lain bisa saja sudah mengambil screenshot.'
      },
      {
        id: 'waspada-phishing',
        title: '4. Waspada Phishing & Modus Penipuan Online',
        iconName: 'AlertTriangle',
        summary: 'Kenali tanda-tanda jebakan link palsu yang bertujuan mencuri akun atau data pribadimu.',
        contentPoints: [
          'Ciri Pesan Phishing: Menawarkan diamond game gratis, kuota internet 100GB cuma-cuma, atau pesan panik "Akunmu akan ditutup dalam 10 menit".',
          'Trik Memeriksa Link: Perhatikan alamat web. Contoh link palsu: "login-instagram-gratis.xyz" bukan "instagram.com".',
          'Pencegahan: Jangan pernah mengklik link mencurigakan dan jangan masukkan username/password di form yang tidak jelas.'
        ],
        keyHighlight: 'Tidak ada pihak resmi (pihak game, bank, atau sekolah) yang meminta password akunmu lewat pesan chat WhatsApp atau DM.'
      }
    ],
    practiceTasks: [
      {
        id: 'task-password-tester',
        title: 'Aktivitas 1: Uji Kekuatan Password Interaktif',
        description: 'Gunakan simulator kekuatan password kami untuk menguji seberapa aman kombinasi karakter yang kamu rancang.',
        steps: [
          'Ketik contoh rancangan password di kalkulator kekuatan password pada menu simulasi praktik.',
          'Pastikan indikator mencapai level "Sangat Kuat" (Kombinasi huruf besar, kecil, angka, dan simbol).',
          'PENTING: Jangan masukkan password akun aslimu di aplikasi apapun; gunakan kombinasi simulasi!'
        ],
        type: 'password_tester'
      },
      {
        id: 'task-privacy-audit',
        title: 'Aktivitas 2: Checklist Keamanan Akun Media Sosial & Email',
        description: 'Lakukan audit keamanan pada akun email sekolah atau media sosial yang kamu miliki.',
        steps: [
          'Cek apakah password akunmu sudah unik dan tidak sama dengan akun lain.',
          'Aktifkan Verifikasi Dua Langkah (2FA) di pengaturan Google / Akun Media Sosial.',
          'Periksa riwayat login perangkat yang aktif di akunmu.',
          'Centang checklist setelah selesai melakukan audit!'
        ],
        type: 'checklist'
      }
    ],
    questions: [
      {
        id: 'q3-1',
        question: 'Ketika kamu mengetik pesan di grup WhatsApp kelas dengan SEMUA HURUF KAPITAL (Contoh: "KERJAKAN TUGAS SEKARANG"), dalam etika digital (netiket) pesan tersebut bermakna...',
        options: [
          'Pengirim sangat ramah dan ceria',
          'Pengirim sedang berteriak, marah, atau membentak',
          'Pesan tersebut bersifat rahasia',
          'Tidak memiliki arti khusus'
        ],
        correctIndex: 1,
        explanation: 'Dalam etika netiket komunikasi teks, menulis seluruh kalimat dengan huruf kapital diartikan sebagai ekspresi berteriak atau membentak lawan bicara.'
      },
      {
        id: 'q3-2',
        question: 'Manakah dari kombinasi kata sandi (password) berikut yang paling AMAN dan sulit dibobol peretas?',
        options: [
          '12345678',
          'aisyahcantik',
          'smp8jakarta',
          'B#lajar!T2026'
        ],
        correctIndex: 3,
        explanation: '"B#lajar!T2026" sangat kuat karena memadukan huruf besar, huruf kecil, angka, simbol (@#!), dan panjang karakter yang memadai.'
      },
      {
        id: 'q3-3',
        question: 'Apa yang dimaksud dengan "Jejak Digital" (Digital Footprint)?',
        options: [
          'Bekas sidik jari yang menempel di layar touchscreen HP',
          'Jejak data, riwayat aktivitas, dan postingan yang kita tinggalkan saat beraktivitas di internet',
          'Aplikasi untuk melacak lokasi GPS teman sekolah',
          'Kabel jaringan yang menghubungkan komputer ke modem'
        ],
        correctIndex: 1,
        explanation: 'Jejak digital adalah rekam jejak aktivitas, pencarian, unggahan, dan komentar yang terekam di internet dan dapat bertahan dalam waktu sangat lama.'
      },
      {
        id: 'q3-4',
        question: 'Kamu menerima pesan WhatsApp dari nomor tidak dikenal: "Selamat! Kamu dapat 5000 Diamond Game Gratis, klik link login-game-gratis.xyz dan masukkan email & passwordmu sekarang!". Tindakan yang paling tepat adalah...',
        options: [
          'Langsung klik dan masukkan password agar dapat hadiah',
          'Meneruskan pesan ke semua teman sekelas agar mereka ikut dapat',
          'Mengabaikan pesan, tidak mengklik link, dan memblokir nomor tersebut karena merupakan modus Phishing (pencurian akun)',
          'Meminta nomor rekening orang tua ke pengirim'
        ],
        correctIndex: 2,
        explanation: 'Pesan ini adalah ciri klasik kejahatan Phishing (umpan palsu) yang bertujuan mencuri data login akun pengguna. Jangan pernah mengklik link mencurigakan.'
      },
      {
        id: 'q3-5',
        question: 'Mengapa kita TIDAK BOLEH mengunggah informasi pribadi seperti nomor telepon rumah, KTP orang tua, dan tiket perjalanan di media sosial publik?',
        options: [
          'Karena bisa disalahgunakan oleh pihak jahat untuk penipuan, pencurian identitas, atau kejahatan siber (Doxxing)',
          'Karena ukuran fotonya terlalu besar di memori HP',
          'Karena guru akan memberikan nilai jelek',
          'Hanya karena gambar tersebut tidak estetik'
        ],
        correctIndex: 0,
        explanation: 'Informasi identitas pribadi (PII) yang tersebar di ruang publik sangat rentan dimanfaatkan pelaku kejahatan untuk rekayasa sosial, penipuan, dan pinjaman ilegal.'
      }
    ]
  }
];

export const CLASS_OPTIONS = [
  'Kelas 7 Cordoba',
  'Kelas 7 Madinah'
];
