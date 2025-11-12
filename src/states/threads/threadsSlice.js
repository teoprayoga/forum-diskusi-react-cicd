import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const asyncGetThreads = createAsyncThunk(
  'threads/getThreads',
  async (_, { rejectWithValue }) => {
    try {
      const threads = await api.getAllThreads();
      return threads;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncCreateThread = createAsyncThunk(
  'threads/createThread',
  async ({ title, body, category }, { rejectWithValue }) => {
    try {
      const thread = await api.createThread({ title, body, category });
      return thread;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpVoteThread = createAsyncThunk(
  'threads/upVote',
  async (threadId, { rejectWithValue }) => {
    try {
      await api.upVoteThread(threadId);
      return { threadId, voteType: 'up-vote' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDownVoteThread = createAsyncThunk(
  'threads/downVote',
  async (threadId, { rejectWithValue }) => {
    try {
      await api.downVoteThread(threadId);
      return { threadId, voteType: 'down-vote' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncNeutralVoteThread = createAsyncThunk(
  'threads/neutralVote',
  async (threadId, { rejectWithValue }) => {
    try {
      await api.neutralVoteThread(threadId);
      return { threadId, voteType: 'neutral' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    threads: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    upVoteThreadOptimistic: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.threads.find((t) => t.id === threadId);
      if (thread) {
        const isUpVoted = thread.upVotesBy.includes(userId);
        const isDownVoted = thread.downVotesBy.includes(userId);

        if (isUpVoted) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        } else {
          if (isDownVoted) {
            thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
          }
          thread.upVotesBy.push(userId);
        }
      }
    },
    downVoteThreadOptimistic: (state, action) => {
      const { threadId, userId } = action.payload;
      const thread = state.threads.find((t) => t.id === threadId);
      if (thread) {
        const isUpVoted = thread.upVotesBy.includes(userId);
        const isDownVoted = thread.downVotesBy.includes(userId);

        if (isDownVoted) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        } else {
          if (isUpVoted) {
            thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
          }
          thread.downVotesBy.push(userId);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetThreads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncGetThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads = action.payload;
      })
      .addCase(asyncGetThreads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(asyncCreateThread.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncCreateThread.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads.unshift(action.payload.thread);
      })
      .addCase(asyncCreateThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { upVoteThreadOptimistic, downVoteThreadOptimistic } = threadsSlice.actions;
export default threadsSlice.reducer;
