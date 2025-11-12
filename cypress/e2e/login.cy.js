/**
 * Skenario Testing E2E - Login Flow
 *
 * - Login Flow
 *   - should display login page correctly
 *   - should show error message when login with wrong credentials
 *   - should login successfully with correct credentials
 *   - should redirect to homepage after successful login
 *   - should display user info in navigation after login
 */

describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display login page correctly', () => {
    // Arrange & Action
    cy.contains('Login').click();

    // Assert
    cy.url().should('include', '/login');
    cy.contains('Masuk ke akun Anda').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Login');
  });

  it('should show error message when login with wrong credentials', () => {
    // Arrange
    cy.contains('Login').click();

    // Action
    cy.get('input[type="email"]').type('wrong@email.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Assert
    cy.get('.error-message', { timeout: 10000 }).should('be.visible');
  });

  it('should login successfully with correct credentials', () => {
    // Arrange
    cy.contains('Login').click();

    // Action
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assert - Should redirect and show user info
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');
  });

  it('should redirect to homepage after successful login', () => {
    // Arrange
    cy.contains('Login').click();

    // Action
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assert
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should display user info in navigation after login', () => {
    // Arrange
    cy.contains('Login').click();
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Wait for redirect
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');

    // Assert - User info should be visible
    cy.get('.user-info', { timeout: 5000 }).should('be.visible');
    cy.contains('Logout').should('be.visible');
  });
});
