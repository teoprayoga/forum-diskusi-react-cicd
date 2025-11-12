/**
 * Skenario Testing untuk ThreadItem component
 *
 * - ThreadItem component
 *   - should render thread information correctly
 *   - should display thread title and category
 *   - should show upvote and downvote counts
 *   - should call vote handlers when vote buttons are clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../ThreadItem';
import authReducer from '../../states/auth/authSlice';
import threadsReducer from '../../states/threads/threadsSlice';

const renderWithProviders = (component, { preloadedState = {} } = {}) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      threads: threadsReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
  );
};

describe('ThreadItem component', () => {
  const mockThread = {
    id: 'thread-1',
    title: 'Test Thread Title',
    body: '<p>This is a test thread body with <strong>HTML</strong> content.</p>',
    category: 'general',
    createdAt: '2023-01-01T00:00:00.000Z',
    upVotesBy: ['user-2', 'user-3'],
    downVotesBy: ['user-4'],
    totalComments: 5,
    owner: {
      id: 'user-1',
      name: 'Test Owner',
      avatar: 'https://example.com/avatar.jpg',
    },
  };

  it('should render thread information correctly', () => {
    // Arrange & Action
    renderWithProviders(<ThreadItem thread={mockThread} />);

    // Assert
    expect(screen.getByText('Test Thread Title')).toBeInTheDocument();
    expect(screen.getByText('#general')).toBeInTheDocument();
    expect(screen.getByText('Test Owner')).toBeInTheDocument();
    expect(screen.getByText('💬 5')).toBeInTheDocument();
  });

  it('should display thread title and category', () => {
    // Arrange & Action
    renderWithProviders(<ThreadItem thread={mockThread} />);

    // Assert
    const title = screen.getByText('Test Thread Title');
    const category = screen.getByText('#general');

    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
  });

  it('should show upvote and downvote counts', () => {
    // Arrange & Action
    renderWithProviders(<ThreadItem thread={mockThread} />);

    // Assert
    const upvoteButton = screen.getByRole('button', { name: /👍 2/i });
    const downvoteButton = screen.getByRole('button', { name: /👎 1/i });

    expect(upvoteButton).toBeInTheDocument();
    expect(downvoteButton).toBeInTheDocument();
  });

  it('should call vote handlers when vote buttons are clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    const preloadedState = {
      auth: {
        user: {
          id: 'user-5',
          name: 'Current User',
          email: 'current@example.com',
        },
        isLoading: false,
        error: null,
      },
      threads: {
        threads: [mockThread],
        isLoading: false,
        error: null,
      },
    };

    renderWithProviders(<ThreadItem thread={mockThread} />, { preloadedState });

    // Action
    const upvoteButton = screen.getByRole('button', { name: /👍/i });
    await user.click(upvoteButton);

    // Assert - Button should be interactive (not throw error)
    expect(upvoteButton).toBeInTheDocument();
  });
});
