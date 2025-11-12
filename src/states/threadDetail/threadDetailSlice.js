import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const asyncGetThreadDetail = createAsyncThunk(
  'threadDetail/getDetail',
  async (threadId, { rejectWithValue }) => {
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      return threadDetail;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncCreateComment = createAsyncThunk(
  'threadDetail/createComment',
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      const comment = await api.createComment({ threadId, content });
      return comment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpVoteThreadDetail = createAsyncThunk(
  'threadDetail/upVote',
  async (threadId, { rejectWithValue }) => {
    try {
      await api.upVoteThread(threadId);
      return { voteType: 'up-vote' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDownVoteThreadDetail = createAsyncThunk(
  'threadDetail/downVote',
  async (threadId, { rejectWithValue }) => {
    try {
      await api.downVoteThread(threadId);
      return { voteType: 'down-vote' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncNeutralVoteThreadDetail = createAsyncThunk(
  'threadDetail/neutralVote',
  async (threadId, { rejectWithValue }) => {
    try {
      await api.neutralVoteThread(threadId);
      return { voteType: 'neutral' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncUpVoteComment = createAsyncThunk(
  'threadDetail/upVoteComment',
  async ({ threadId, commentId }, { rejectWithValue }) => {
    try {
      await api.upVoteComment({ threadId, commentId });
      return { commentId, voteType: 'up-vote' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncDownVoteComment = createAsyncThunk(
  'threadDetail/downVoteComment',
  async ({ threadId, commentId }, { rejectWithValue }) => {
    try {
      await api.downVoteComment({ threadId, commentId });
      return { commentId, voteType: 'down-vote' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: {
    thread: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearThreadDetail: (state) => {
      state.thread = null;
      state.error = null;
    },
    upVoteThreadDetailOptimistic: (state, action) => {
      const { userId } = action.payload;
      if (state.thread) {
        const isUpVoted = state.thread.upVotesBy.includes(userId);
        const isDownVoted = state.thread.downVotesBy.includes(userId);

        if (isUpVoted) {
          state.thread.upVotesBy = state.thread.upVotesBy.filter((id) => id !== userId);
        } else {
          if (isDownVoted) {
            state.thread.downVotesBy = state.thread.downVotesBy.filter((id) => id !== userId);
          }
          state.thread.upVotesBy.push(userId);
        }
      }
    },
    downVoteThreadDetailOptimistic: (state, action) => {
      const { userId } = action.payload;
      if (state.thread) {
        const isUpVoted = state.thread.upVotesBy.includes(userId);
        const isDownVoted = state.thread.downVotesBy.includes(userId);

        if (isDownVoted) {
          state.thread.downVotesBy = state.thread.downVotesBy.filter((id) => id !== userId);
        } else {
          if (isUpVoted) {
            state.thread.upVotesBy = state.thread.upVotesBy.filter((id) => id !== userId);
          }
          state.thread.downVotesBy.push(userId);
        }
      }
    },
    upVoteCommentOptimistic: (state, action) => {
      const { commentId, userId } = action.payload;
      if (state.thread) {
        const comment = state.thread.comments.find((c) => c.id === commentId);
        if (comment) {
          const isUpVoted = comment.upVotesBy.includes(userId);
          const isDownVoted = comment.downVotesBy.includes(userId);

          if (isUpVoted) {
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
          } else {
            if (isDownVoted) {
              comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
            }
            comment.upVotesBy.push(userId);
          }
        }
      }
    },
    downVoteCommentOptimistic: (state, action) => {
      const { commentId, userId } = action.payload;
      if (state.thread) {
        const comment = state.thread.comments.find((c) => c.id === commentId);
        if (comment) {
          const isUpVoted = comment.upVotesBy.includes(userId);
          const isDownVoted = comment.downVotesBy.includes(userId);

          if (isDownVoted) {
            comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
          } else {
            if (isUpVoted) {
              comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
            }
            comment.downVotesBy.push(userId);
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetThreadDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncGetThreadDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.thread = action.payload;
      })
      .addCase(asyncGetThreadDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(asyncCreateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncCreateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.thread) {
          state.thread.comments.unshift(action.payload.comment);
        }
      })
      .addCase(asyncCreateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearThreadDetail,
  upVoteThreadDetailOptimistic,
  downVoteThreadDetailOptimistic,
  upVoteCommentOptimistic,
  downVoteCommentOptimistic,
} = threadDetailSlice.actions;

export default threadDetailSlice.reducer;
