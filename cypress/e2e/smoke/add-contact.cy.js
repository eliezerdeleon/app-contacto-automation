Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("reading 'replace'")) {
    return false; // no fallar el test por ese error
  }
});

describe('Smoke - Add Contact', () => {
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

    cy.wait(1000); // espera 1 segundo

    cy.contains('button', 'Añadir Contacto', { timeout: 10000 }).should(
      'be.visible'
    );
  });

  it('Creates a new contact successfully', () => {
    const unique = Date.now();
    const name = `Smoke ${unique}`;
    const emailContact = `smoke_${unique}@mail.com`;
    const company = `TEST FROM QA AUTOMATION`;
    const note = `Created by Cypress smoke - ${unique}`;

    // 1) Abrir "Crear Contacto"
    cy.contains('button', 'Añadir Contacto').click();

    // 2) Llenar formulario usando labels/placeholders
    cy.get('input[placeholder="Nombre / Apellido"]')
      .should('be.visible')
      .type(name);
    cy.get('input[placeholder="(000)-000-0000"]')
      .should('be.visible')
      .click()
      .realType('8095551234', { delay: 100 });

    cy.get('input[placeholder="example@mail.com"]')
      .should('be.visible')
      .click()
      .realType('testmail1234566@mail.com');

    // "Compañía" no tiene placeholder, pero sí label
    cy.contains('label', 'Compañía')
      .parent()
      .find('input[type="text"]')
      .should('be.visible')
      .type(company);

    // Note textarea
    cy.get('textarea').should('be.visible').type(note);

    // 3) Guardar
    cy.contains('button', 'Guardar Contacto').should('be.visible').click();

    // 4) Validar que volvió a la lista y aparece el contacto
    cy.contains('Lista de Contactos', { timeout: 10000 }).should('be.visible');
    cy.contains(name, { timeout: 10000 }).should('be.visible');
  });
});
