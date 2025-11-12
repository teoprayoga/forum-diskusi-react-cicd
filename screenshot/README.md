# Screenshots CI/CD Documentation

Folder ini berisi screenshot sebagai bukti implementasi CI/CD.

## Required Screenshots:

### 1. 1_ci_check_error.png
Screenshot yang menunjukkan CI check **ERROR** karena pengujian gagal.

**Isi screenshot harus menampilkan:**
- Pull Request di GitHub
- Status check menunjukkan "Some checks were not successful"
- Red X atau Failed status untuk "Continuous Integration / automation-test-job"
- Merging is blocked karena failed checks

### 2. 2_ci_check_pass.png
Screenshot yang menunjukkan CI check **PASS** karena pengujian berhasil.

**Isi screenshot harus menampilkan:**
- Pull Request di GitHub
- Status check menunjukkan "All checks have passed"
- Green checkmark untuk "Continuous Integration / automation-test-job"
- Vercel deployment completed
- Ready to merge

### 3. 3_branch_protection.png
Screenshot yang menunjukkan branch protection pada halaman PR.

**Isi screenshot harus menampilkan:**
- Pull Request page
- Message: "Merging is blocked"
- Message: "Merge without waiting for requirements to be met (bypass branch protections)"
- Red box indicating branch protection is active

## Cara Mengambil Screenshots:

### Untuk 1_ci_check_error.png:
1. Buat Pull Request ke branch master
2. Pastikan ada test yang gagal (sengaja buat test fail)
3. Push ke branch
4. Tunggu GitHub Actions selesai (akan failed)
5. Screenshot halaman PR dengan status failed
6. Simpan sebagai `1_ci_check_error.png`

### Untuk 2_ci_check_pass.png:
1. Fix test yang gagal
2. Push perubahan
3. Tunggu GitHub Actions selesai (akan success)
4. Screenshot halaman PR dengan status passed
5. Simpan sebagai `2_ci_check_pass.png`

### Untuk 3_branch_protection.png:
1. Pada halaman PR yang sama (dengan checks passed)
2. Scroll ke bagian merge button
3. Screenshot bagian yang menunjukkan "Merging is blocked"
4. Simpan sebagai `3_branch_protection.png`

## Setup Branch Protection:

Untuk mengaktifkan branch protection:

1. Go to: Repository → Settings → Branches
2. Klik "Add rule" atau "Add branch protection rule"
3. Branch name pattern: `master`
4. Enable:
   - ☑️ Require a pull request before merging
   - ☑️ Require status checks to pass before merging
   - ☑️ Require branches to be up to date before merging
   - Select status check: "Continuous Integration / automation-test-job"
5. Klik "Create" atau "Save changes"

## Verifikasi:

Setelah setup, pastikan:
- ✅ Tidak bisa merge langsung ke master
- ✅ Harus melalui Pull Request
- ✅ CI harus pass sebelum bisa merge
- ✅ Ada warning "Merging is blocked"

---

**Note:** Screenshots ini WAJIB untuk submission. Tanpa screenshots, kriteria deployment tidak terpenuhi.
