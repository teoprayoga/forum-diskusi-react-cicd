import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const asyncGetLeaderboards = createAsyncThunk(
  'leaderboards/getLeaderboards',
  async (_, { rejectWithValue }) => {
    try {
      const leaderboards = await api.getLeaderboards();
      return leaderboards;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: {
    leaderboards: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetLeaderboards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncGetLeaderboards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaderboards = action.payload;
      })
      .addCase(asyncGetLeaderboards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default leaderboardsSlice.reducer;
