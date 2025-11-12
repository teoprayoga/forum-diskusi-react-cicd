/**
 * Skenario Testing E2E - Login Flow
 *
 * - Login Flow
 *   - should display login page correctly
 *   - should show all required form elements
 *   - should be able to type in email and password fields
 *   - should navigate to register page from login page
 *   - should show validation error when submitting empty form
 */

describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
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

  it('should show all required form elements', () => {
    // Arrange
    cy.visit('/login');

    // Assert
    cy.get('h2').should('contain', 'Login');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
    cy.contains('Belum punya akun?').should('be.visible');
    cy.contains('Daftar di sini').should('be.visible');
  });

  it('should be able to type in email and password fields', () => {
    // Arrange
    cy.visit('/login');

    // Action
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');

    // Assert
    cy.get('input[type="email"]').should('have.value', 'test@example.com');
    cy.get('input[type="password"]').should('have.value', 'password123');
  });

  it('should navigate to register page from login page', () => {
    // Arrange
    cy.visit('/login');

    // Action
    cy.contains('Daftar di sini').click();

    // Assert
    cy.url().should('include', '/register');
    cy.contains('Daftar Akun').should('be.visible');
  });

  it('should show validation error when submitting empty form', () => {
    // Arrange
    cy.visit('/login');

    // Action - Try to submit without filling form
    cy.get('button[type="submit"]').click();

    // Assert - React Hook Form validation should show
    cy.contains('Email harus diisi').should('be.visible');
  });
});
