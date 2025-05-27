# Notes App - Aplikasi Pencatatan

Aplikasi pencatatan sederhana dan elegan yang dibangun menggunakan HTML, CSS, dan JavaScript dengan Web Components dan RESTful API.

## 🚀 Fitur

- ✅ Tambah catatan baru
- ✅ Hapus catatan
- ✅ Arsipkan catatan
- ✅ Batalkan arsip catatan
- ✅ Real-time form validation
- ✅ Responsive design
- ✅ Modern UI dengan glassmorphism effect
- ✅ Loading indicator
- ✅ Error notifications dengan SweetAlert2
- ✅ Animasi halus untuk interaksi pengguna
- ✅ Integrasi dengan RESTful API

## 🛠️ Teknologi

- **HTML5** - Struktur aplikasi
- **CSS3** - Styling dan animasi
- **JavaScript ES6+** - Logika aplikasi
- **Web Components** - Custom elements
- **CSS Grid** - Layout responsif
- **Fetch API** - Mengakses data dari server
- **Webpack** - Module bundler
- **SweetAlert2** - Library untuk notifikasi

## 📂 Struktur Folder

```
notes-app/
├── src/
│   ├── components/
│   │   ├── app-header.js
│   │   ├── loading-indicator.js
│   │   ├── note-form.js
│   │   ├── note-item.js
│   │   └── toast-notification.js
│   ├── services/
│   │   └── api-service.js
│   ├── styles/
│   │   └── styles.css
│   ├── app.js
│   └── index.html
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── package.json
├── .prettierrc
└── README.md
```

## 🚀 Memulai Pengembangan

### Prasyarat

- Node.js (versi 14 atau lebih baru)
- npm (versi 6 atau lebih baru)

### Instalasi

1. Clone repositori ini:

```bash
git clone https://github.com/username/notes-app.git
cd notes-app
```

2. Install dependensi:

```bash
npm install
```

3. Jalankan aplikasi dalam mode development:

```bash
npm run start-dev
```

4. Buka browser dan akses `http://localhost:9000`

### Build untuk Production

Untuk membuat versi production dari aplikasi:

```bash
npm run build
```

File hasil build akan tersedia di folder `dist/`.

## 📝 API

Aplikasi ini menggunakan Dicoding Notes API yang tersedia di https://notes-api.dicoding.dev/v2. Berikut adalah endpoint yang digunakan:

- `GET /notes` - Mendapatkan daftar catatan aktif
- `GET /notes/archived` - Mendapatkan daftar catatan yang diarsipkan
- `POST /notes` - Membuat catatan baru
- `POST /notes/{id}/archive` - Mengarsipkan catatan
- `POST /notes/{id}/unarchive` - Membatalkan arsip catatan
- `DELETE /notes/{id}` - Menghapus catatan

## 📋 Fitur yang Diimplementasikan

### 1. Kriteria Wajib

- ✅ Mempertahankan semua kriteria submission sebelumnya
- ✅ Memanfaatkan RESTful API sebagai sumber data
- ✅ Menggunakan webpack sebagai module bundler
- ✅ Menggunakan Fetch API untuk request asynchronous
- ✅ Memiliki indikator loading saat melakukan proses request

### 2. Kriteria Opsional

- ✅ Memiliki fitur arsip catatan
- ✅ Menampilkan feedback saat terjadi error (menggunakan SweetAlert2)
- ✅ Memiliki efek pergerakan halus/animasi (CSS transitions & animations)
- ✅ Menerapkan Prettier sebagai code formatter

## 🎨 Screenshot

[Screenshot akan ditambahkan setelah development]

## 📝 Lisensi

[Lisensi Anda]