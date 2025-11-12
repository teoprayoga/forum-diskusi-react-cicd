# Forum Diskusi App

Aplikasi Forum Diskusi yang dibangun dengan React dan Redux, menggunakan Dicoding Forum API.

## 📋 Fitur

### Kriteria Utama
- ✅ **Registrasi & Login**: Pengguna dapat mendaftar dan login ke aplikasi
- ✅ **Daftar Thread**: Menampilkan semua thread diskusi dengan informasi lengkap
- ✅ **Detail Thread**: Menampilkan detail thread beserta komentar
- ✅ **Buat Thread**: Pengguna dapat membuat thread baru
- ✅ **Buat Komentar**: Pengguna dapat berkomentar di thread
- ✅ **Loading Indicator**: Menampilkan loading saat memuat data dari API

### Fitur Tambahan
- ✅ **Voting System**: Up-vote dan down-vote untuk thread dan komentar
- ✅ **Optimistic Updates**: UI update sebelum response dari server
- ✅ **Leaderboard**: Menampilkan pengguna dengan kontribusi terbaik
- ✅ **Category Filter**: Filter thread berdasarkan kategori

## 🏗️ Arsitektur

### State Management
- Redux Toolkit untuk state management
- Semua state dari API disimpan di Redux Store
- Pemisahan state dan UI component di folder terpisah
- Tidak ada API call di component (semua di Redux actions)

### Code Quality
- ESLint dengan AirBnB JavaScript Style Guide
- React Strict Mode
- Komponen modular dan reusable
- Clean code structure

## 📁 Struktur Proyek

```
forum-diskusi-app/
├── public/
│   └── index.html
├── src/
│   ├── components/          # UI Components
│   │   ├── Navigation.jsx
│   │   ├── ThreadItem.jsx
│   │   ├── CommentItem.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── LeaderboardItem.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/              # Page Components
│   │   ├── HomePage.jsx
│   │   ├── ThreadDetailPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── NewThreadPage.jsx
│   │   └── LeaderboardPage.jsx
│   ├── states/             # Redux Store
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   ├── threads/
│   │   │   └── threadsSlice.js
│   │   ├── threadDetail/
│   │   │   └── threadDetailSlice.js
│   │   ├── users/
│   │   │   └── usersSlice.js
│   │   ├── leaderboards/
│   │   │   └── leaderboardsSlice.js
│   │   └── store.js
│   ├── utils/              # Utilities
│   │   ├── api.js          # API Service
│   │   └── helpers.js      # Helper Functions
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── .eslintrc.json
├── package.json
└── README.md
```

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js (v14 atau lebih baru)
- npm atau yarn
- WebStorm (optional, tapi recommended)

### Instalasi

1. Clone repository
```bash
git clone <repository-url>
cd forum-diskusi-app
```

2. Install dependencies
```bash
npm install
```

3. Jalankan aplikasi
```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

### Setup untuk WebStorm

Jika menggunakan WebStorm IDE, baca panduan lengkap di [WEBSTORM_SETUP.md](WEBSTORM_SETUP.md)

**Quick Start:**
1. Open project di WebStorm
2. Install dependencies: `npm install`
3. Enable ESLint: Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint → Enable
4. Run: Pilih configuration `start` dan klik Run

### Perintah Lainnya

```bash
# Build untuk production
npm run build

# Jalankan ESLint
npm run lint

# Fix ESLint errors
npm run lint:fix
```

## 🔑 Fitur Detail

### Authentication
- User dapat register dengan nama, email, dan password
- User dapat login dengan email dan password
- Token disimpan di localStorage
- Auto-login jika token tersedia

### Thread Management
- Menampilkan list thread dengan informasi:
  - Judul, kategori, pembuat (nama & avatar)
  - Waktu posting, jumlah komentar
  - Up-votes dan down-votes
- Filter thread berdasarkan kategori
- Buat thread baru (memerlukan login)

### Thread Detail
- Menampilkan detail lengkap thread
- Menampilkan semua komentar
- Voting untuk thread dan komentar
- Tambah komentar baru (memerlukan login)

### Leaderboard
- Menampilkan ranking pengguna
- Informasi nama, avatar, dan score
- Medal untuk top 3 pengguna

## 🎯 Teknologi

- **React 18**: Library UI
- **Redux Toolkit**: State management
- **React Router**: Routing
- **React Hook Form**: Form management & validation ⭐ NEW
- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Cypress**: E2E testing
- **GitHub Actions**: Continuous Integration
- **Vercel**: Continuous Deployment
- **Dicoding Forum API**: Backend API
- **ESLint**: Code linting
- **CSS3**: Styling

## 📱 Responsive Design

Aplikasi fully responsive dan dapat digunakan di:
- Desktop
- Tablet
- Mobile

## 🧪 Testing

Proyek dilengkapi dengan comprehensive testing:

### Unit Tests
- Reducer tests (authSlice, threadsSlice)
- Thunk function tests (asyncLoginUser, asyncGetThreads)

### Component Tests
- ThreadItem component
- Navigation component

### E2E Tests
- Login flow testing with Cypress

**Run tests:**
```bash
# All tests
npm test

# E2E tests
npm run e2e

# With coverage
npm test -- --coverage
```

**Documentation:** See [TESTING.md](TESTING.md)

## 🚀 CI/CD Pipeline

### Continuous Integration (GitHub Actions)
- ✅ Automated testing on every PR
- ✅ ESLint checks
- ✅ Test coverage reporting
- ✅ Branch protection enforcement

### Continuous Deployment (Vercel)
- ✅ Automatic deployment on merge
- ✅ Preview deployments for PRs
- ✅ Production monitoring
- ✅ Zero-downtime deployments

**Documentation:** See [CI_CD.md](CI_CD.md)

**Live Demo:** [Coming Soon - Add your Vercel URL here]

## 🔒 Authorization

- Melihat thread: Tidak perlu login (opsional)
- Membuat thread: Memerlukan login
- Membuat komentar: Memerlukan login
- Voting: Memerlukan login

## 🎯 Best Practices

1. **State Management**: Semua state dari API di Redux Store
2. **Component Separation**: UI dan Logic terpisah
3. **Code Quality**: Menggunakan ESLint dengan AirBnB style
4. **Optimistic Updates**: UI update langsung untuk UX yang lebih baik
5. **Error Handling**: Proper error handling di setiap API call
6. **Loading States**: Loading indicator untuk setiap async operation

## 📝 API Documentation

API: [Dicoding Forum API](https://forum-api.dicoding.dev/v1)

### Endpoints yang digunakan:
- `POST /register` - Register user baru
- `POST /login` - Login user
- `GET /users/me` - Get profile user
- `GET /users` - Get all users
- `GET /threads` - Get all threads
- `POST /threads` - Create thread
- `GET /threads/:id` - Get thread detail
- `POST /threads/:id/comments` - Create comment
- `POST /threads/:id/up-vote` - Up-vote thread
- `POST /threads/:id/down-vote` - Down-vote thread
- `POST /threads/:id/comments/:commentId/up-vote` - Up-vote comment
- `POST /threads/:id/comments/:commentId/down-vote` - Down-vote comment
- `GET /leaderboards` - Get leaderboards

## 👨‍💻 Development

### Menambah Fitur Baru

1. Buat Redux slice di `src/states/`
2. Buat component di `src/components/` atau page di `src/pages/`
3. Daftarkan route di `App.jsx`
4. Tambahkan styling di `index.css`

### Code Style

Proyek menggunakan AirBnB JavaScript Style Guide. Pastikan untuk:
- Jalankan `npm run lint` sebelum commit
- Fix semua error dengan `npm run lint:fix`
- Ikuti convention yang sudah ada

## 📄 License

MIT License

## 🙏 Acknowledgments

- [Dicoding](https://www.dicoding.com/) untuk API
- [React](https://reactjs.org/) untuk library
- [Redux Toolkit](https://redux-toolkit.js.org/) untuk state management

# Test CI
