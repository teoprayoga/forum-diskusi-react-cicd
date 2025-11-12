/**
 * Skenario Testing untuk Navigation component
 *
 * - Navigation component
 *   - should render login and register buttons when user is not logged in
 *   - should render user info and logout button when user is logged in
 *   - should render navigation links (Home, Leaderboard)
 *   - should call logout handler when logout button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Navigation from '../Navigation';
import authReducer from '../../states/auth/authSlice';

const renderWithProviders = (component, { preloadedState = {} } = {}) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
  );
};

describe('Navigation component', () => {
  it('should render login and register buttons when user is not logged in', () => {
    // Arrange
    const preloadedState = {
      auth: {
        user: null,
        isLoading: false,
        error: null,
      },
    };

    // Action
    renderWithProviders(<Navigation />, { preloadedState });

    // Assert
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should render user info and logout button when user is logged in', () => {
    // Arrange
    const preloadedState = {
      auth: {
        user: {
          id: 'user-1',
          name: 'Test User',
          email: 'test@example.com',
          avatar: 'https://example.com/avatar.jpg',
        },
        isLoading: false,
        error: null,
      },
    };

    // Action
    renderWithProviders(<Navigation />, { preloadedState });

    // Assert
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
  });

  it('should render navigation links (Home, Leaderboard)', () => {
    // Arrange
    const preloadedState = {
      auth: {
        user: null,
        isLoading: false,
        error: null,
      },
    };

    // Action
    renderWithProviders(<Navigation />, { preloadedState });

    // Assert
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('💬 Forum Diskusi')).toBeInTheDocument();
  });

  it('should call logout handler when logout button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    const preloadedState = {
      auth: {
        user: {
          id: 'user-1',
          name: 'Test User',
          email: 'test@example.com',
          avatar: 'https://example.com/avatar.jpg',
        },
        isLoading: false,
        error: null,
      },
    };

    renderWithProviders(<Navigation />, { preloadedState });

    // Action
    const logoutButton = screen.getByText('Logout');
    await user.click(logoutButton);

    // Assert - After logout, Login button should appear
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
