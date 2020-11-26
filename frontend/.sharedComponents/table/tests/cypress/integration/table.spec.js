describe('Table tests', function() {
  it('just works', function() {
    cy.viewport(1496, 954);

    cy.visit('/');
    cy.location('pathname').should('equal', '/login');

    // enter valid username and password
    cy.get('[data-cy=username]').type(Cypress.env('username'));
    cy.get('[data-cy=password]').type(Cypress.env('password'));
    cy.get('[data-cy=Login-btn]').click();

    cy.visit('http://localhost:8080/table');

    cy.get(
      '[data-cy=table] > tbody > tr:nth-child(1) > td:nth-child(1)'
    ).click();

    cy.get(
      '[data-cy=table] > tbody > tr:nth-child(1) > td:nth-child(2)'
    ).click();

    cy.get(
      '[data-cy=table] > tbody > tr:nth-child(2) > td:nth-child(2)'
    ).click();

    cy.get(
      '.b-table-row-selected > td > .text-danger > .svg-inline--fa > path'
    ).click();

    cy.get(
      'tr:nth-child(1) > td > .text-danger > .svg-inline--fa > path'
    ).click();

    cy.get('[data-cy=table] > thead > tr > th:nth-child(1)').click();

    cy.get('[data-cy=table] > thead > tr > th:nth-child(1)').click();

    cy.get(
      '[data-cy=table] > tbody > tr:nth-child(1) > td:nth-child(1)'
    ).click();

    cy.get('[data-cy=table] > thead > tr > th:nth-child(1)').click();

    cy.get(
      '[data-cy=table] > tbody > tr:nth-child(1) > td:nth-child(1)'
    ).click();
  });
});
