describe('Smoke - Login', () => {
  it('Logs in successfully', () => {
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

    cy.contains('button', 'Acceder').should('not.exist');
  });
});
