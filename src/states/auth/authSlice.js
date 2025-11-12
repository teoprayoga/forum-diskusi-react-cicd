import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, putAccessToken, removeAccessToken } from '../../utils/api';

export const asyncRegisterUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await api.register({ name, email, password });
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncLoginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const token = await api.login({ email, password });
      putAccessToken(token);
      const user = await api.getOwnProfile();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const user = await api.getOwnProfile();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    unsetAuthUser: (state) => {
      state.user = null;
      removeAccessToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncRegisterUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(asyncRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(asyncLoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(asyncLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(asyncGetProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncGetProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(asyncGetProfile.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

export const { setAuthUser, unsetAuthUser } = authSlice.actions;
export default authSlice.reducer;
