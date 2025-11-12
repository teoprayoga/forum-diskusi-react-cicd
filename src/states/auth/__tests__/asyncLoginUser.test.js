/**
 * Skenario Testing untuk asyncLoginUser thunk
 *
 * - asyncLoginUser thunk
 *   - should dispatch correct actions when login succeeds
 *   - should dispatch correct actions when login fails
 *   - should save token to localStorage when login succeeds
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer, { asyncLoginUser } from '../authSlice';
import { api, putAccessToken } from '../../../utils/api';

// Mock API
jest.mock('../../../utils/api', () => ({
  api: {
    login: jest.fn(),
    getOwnProfile: jest.fn(),
  },
  putAccessToken: jest.fn(),
  getAccessToken: jest.fn(),
  removeAccessToken: jest.fn(),
}));

describe('asyncLoginUser thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    jest.clearAllMocks();
  });

  it('should dispatch correct actions when login succeeds', async () => {
    // Arrange
    const mockToken = 'mock-token-123';
    const mockUser = {
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };
    const loginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    api.login.mockResolvedValue(mockToken);
    api.getOwnProfile.mockResolvedValue(mockUser);

    // Action
    await store.dispatch(asyncLoginUser(loginData));

    // Assert
    const state = store.getState().auth;
    expect(api.login).toHaveBeenCalledWith(loginData);
    expect(putAccessToken).toHaveBeenCalledWith(mockToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should dispatch correct actions when login fails', async () => {
    // Arrange
    const errorMessage = 'Invalid credentials';
    const loginData = {
      email: 'wrong@example.com',
      password: 'wrongpass',
    };

    api.login.mockRejectedValue(new Error(errorMessage));

    // Action
    await store.dispatch(asyncLoginUser(loginData));

    // Assert
    const state = store.getState().auth;
    expect(api.login).toHaveBeenCalledWith(loginData);
    expect(putAccessToken).not.toHaveBeenCalled();
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should save token to localStorage when login succeeds', async () => {
    // Arrange
    const mockToken = 'secure-token-456';
    const mockUser = {
      id: 'user-2',
      name: 'Another User',
      email: 'another@example.com',
    };

    api.login.mockResolvedValue(mockToken);
    api.getOwnProfile.mockResolvedValue(mockUser);

    // Action
    await store.dispatch(
      asyncLoginUser({
        email: 'another@example.com',
        password: 'password456',
      }),
    );

    // Assert
    expect(putAccessToken).toHaveBeenCalledTimes(1);
    expect(putAccessToken).toHaveBeenCalledWith(mockToken);
  });
});
