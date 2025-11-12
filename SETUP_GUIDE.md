# Panduan Setup dan Menjalankan Aplikasi Forum Diskusi

## 📦 Instalasi

### Langkah 1: Ekstrak dan Masuk ke Folder
```bash
cd forum-diskusi-app
```

### Langkah 2: Install Dependencies
```bash
npm install
```

Ini akan menginstall semua package yang diperlukan:
- React & React DOM
- Redux Toolkit & React Redux
- React Router DOM
- ESLint dengan AirBnB config
- Dan dependencies lainnya

### Langkah 3: Jalankan Aplikasi
```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

Browser akan otomatis terbuka. Jika tidak, buka manual di browser Anda.

## 🧪 Testing & Linting

### Menjalankan ESLint
```bash
npm run lint
```

### Auto-fix ESLint Errors
```bash
npm run lint:fix
```

### Build untuk Production
```bash
npm run build
```

File production akan ada di folder `build/`

## 🎯 Cara Menggunakan Aplikasi

### 1. Registrasi Account
- Klik tombol "Register" di navigation bar
- Isi form dengan:
  - Nama lengkap
  - Email valid
  - Password (minimal 6 karakter)
- Klik "Daftar"

### 2. Login
- Klik tombol "Login" di navigation bar
- Masukkan email dan password yang sudah didaftarkan
- Klik "Login"

### 3. Melihat Thread
- Halaman home menampilkan semua thread
- Klik category untuk filter thread berdasarkan kategori
- Klik thread untuk melihat detail

### 4. Membuat Thread Baru
- Login terlebih dahulu
- Klik tombol "➕ Thread Baru" di navigation
- Isi form:
  - Judul thread
  - Kategori (opsional)
  - Isi thread
- Klik "Posting Thread"

### 5. Berkomentar
- Buka detail thread
- Scroll ke bagian komentar
- Ketik komentar di textarea
- Klik "Kirim Komentar"

### 6. Voting
- Klik tombol 👍 untuk up-vote
- Klik tombol 👎 untuk down-vote
- Klik lagi untuk cancel vote

### 7. Melihat Leaderboard
- Klik "Leaderboard" di navigation
- Lihat ranking pengguna berdasarkan score

## 🔧 Troubleshooting

### Error: Cannot find module
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 sudah digunakan
```bash
# Ubah port di package.json atau kill proses di port 3000
# Untuk Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Untuk Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### ESLint Error
```bash
# Auto-fix error
npm run lint:fix

# Jika masih ada error, cek file yang error dan fix manual
```

## 📝 Tips Development

### Hot Reload
- Aplikasi menggunakan hot reload
- Setiap perubahan di code akan otomatis reload browser
- Tidak perlu restart server

### Redux DevTools
- Install Redux DevTools Extension di browser
- Bisa melihat semua state dan action
- Sangat membantu untuk debugging

### React DevTools
- Install React DevTools Extension
- Bisa inspect component tree
- Melihat props dan state component

## 🎨 Customization

### Mengubah Warna
Edit file `src/index.css` bagian color variables:
```css
/* Ubah warna primary */
.btn-new-thread {
  background-color: #your-color;
}
```

### Menambah Halaman Baru
1. Buat file di `src/pages/`
2. Daftarkan route di `src/App.jsx`
3. Tambah link di `src/components/Navigation.jsx`

### Menambah State Baru
1. Buat slice di `src/states/`
2. Daftarkan reducer di `src/states/store.js`

## 📚 Resources

- [React Documentation](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Dicoding Forum API](https://forum-api.dicoding.dev/v1)

## ⚠️ Catatan Penting

1. **Jangan commit .env atau token**
2. **Selalu test sebelum push**
3. **Ikuti ESLint rules**
4. **Buat PR untuk setiap feature baru**

## 🐛 Known Issues

Tidak ada known issues saat ini. Jika menemukan bug, silakan report atau buat issue.

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Cek dokumentasi README.md
2. Cek panduan ini
3. Google error message
4. Tanya ke komunitas React/Redux

---

Happy Coding! 🚀
