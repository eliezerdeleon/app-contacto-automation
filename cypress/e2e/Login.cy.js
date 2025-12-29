describe('Smoke - Login', () => {
  it('Logs in successfully', () => {
    const env = Cypress.env('ENV');
    const email = Cypress.env(`${env}_email`);
    const password = Cypress.env(`${env}_password`);

    cy.visit('/');

    // Email: type="text" + placeholder
    cy.get('input[placeholder="example@mail.com"]')
      .should('be.visible')
      .type(email);

    // Password: type="password"
    cy.get('input[type="password"]')
      .should('be.visible')
      .type(password, { log: false });

    // Button: by text
    cy.contains('button', 'Acceder').should('be.visible').click();

    // Assert básico post-login (ajústalo a algo real en tu app)
    // Por ejemplo, que ya no se vea el botón Acceder o que aparezca un menú/dashboard
    cy.contains('button', 'Acceder').should('not.exist');
  });
});
