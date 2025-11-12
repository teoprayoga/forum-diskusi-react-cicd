/**
 * Skenario Testing untuk asyncGetThreads thunk
 *
 * - asyncGetThreads thunk
 *   - should dispatch correct actions when fetching threads succeeds
 *   - should dispatch correct actions when fetching threads fails
 *   - should populate threads state with received data
 */

import { configureStore } from '@reduxjs/toolkit';
import threadsReducer, { asyncGetThreads } from '../threadsSlice';
import { api } from '../../../utils/api';

// Mock API
jest.mock('../../../utils/api', () => ({
  api: {
    getAllThreads: jest.fn(),
  },
}));

describe('asyncGetThreads thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadsReducer,
      },
    });
    jest.clearAllMocks();
  });

  it('should dispatch correct actions when fetching threads succeeds', async () => {
    // Arrange
    const mockThreads = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Body 1',
        category: 'general',
        createdAt: '2023-01-01',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 5,
      },
      {
        id: 'thread-2',
        title: 'Thread 2',
        body: 'Body 2',
        category: 'tech',
        createdAt: '2023-01-02',
        ownerId: 'user-2',
        upVotesBy: ['user-3'],
        downVotesBy: [],
        totalComments: 3,
      },
    ];

    api.getAllThreads.mockResolvedValue(mockThreads);

    // Action
    await store.dispatch(asyncGetThreads());

    // Assert
    const state = store.getState().threads;
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(state.threads).toEqual(mockThreads);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should dispatch correct actions when fetching threads fails', async () => {
    // Arrange
    const errorMessage = 'Failed to fetch threads';
    api.getAllThreads.mockRejectedValue(new Error(errorMessage));

    // Action
    await store.dispatch(asyncGetThreads());

    // Assert
    const state = store.getState().threads;
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(state.threads).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should populate threads state with received data', async () => {
    // Arrange
    const mockThreads = [
      {
        id: 'thread-1',
        title: 'React Tips',
        body: 'Some React tips...',
        category: 'programming',
        ownerId: 'user-1',
        upVotesBy: ['user-2', 'user-3'],
        downVotesBy: [],
        totalComments: 10,
      },
    ];

    api.getAllThreads.mockResolvedValue(mockThreads);

    // Action
    await store.dispatch(asyncGetThreads());

    // Assert
    const state = store.getState().threads;
    expect(state.threads).toHaveLength(1);
    expect(state.threads[0].title).toBe('React Tips');
    expect(state.threads[0].upVotesBy).toHaveLength(2);
  });
});
