# Setup WebStorm untuk Forum Diskusi App

## 🎯 Konfigurasi Otomatis

Proyek ini sudah dilengkapi dengan konfigurasi WebStorm di folder `.idea/`, termasuk:
- ✅ ESLint configuration
- ✅ Code Style settings
- ✅ Inspection profiles
- ✅ EditorConfig

## 📦 Langkah Setup di WebStorm

### 1. Buka Proyek
```
File → Open → Pilih folder forum-diskusi-app
```

### 2. Install Dependencies
WebStorm akan otomatis mendeteksi `package.json` dan menanyakan apakah ingin install dependencies.

**Atau manual:**
1. Buka Terminal di WebStorm (Alt + F12)
2. Jalankan:
```bash
npm install
```

### 3. Enable ESLint

#### Cara Otomatis:
WebStorm akan menampilkan notifikasi "ESLint: A config file is present" → Klik **Enable**

#### Cara Manual:
1. Buka: `File → Settings` (Windows/Linux) atau `WebStorm → Preferences` (Mac)
2. Navigate: `Languages & Frameworks → JavaScript → Code Quality Tools → ESLint`
3. Pilih: **Automatic ESLint configuration**
4. Atau Manual dengan settings:
   - Node interpreter: Project Node
   - ESLint package: `[project]/node_modules/eslint`
   - Configuration file: `[project]/.eslintrc.json`
5. Centang: **Run eslint --fix on save**
6. Klik: **OK**

### 4. Verifikasi Code Style

1. Buka: `File → Settings → Editor → Code Style → JavaScript`
2. Klik: **Set from...** → **JavaScript Standard Style** (atau biarkan default)
3. Pastikan:
   - Indent: 2 spaces
   - Tab size: 2
   - Continuation indent: 2

### 5. Enable EditorConfig

1. Buka: `File → Settings → Editor → Code Style`
2. Centang: **Enable EditorConfig support**

### 6. Configure Run Configuration

#### Untuk Development:
1. Klik: **Add Configuration** (pojok kanan atas)
2. Klik: `+` → **npm**
3. Settings:
   - Name: `start`
   - Command: `run`
   - Scripts: `start`
4. Klik: **OK**

#### Untuk Linting:
1. Klik: **Add Configuration**
2. Klik: `+` → **npm**
3. Settings:
   - Name: `lint`
   - Command: `run`
   - Scripts: `lint`
4. Klik: **OK**

## ⚡ Keyboard Shortcuts

### ESLint
- **Fix ESLint problems**: `Alt + Enter` → pilih "ESLint: Fix ..."
- **Run ESLint on file**: `Ctrl + Alt + L` (reformat code)

### Code Navigation
- **Go to definition**: `Ctrl + B` atau `Ctrl + Click`
- **Find usages**: `Alt + F7`
- **Recent files**: `Ctrl + E`
- **Search everywhere**: `Shift + Shift` (double shift)

### Refactoring
- **Rename**: `Shift + F6`
- **Extract variable**: `Ctrl + Alt + V`
- **Extract method**: `Ctrl + Alt + M`

### Running
- **Run**: `Shift + F10`
- **Debug**: `Shift + F9`
- **Stop**: `Ctrl + F2`

## 🔧 Settings Tambahan (Opsional)

### 1. Auto Import
```
Settings → Editor → General → Auto Import
→ Centang: Add unambiguous imports on the fly
```

### 2. File Watchers (Optional - untuk auto-format)
```
Settings → Tools → File Watchers
→ Klik + → ESLint
```

### 3. Emmet untuk JSX
```
Settings → Editor → Emmet
→ Enable Emmet for JSX files
```

### 4. Git Integration
```
Settings → Version Control → Git
→ Pastikan Git executable terdeteksi
```

## 🎨 Theme & Appearance (Opsional)

### Dark Theme
```
Settings → Appearance & Behavior → Appearance
→ Theme: Darcula atau IntelliJ Light
```

### Font
```
Settings → Editor → Font
→ Font: JetBrains Mono, Fira Code, atau Consolas
→ Size: 14
→ Line spacing: 1.2
```

## ✅ Verifikasi Setup

### 1. Check ESLint Working
1. Buka file `src/App.jsx`
2. Tambahkan baris kosong ekstra atau error sengaja
3. Seharusnya muncul warning/error dari ESLint (garis bergelombang)
4. Hover untuk lihat pesan error
5. `Alt + Enter` untuk auto-fix

### 2. Check Auto-format
1. Buka file JavaScript/JSX
2. Ketik code yang tidak terformat dengan baik
3. `Ctrl + Alt + L` untuk reformat
4. Code akan otomatis terformat sesuai ESLint rules

### 3. Run Application
1. Klik configuration `start` di toolbar
2. Klik tombol Run (▶️) atau `Shift + F10`
3. Browser akan otomatis terbuka di `http://localhost:3000`

## 🐛 Troubleshooting

### ESLint tidak berfungsi
**Solusi:**
```bash
# Hapus dan install ulang
rm -rf node_modules package-lock.json
npm install

# Restart WebStorm
File → Invalidate Caches / Restart → Invalidate and Restart
```

### Code style tidak konsisten
**Solusi:**
1. Pastikan EditorConfig enabled
2. Reformat semua file:
```
Code → Reformat Code → Whole project
```

### Dependencies tidak terdeteksi
**Solusi:**
```bash
# Di terminal WebStorm
npm install

# Kemudian
File → Invalidate Caches / Restart
```

### Port 3000 already in use
**Solusi:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Atau gunakan port lain
PORT=3001 npm start
```

## 📚 Plugin Recommended (Opsional)

Install melalui: `File → Settings → Plugins`

1. **ESLint** - Biasanya sudah built-in
2. **Prettier** - Code formatter (jika ingin pakai Prettier)
3. **GitToolBox** - Enhanced Git integration
4. **Rainbow Brackets** - Colorful brackets
5. **.env files support** - Syntax highlighting untuk .env
6. **Material Theme UI** - Beautiful themes

## 🎓 Tips WebStorm untuk React

### 1. Live Templates
Buat shortcut sendiri untuk boilerplate code:
```
Settings → Editor → Live Templates → JavaScript
```

Contoh template `rfc` (React Functional Component):
```javascript
const $NAME$ = () => {
  return (
    <div>
      $END$
    </div>
  );
};

export default $NAME$;
```

### 2. Code Completion
- Ketik `props.` untuk melihat props yang tersedia
- Ketik `this.` untuk melihat methods (jika class component)
- `Ctrl + Space` untuk force completion

### 3. Navigation
- `Ctrl + B` pada component untuk go to definition
- `Alt + F7` untuk find semua usage component

### 4. Debugging
1. Tambah breakpoint (klik di gutter)
2. Run dengan Debug mode (`Shift + F9`)
3. Use Debug Console untuk inspect variables

## ⚙️ npm Scripts di WebStorm

Buka: `npm` tool window (kanan sidebar)

Available scripts:
- **start** - Run development server
- **build** - Build production
- **test** - Run tests
- **lint** - Check ESLint errors
- **lint:fix** - Auto-fix ESLint errors

Double-click untuk menjalankan atau klik kanan → Run

## 📖 Resources

- [WebStorm Documentation](https://www.jetbrains.com/help/webstorm/)
- [ESLint in WebStorm](https://www.jetbrains.com/help/webstorm/eslint.html)
- [React Development in WebStorm](https://www.jetbrains.com/help/webstorm/react.html)

---

## 🎉 Selamat Coding!

Setup sudah selesai! WebStorm sekarang siap digunakan untuk development dengan:
- ✅ ESLint auto-check dan auto-fix
- ✅ Code style konsisten
- ✅ Auto-completion untuk React
- ✅ Debugging support
- ✅ Git integration

Happy coding! 🚀
