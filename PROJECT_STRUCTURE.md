# Struktur Proyek - Forum Diskusi App

## 📁 Tree Structure

```
forum-diskusi-app/
│
├── public/
│   └── index.html                 # HTML template
│
├── src/
│   ├── components/                # Reusable UI Components
│   │   ├── CategoryFilter.jsx     # Filter category buttons
│   │   ├── CommentItem.jsx        # Comment card component
│   │   ├── LeaderboardItem.jsx    # Leaderboard item card
│   │   ├── LoadingSpinner.jsx     # Loading spinner component
│   │   ├── Navigation.jsx         # Navigation bar component
│   │   └── ThreadItem.jsx         # Thread card component
│   │
│   ├── pages/                     # Page Components
│   │   ├── HomePage.jsx           # Home page with thread list
│   │   ├── LeaderboardPage.jsx    # Leaderboard page
│   │   ├── LoginPage.jsx          # Login page
│   │   ├── NewThreadPage.jsx      # Create new thread page
│   │   ├── RegisterPage.jsx       # Register page
│   │   └── ThreadDetailPage.jsx   # Thread detail page
│   │
│   ├── states/                    # Redux State Management
│   │   ├── auth/
│   │   │   └── authSlice.js       # Auth state & actions
│   │   ├── leaderboards/
│   │   │   └── leaderboardsSlice.js # Leaderboard state
│   │   ├── threadDetail/
│   │   │   └── threadDetailSlice.js # Thread detail state
│   │   ├── threads/
│   │   │   └── threadsSlice.js    # Threads list state
│   │   ├── users/
│   │   │   └── usersSlice.js      # Users state
│   │   └── store.js               # Redux store config
│   │
│   ├── utils/                     # Utility Functions
│   │   ├── api.js                 # API service layer
│   │   └── helpers.js             # Helper functions
│   │
│   ├── App.jsx                    # Main App component
│   ├── index.jsx                  # Entry point
│   └── index.css                  # Global styles
│
├── .eslintrc.json                 # ESLint configuration
├── .gitignore                     # Git ignore file
├── package.json                   # Dependencies & scripts
├── README.md                      # Main documentation
├── SETUP_GUIDE.md                 # Setup guide
├── KRITERIA_CHECKLIST.md          # Criteria checklist
└── API_REFERENCE.md               # API documentation
```

## 📂 Folder Details

### `/public`
Berisi file HTML template dan asset statis.

**File:**
- `index.html` - HTML template dengan div#root untuk React mounting

### `/src/components`
Berisi **presentational components** yang reusable.

#### `CategoryFilter.jsx`
- **Purpose**: Filter threads by category
- **Props**: `categories`, `selectedCategory`, `onSelectCategory`
- **Used in**: HomePage

#### `CommentItem.jsx`
- **Purpose**: Display single comment with voting
- **Props**: `comment`, `threadId`
- **Features**: 
  - Show comment content (HTML)
  - Show owner info (name, avatar)
  - Vote buttons (up/down)
  - Time posted
- **Used in**: ThreadDetailPage

#### `LeaderboardItem.jsx`
- **Purpose**: Display leaderboard entry
- **Props**: `user`, `rank`
- **Features**:
  - Show rank (with medals for top 3)
  - Show user info
  - Show score
- **Used in**: LeaderboardPage

#### `LoadingSpinner.jsx`
- **Purpose**: Display loading animation
- **Props**: None
- **Features**: CSS animation spinner
- **Used in**: All pages with async operations

#### `Navigation.jsx`
- **Purpose**: Global navigation bar
- **Features**:
  - Show logo and brand
  - Show nav links (Home, Leaderboard)
  - Show auth buttons (Login/Register) when not logged in
  - Show user info and logout when logged in
  - Show "New Thread" button for logged in users
- **Redux**: Connected to auth state
- **Used in**: App.jsx

#### `ThreadItem.jsx`
- **Purpose**: Display thread card in list
- **Props**: `thread`
- **Features**:
  - Show thread info (title, category, body excerpt)
  - Show owner info
  - Show time, comment count
  - Vote buttons with optimistic updates
  - Clickable to detail page
- **Used in**: HomePage

### `/src/pages`
Berisi **container components** untuk setiap page/route.

#### `HomePage.jsx`
- **Route**: `/`
- **Purpose**: Display list of all threads
- **Features**:
  - Fetch threads and users on mount
  - Merge thread with owner data
  - Category filter
  - Show ThreadItem for each thread
- **Redux**: threads, users state

#### `LeaderboardPage.jsx`
- **Route**: `/leaderboards`
- **Purpose**: Display user leaderboard
- **Features**:
  - Fetch leaderboards on mount
  - Show LeaderboardItem for each entry
- **Redux**: leaderboards state

#### `LoginPage.jsx`
- **Route**: `/login`
- **Purpose**: User login form
- **Features**:
  - Email and password input
  - Form validation
  - Redirect to home after success
  - Link to register page
- **Redux**: auth state, asyncLoginUser action

#### `NewThreadPage.jsx`
- **Route**: `/new-thread`
- **Purpose**: Create new thread form
- **Features**:
  - Title, category, body input
  - Form validation
  - Require authentication
  - Redirect to home after success
- **Redux**: threads state, asyncCreateThread action

#### `RegisterPage.jsx`
- **Route**: `/register`
- **Purpose**: User registration form
- **Features**:
  - Name, email, password input
  - Form validation
  - Redirect to login after success
  - Link to login page
- **Redux**: auth state, asyncRegisterUser action

#### `ThreadDetailPage.jsx`
- **Route**: `/threads/:id`
- **Purpose**: Display thread detail with comments
- **Features**:
  - Fetch thread detail on mount
  - Show full thread info
  - Vote buttons for thread
  - Comment form
  - List of comments with voting
  - Require auth for commenting and voting
- **Redux**: threadDetail state, multiple actions

### `/src/states`
Berisi **Redux state management** dengan Redux Toolkit.

#### `auth/authSlice.js`
**State:**
```javascript
{
  user: {
    id, name, email, avatar
  },
  isLoading: boolean,
  error: string | null
}
```

**Actions:**
- `asyncRegisterUser` - Register new user
- `asyncLoginUser` - Login user
- `asyncGetProfile` - Get user profile
- `setAuthUser` - Set auth user
- `unsetAuthUser` - Logout user

#### `threads/threadsSlice.js`
**State:**
```javascript
{
  threads: [],
  isLoading: boolean,
  error: string | null
}
```

**Actions:**
- `asyncGetThreads` - Fetch all threads
- `asyncCreateThread` - Create new thread
- `asyncUpVoteThread` - Up-vote thread
- `asyncDownVoteThread` - Down-vote thread
- `asyncNeutralVoteThread` - Neutral vote thread
- `upVoteThreadOptimistic` - Optimistic update
- `downVoteThreadOptimistic` - Optimistic update

#### `threadDetail/threadDetailSlice.js`
**State:**
```javascript
{
  thread: {
    ...threadData,
    comments: []
  },
  isLoading: boolean,
  error: string | null
}
```

**Actions:**
- `asyncGetThreadDetail` - Fetch thread detail
- `asyncCreateComment` - Create comment
- `asyncUpVoteThreadDetail` - Up-vote thread
- `asyncDownVoteThreadDetail` - Down-vote thread
- `asyncNeutralVoteThreadDetail` - Neutral vote
- `asyncUpVoteComment` - Up-vote comment
- `asyncDownVoteComment` - Down-vote comment
- Optimistic update actions

#### `users/usersSlice.js`
**State:**
```javascript
{
  users: [],
  isLoading: boolean,
  error: string | null
}
```

**Actions:**
- `asyncGetUsers` - Fetch all users

#### `leaderboards/leaderboardsSlice.js`
**State:**
```javascript
{
  leaderboards: [],
  isLoading: boolean,
  error: string | null
}
```

**Actions:**
- `asyncGetLeaderboards` - Fetch leaderboards

#### `store.js`
Redux store configuration combining all slices.

### `/src/utils`

#### `api.js`
**Purpose**: API service layer

**Functions:**
- `api.register()` - Register user
- `api.login()` - Login user
- `api.getOwnProfile()` - Get profile
- `api.getAllUsers()` - Get all users
- `api.getAllThreads()` - Get threads
- `api.createThread()` - Create thread
- `api.getThreadDetail()` - Get detail
- `api.createComment()` - Create comment
- Vote functions (up/down/neutral for thread/comment)
- `api.getLeaderboards()` - Get leaderboards

**Helper Functions:**
- `getAccessToken()` - Get token from localStorage
- `putAccessToken()` - Save token to localStorage
- `removeAccessToken()` - Remove token

#### `helpers.js`
**Purpose**: Helper utility functions

**Functions:**
- `formatDate(dateString)` - Format date to readable format
- `truncateText(text, maxLength)` - Truncate text with ellipsis
- `postedAt(date)` - Convert date to relative time (e.g., "2 jam yang lalu")

### Root Files

#### `App.jsx`
- Main application component
- Setup React Router
- Check authentication on mount
- Define all routes

#### `index.jsx`
- Entry point
- Render React app
- Setup Redux Provider
- Setup React Router
- Wrap with StrictMode

#### `index.css`
- Global CSS styles
- Component styles
- Responsive design
- Color scheme and typography

## 🔄 Data Flow

### 1. Component Mount
```
Component → dispatch(asyncAction) → API Call → Update Redux State → Re-render Component
```

### 2. User Interaction
```
User Click → Event Handler → dispatch(action) → State Update → UI Update
```

### 3. Optimistic Updates
```
User Click → Optimistic Update (UI) → API Call → Server Confirmation
```

## 🎨 Styling Strategy

- **Global styles** in `index.css`
- **Component-specific** styles with class names
- **Responsive design** with media queries
- **Color scheme**: Blue primary, Green success, Red danger
- **Modern UI**: Cards, shadows, hover effects

## 🔐 Authentication Flow

1. User login/register
2. Token received from API
3. Token saved to localStorage
4. Token sent in Authorization header for protected endpoints
5. On app reload, check for token and fetch user profile
6. On logout, remove token from localStorage

## 📱 Routing Strategy

- `/` - Home (public)
- `/login` - Login (public, redirect if logged in)
- `/register` - Register (public, redirect if logged in)
- `/threads/:id` - Thread Detail (public)
- `/new-thread` - New Thread (protected, redirect to login)
- `/leaderboards` - Leaderboard (public)

## 🚀 Performance Optimizations

1. **useMemo** for computed values (filtered threads, categories)
2. **Optimistic updates** for instant UI feedback
3. **Component splitting** for code organization
4. **Lazy loading** potential for routes (not implemented yet)

## 🧪 Testing Considerations

### Unit Tests (dapat ditambahkan):
- Redux slices
- Helper functions
- Individual components

### Integration Tests (dapat ditambahkan):
- User flows (login, create thread, comment)
- API integration

### E2E Tests (dapat ditambahkan):
- Full user journeys

---

This structure follows **Clean Architecture** principles with clear separation of concerns and modular, reusable components.
