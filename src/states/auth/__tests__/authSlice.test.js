/**
 * Skenario Testing untuk authSlice
 *
 * - authSlice reducer
 *   - should return initial state when given unknown action
 *   - should handle setAuthUser action correctly
 *   - should handle unsetAuthUser action correctly
 *   - should handle asyncLoginUser.pending correctly
 *   - should handle asyncLoginUser.fulfilled correctly
 *   - should handle asyncLoginUser.rejected correctly
 */

import authReducer, {
  setAuthUser,
  unsetAuthUser,
  asyncLoginUser,
} from '../authSlice';

describe('authSlice reducer', () => {
  const initialState = {
    user: null,
    isLoading: false,
    error: null,
  };

  it('should return initial state when given unknown action', () => {
    // Arrange
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = authReducer(undefined, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle setAuthUser action correctly', () => {
    // Arrange
    const user = {
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };

    // Action
    const nextState = authReducer(initialState, setAuthUser(user));

    // Assert
    expect(nextState.user).toEqual(user);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('should handle unsetAuthUser action correctly', () => {
    // Arrange
    const previousState = {
      user: {
        id: 'user-1',
        name: 'Test User',
        email: 'test@example.com',
      },
      isLoading: false,
      error: null,
    };

    // Action
    const nextState = authReducer(previousState, unsetAuthUser());

    // Assert
    expect(nextState.user).toBeNull();
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('should handle asyncLoginUser.pending correctly', () => {
    // Arrange
    const action = { type: asyncLoginUser.pending.type };

    // Action
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle asyncLoginUser.fulfilled correctly', () => {
    // Arrange
    const user = {
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };
    const action = {
      type: asyncLoginUser.fulfilled.type,
      payload: user,
    };

    // Action
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(user);
    expect(nextState.error).toBeNull();
  });

  it('should handle asyncLoginUser.rejected correctly', () => {
    // Arrange
    const errorMessage = 'Invalid credentials';
    const action = {
      type: asyncLoginUser.rejected.type,
      payload: errorMessage,
    };

    // Action
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toBeNull();
    expect(nextState.error).toBe(errorMessage);
  });
});
