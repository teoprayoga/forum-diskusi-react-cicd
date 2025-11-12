import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import threadsReducer from './threads/threadsSlice';
import threadDetailReducer from './threadDetail/threadDetailSlice';
import usersReducer from './users/usersSlice';
import leaderboardsReducer from './leaderboards/leaderboardsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
