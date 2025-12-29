describe('Smoke - Logout', () => {
  beforeEach(() => {
    const env = Cypress.env('ENV');
    const email = Cypress.env(`${env}_email`);
    const password = Cypress.env(`${env}_password`);

    cy.visit('/');

    cy.get('input[placeholder="example@mail.com"]')
      .should('be.visible')
      .type(email);

    cy.get('input[type="password"]')
      .should('be.visible')
      .type(password, { log: false });

    cy.contains('button', 'Acceder').should('be.visible').click();

    cy.contains('Cerrar Sesión', { timeout: 10000 }).should('be.visible');
  });

  it('Logs out successfully', () => {
    cy.contains('a', 'Cerrar Sesión').should('be.visible').click();

    cy.contains('button', 'Acceder').should('be.visible');

    cy.url().should('include', '/qa');
  });
});
