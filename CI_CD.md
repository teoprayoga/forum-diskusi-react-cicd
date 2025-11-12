# CI/CD Documentation

Dokumentasi lengkap untuk setup dan implementasi CI/CD di Forum Diskusi App.

## 📋 Overview

Proyek ini mengimplementasikan **CI/CD Pipeline** dengan:
- **CI (Continuous Integration)**: GitHub Actions
- **CD (Continuous Deployment)**: Vercel
- **Branch Protection**: Master branch protected

## 🔄 CI/CD Workflow

```
Developer → Push/PR → GitHub Actions (CI) → Tests Pass → Vercel (CD) → Production
```

## 🛠️ Setup Guide

### 1. GitHub Actions (Continuous Integration)

#### File Configuration
**Location:** `.github/workflows/ci.yml`

```yaml
name: Continuous Integration / automation-test-job

on:
  pull_request:
    branches:
      - master

jobs:
  automation-test-job:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies
      - Run ESLint
      - Run tests
      - Upload coverage
```

#### What It Does:
1. **Triggers** on every Pull Request to `master` branch
2. **Runs** ESLint to check code quality
3. **Executes** all tests (unit, integration, component)
4. **Uploads** test coverage to Codecov
5. **Reports** status back to GitHub PR

#### Setup Steps:
1. File `.github/workflows/ci.yml` sudah ada di repository
2. Push code ke GitHub
3. CI akan otomatis berjalan saat membuat PR

#### Status Checks:
- ✅ **Green Check**: All tests passed
- ❌ **Red X**: Tests failed or ESLint errors

### 2. Vercel (Continuous Deployment)

#### File Configuration
**Location:** `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [...]
}
```

#### Setup Steps:

##### A. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

##### B. Connect Repository to Vercel

**Via Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
6. Click "Deploy"

**Via Vercel CLI:**
```bash
vercel login
vercel
```

##### C. Configure Build Settings
Vercel will automatically detect React app settings:
- Framework: Create React App
- Build Command: `npm run build`
- Output Directory: `build`

##### D. Environment Variables (if needed)
1. Go to Project Settings → Environment Variables
2. Add variables if your app needs them

#### Deployment:
- **Auto-deploy** on every push to `master` (after merge)
- **Preview deploy** for every PR
- **URL**: https://your-project.vercel.app

### 3. Branch Protection

#### Setup Steps:

1. **Go to Repository Settings:**
   ```
   GitHub Repository → Settings → Branches
   ```

2. **Add Branch Protection Rule:**
   - Branch name pattern: `master`

3. **Enable Settings:**
   - ☑️ Require a pull request before merging
     - ☑️ Require approvals: 0 (or 1+ if team)
   - ☑️ Require status checks to pass before merging
     - ☑️ Require branches to be up to date before merging
     - **Select status check:** `Continuous Integration / automation-test-job`
   - ☑️ Do not allow bypassing the above settings

4. **Save Changes**

#### What It Does:
- **Blocks** direct push to master
- **Requires** Pull Request for all changes
- **Enforces** CI checks to pass before merge
- **Protects** production code quality

## 📸 Required Screenshots

### 1. 1_ci_check_error.png
**Shows:** CI check failing because tests failed

**How to get:**
1. Create branch: `git checkout -b test-feature`
2. Break a test intentionally:
   ```javascript
   // In any test file
   expect(true).toBe(false); // This will fail
   ```
3. Push and create PR
4. Wait for CI to run and fail
5. Screenshot the PR page showing failed checks
6. Save as `screenshot/1_ci_check_error.png`

### 2. 2_ci_check_pass.png
**Shows:** CI check passing with all tests successful

**How to get:**
1. Fix the broken test
2. Push changes
3. Wait for CI to run and pass
4. Screenshot the PR page showing passed checks
5. Save as `screenshot/2_ci_check_pass.png`

### 3. 3_branch_protection.png
**Shows:** Branch protection preventing merge without checks

**How to get:**
1. On the same PR (with checks passed)
2. Scroll to merge button area
3. Should show "Merging is blocked" message
4. Screenshot the protection message
5. Save as `screenshot/3_branch_protection.png`

## 🎯 Workflow Steps

### Developer Workflow:

#### 1. Create Feature Branch
```bash
git checkout -b feature/new-feature
```

#### 2. Make Changes
```bash
# Edit files
git add .
git commit -m "Add new feature"
```

#### 3. Push Branch
```bash
git push origin feature/new-feature
```

#### 4. Create Pull Request
- Go to GitHub
- Click "New Pull Request"
- Base: `master` ← Compare: `feature/new-feature`
- Create Pull Request

#### 5. Wait for CI
- GitHub Actions will automatically run
- Check status in PR page
- If failed: Fix issues and push again
- If passed: Ready to merge

#### 6. Code Review (Optional)
- Team members review code
- Request changes if needed
- Approve when ready

#### 7. Merge
- Click "Merge Pull Request" (only if CI passed)
- Vercel will automatically deploy to production

## 📊 CI/CD Pipeline Details

### GitHub Actions Pipeline

```yaml
Trigger: PR to master
↓
Checkout Code
↓
Setup Node.js 18.x
↓
Install Dependencies (npm ci)
↓
Run ESLint
↓
Run Tests (npm test)
↓
Upload Coverage
↓
Report Status
```

### Vercel Deployment Pipeline

```
Push to master (after merge)
↓
Vercel Detects Push
↓
Clone Repository
↓
Install Dependencies
↓
Build Project (npm run build)
↓
Deploy to CDN
↓
Assign URL
↓
Ready!
```

## 🔍 Monitoring & Logs

### GitHub Actions Logs
1. Go to repository
2. Click "Actions" tab
3. Select workflow run
4. View detailed logs

### Vercel Deployment Logs
1. Go to Vercel Dashboard
2. Select project
3. Click on deployment
4. View build logs

## ⚠️ Troubleshooting

### CI Fails

**Problem:** Tests fail in CI but pass locally

**Solution:**
```bash
# Use same Node version as CI
nvm use 18

# Clean install
rm -rf node_modules package-lock.json
npm install

# Run tests
npm test
```

**Problem:** ESLint errors in CI

**Solution:**
```bash
# Run ESLint locally
npm run lint

# Fix automatically
npm run lint:fix
```

### Vercel Deployment Fails

**Problem:** Build fails on Vercel

**Solution:**
1. Check build logs in Vercel dashboard
2. Ensure `package.json` has correct scripts
3. Check `vercel.json` configuration
4. Verify all dependencies are in `package.json`

**Problem:** App doesn't load after deployment

**Solution:**
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Check environment variables
4. Ensure routing is configured correctly

### Branch Protection Issues

**Problem:** Can't push to master

**Solution:**
- This is correct behavior!
- Create a feature branch instead
- Use Pull Request workflow

**Problem:** Can't merge even though checks passed

**Solution:**
1. Ensure "Require status checks" is enabled
2. Check that the correct status check is selected
3. Verify branch is up to date with master

## ✅ Verification Checklist

Before submission, verify:
- [ ] GitHub Actions CI is configured (`.github/workflows/ci.yml`)
- [ ] Vercel deployment is connected
- [ ] Branch protection is enabled on master
- [ ] Screenshot 1: CI check error ✅
- [ ] Screenshot 2: CI check pass ✅
- [ ] Screenshot 3: Branch protection ✅
- [ ] Application is accessible via Vercel URL
- [ ] All tests pass in CI
- [ ] Deployment is automatic on merge

## 📝 Submission Notes

### Required Information:
1. **Vercel URL**: https://your-project.vercel.app
2. **GitHub Repository**: https://github.com/username/repo
3. **Screenshots**: In `screenshot/` folder

### Screenshot Folder Structure:
```
screenshot/
├── 1_ci_check_error.png
├── 2_ci_check_pass.png
└── 3_branch_protection.png
```

## 🚀 Benefits of CI/CD

### Continuous Integration:
- ✅ Automated testing
- ✅ Code quality checks
- ✅ Early bug detection
- ✅ Team collaboration
- ✅ Consistent standards

### Continuous Deployment:
- ✅ Fast deployment
- ✅ Zero downtime
- ✅ Automatic rollback
- ✅ Preview deployments
- ✅ Production monitoring

### Branch Protection:
- ✅ Code review enforcement
- ✅ Quality gates
- ✅ Protected production
- ✅ Team accountability
- ✅ Audit trail

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Branch Protection Guide](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

---

**Important:** Make sure to set repository to **private** after grading to prevent plagiarism!
