# Testing Documentation

Dokumentasi lengkap untuk automation testing di Forum Diskusi App.

## 📋 Overview

Proyek ini mengimplementasikan **3 jenis testing**:
1. **Unit Tests** - Testing reducer dan utility functions
2. **Integration Tests** - Testing thunk functions dan component integration
3. **End-to-End Tests** - Testing user flow lengkap dengan Cypress

## 🧪 Test Files

### Unit Tests - Reducers

#### 1. authSlice.test.js
**Location:** `src/states/auth/__tests__/authSlice.test.js`

**Skenario Testing:**
- ✅ Should return initial state when given unknown action
- ✅ Should handle setAuthUser action correctly
- ✅ Should handle unsetAuthUser action correctly
- ✅ Should handle asyncLoginUser.pending correctly
- ✅ Should handle asyncLoginUser.fulfilled correctly
- ✅ Should handle asyncLoginUser.rejected correctly

**Run:**
```bash
npm test authSlice.test
```

#### 2. threadsSlice.test.js
**Location:** `src/states/threads/__tests__/threadsSlice.test.js`

**Skenario Testing:**
- ✅ Should return initial state when given unknown action
- ✅ Should handle upVoteThreadOptimistic when user hasn't voted
- ✅ Should handle upVoteThreadOptimistic when user already upvoted (toggle off)
- ✅ Should handle downVoteThreadOptimistic when user has upvoted (switch to downvote)
- ✅ Should handle asyncGetThreads.pending correctly
- ✅ Should handle asyncGetThreads.fulfilled correctly
- ✅ Should handle asyncCreateThread.fulfilled correctly

**Run:**
```bash
npm test threadsSlice.test
```

### Integration Tests - Thunk Functions

#### 3. asyncLoginUser.test.js
**Location:** `src/states/auth/__tests__/asyncLoginUser.test.js`

**Skenario Testing:**
- ✅ Should dispatch correct actions when login succeeds
- ✅ Should dispatch correct actions when login fails
- ✅ Should save token to localStorage when login succeeds

**Run:**
```bash
npm test asyncLoginUser.test
```

#### 4. asyncGetThreads.test.js
**Location:** `src/states/threads/__tests__/asyncGetThreads.test.js`

**Skenario Testing:**
- ✅ Should dispatch correct actions when fetching threads succeeds
- ✅ Should dispatch correct actions when fetching threads fails
- ✅ Should populate threads state with received data

**Run:**
```bash
npm test asyncGetThreads.test
```

### Component Tests

#### 5. ThreadItem.test.jsx
**Location:** `src/components/__tests__/ThreadItem.test.jsx`

**Skenario Testing:**
- ✅ Should render thread information correctly
- ✅ Should display thread title and category
- ✅ Should show upvote and downvote counts
- ✅ Should call vote handlers when vote buttons are clicked

**Run:**
```bash
npm test ThreadItem.test
```

#### 6. Navigation.test.jsx
**Location:** `src/components/__tests__/Navigation.test.jsx`

**Skenario Testing:**
- ✅ Should render login and register buttons when user is not logged in
- ✅ Should render user info and logout button when user is logged in
- ✅ Should render navigation links (Home, Leaderboard)
- ✅ Should call logout handler when logout button is clicked

**Run:**
```bash
npm test Navigation.test
```

### End-to-End Tests

#### 7. login.cy.js
**Location:** `cypress/e2e/login.cy.js`

**Skenario Testing:**
- ✅ Should display login page correctly
- ✅ Should show error message when login with wrong credentials
- ✅ Should login successfully with correct credentials
- ✅ Should redirect to homepage after successful login
- ✅ Should display user info in navigation after login

**Run:**
```bash
# Start app first
npm start

# In another terminal
npm run e2e
```

## 🚀 Running Tests

### Run All Unit & Integration Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Run E2E Tests
```bash
# Start development server first
npm start

# In another terminal, run Cypress
npm run e2e

# Or open Cypress GUI
npm run e2e:open
```

## 📊 Test Coverage

Target minimum coverage:
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

View coverage report:
```bash
npm test -- --coverage
open coverage/lcov-report/index.html
```

## 🛠️ Testing Tools

### Jest
- **Testing framework** untuk unit dan integration tests
- **Configuration**: Built-in dengan Create React App
- **Matchers**: expect, toBe, toEqual, toHaveBeenCalled, etc.

### React Testing Library
- **Component testing** library
- **Philosophy**: Test components as users interact with them
- **Utilities**: render, screen, fireEvent, waitFor, userEvent

### Cypress
- **E2E testing** framework
- **Features**: 
  - Visual testing
  - Time travel debugging
  - Automatic waiting
  - Network stubbing

## 📝 Writing Tests Best Practices

### 1. Test Structure (AAA Pattern)
```javascript
it('should do something', () => {
  // Arrange - Setup
  const input = 'test';
  
  // Act - Execute
  const result = someFunction(input);
  
  // Assert - Verify
  expect(result).toBe('expected');
});
```

### 2. Test Naming
- ✅ Descriptive: "should return user when login succeeds"
- ❌ Vague: "test login"

### 3. Test Independence
- Each test should be independent
- Use `beforeEach` for setup
- Don't rely on test execution order

### 4. Mock External Dependencies
```javascript
jest.mock('../utils/api', () => ({
  api: {
    login: jest.fn(),
  },
}));
```

### 5. Test User Behavior
```javascript
// ✅ Good - Test user interaction
await user.click(screen.getByRole('button', { name: 'Submit' }));

// ❌ Bad - Test implementation details
wrapper.find('button').simulate('click');
```

## 🔍 Debugging Tests

### Jest
```bash
# Run specific test file
npm test -- authSlice.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should handle login"

# Debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Cypress
```bash
# Open Cypress GUI for debugging
npm run e2e:open

# Run specific test file
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## 📚 Test Scenarios Summary

| Type | Count | Coverage |
|------|-------|----------|
| Reducer Tests | 13 | authSlice, threadsSlice |
| Thunk Tests | 6 | asyncLoginUser, asyncGetThreads |
| Component Tests | 8 | ThreadItem, Navigation |
| E2E Tests | 5 | Login flow |
| **Total** | **32** | Full application coverage |

## ✅ Verification Checklist

Before submitting, ensure:
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All component tests pass
- [ ] E2E tests pass (login flow)
- [ ] Test coverage meets minimum requirements
- [ ] All test files have proper skenario comments
- [ ] `npm test` runs without errors
- [ ] `npm run e2e` runs without errors

## 🎯 CI Integration

Tests are automatically run in CI pipeline:
- **Trigger**: Every pull request to master
- **Steps**:
  1. Checkout code
  2. Install dependencies
  3. Run ESLint
  4. Run all tests
  5. Upload coverage
- **Config**: `.github/workflows/ci.yml`

## 📖 Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Note:** Semua test harus pass sebelum merge ke master branch!
