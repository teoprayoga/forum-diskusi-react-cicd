/**
 * Skenario Testing untuk threadsSlice
 *
 * - threadsSlice reducer
 *   - should return initial state when given unknown action
 *   - should handle upVoteThreadOptimistic when user hasn't voted
 *   - should handle upVoteThreadOptimistic when user already upvoted (toggle off)
 *   - should handle downVoteThreadOptimistic when user has upvoted (switch to downvote)
 *   - should handle asyncGetThreads.pending correctly
 *   - should handle asyncGetThreads.fulfilled correctly
 *   - should handle asyncCreateThread.fulfilled correctly
 */

import threadsReducer, {
  upVoteThreadOptimistic,
  downVoteThreadOptimistic,
  asyncGetThreads,
  asyncCreateThread,
} from '../threadsSlice';

describe('threadsSlice reducer', () => {
  const initialState = {
    threads: [],
    isLoading: false,
    error: null,
  };

  it('should return initial state when given unknown action', () => {
    // Arrange
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = threadsReducer(undefined, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle upVoteThreadOptimistic when user hasn\'t voted', () => {
    // Arrange
    const previousState = {
      threads: [
        {
          id: 'thread-1',
          title: 'Test Thread',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      isLoading: false,
      error: null,
    };
    const action = upVoteThreadOptimistic({
      threadId: 'thread-1',
      userId: 'user-1',
    });

    // Action
    const nextState = threadsReducer(previousState, action);

    // Assert
    expect(nextState.threads[0].upVotesBy).toContain('user-1');
    expect(nextState.threads[0].downVotesBy).not.toContain('user-1');
  });

  it('should handle upVoteThreadOptimistic when user already upvoted (toggle off)', () => {
    // Arrange
    const previousState = {
      threads: [
        {
          id: 'thread-1',
          title: 'Test Thread',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
      isLoading: false,
      error: null,
    };
    const action = upVoteThreadOptimistic({
      threadId: 'thread-1',
      userId: 'user-1',
    });

    // Action
    const nextState = threadsReducer(previousState, action);

    // Assert
    expect(nextState.threads[0].upVotesBy).not.toContain('user-1');
  });

  it('should handle downVoteThreadOptimistic when user has upvoted (switch to downvote)', () => {
    // Arrange
    const previousState = {
      threads: [
        {
          id: 'thread-1',
          title: 'Test Thread',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
      isLoading: false,
      error: null,
    };
    const action = downVoteThreadOptimistic({
      threadId: 'thread-1',
      userId: 'user-1',
    });

    // Action
    const nextState = threadsReducer(previousState, action);

    // Assert
    expect(nextState.threads[0].upVotesBy).not.toContain('user-1');
    expect(nextState.threads[0].downVotesBy).toContain('user-1');
  });

  it('should handle asyncGetThreads.pending correctly', () => {
    // Arrange
    const action = { type: asyncGetThreads.pending.type };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle asyncGetThreads.fulfilled correctly', () => {
    // Arrange
    const threads = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Body 1',
      },
      {
        id: 'thread-2',
        title: 'Thread 2',
        body: 'Body 2',
      },
    ];
    const action = {
      type: asyncGetThreads.fulfilled.type,
      payload: threads,
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState.isLoading).toBe(false);
    expect(nextState.threads).toEqual(threads);
    expect(nextState.error).toBeNull();
  });

  it('should handle asyncCreateThread.fulfilled correctly', () => {
    // Arrange
    const existingThreads = [
      {
        id: 'thread-1',
        title: 'Existing Thread',
      },
    ];
    const previousState = {
      threads: existingThreads,
      isLoading: true,
      error: null,
    };
    const newThread = {
      id: 'thread-2',
      title: 'New Thread',
      body: 'New body',
    };
    const action = {
      type: asyncCreateThread.fulfilled.type,
      payload: { thread: newThread },
    };

    // Action
    const nextState = threadsReducer(previousState, action);

    // Assert
    expect(nextState.isLoading).toBe(false);
    expect(nextState.threads).toHaveLength(2);
    expect(nextState.threads[0]).toEqual(newThread); // New thread should be first
    expect(nextState.threads[1]).toEqual(existingThreads[0]);
  });
});
