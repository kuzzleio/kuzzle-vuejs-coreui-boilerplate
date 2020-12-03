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

    cy.get('html').click();

    cy.get('[data-cy=table] > tbody > tr > td:nth-child(1)').click();

    cy.get(
      '.row > .col-12 > .pagination > .page-item:nth-child(5) > .page-link'
    ).click();

    cy.get('[data-cy=table] > tbody > tr > td:nth-child(1)').click();

    cy.get('html').click();

    cy.get(
      '.row > .col-12 > #__BVID__21 > .bv-no-focus-ring > #perPageSelect'
    ).select('10');

    cy.get(
      '[data-cy=table] > tbody > tr:nth-child(1) > td:nth-child(1)'
    ).click();

    cy.get(
      '[data-cy=table] > tbody > tr:nth-child(2) > td:nth-child(1)'
    ).click();

    cy.get('html').click();

    cy.get('[data-cy=table] > thead > tr > th:nth-child(1)').click();

    cy.get(
      '[data-cy=table] > tbody > tr:nth-child(1) > td:nth-child(1)'
    ).click();

    cy.get(
      '[data-cy=table] > tbody > tr:nth-child(2) > td:nth-child(1)'
    ).click();

    cy.get('.col-8 > .container > .row > .col-12 > #__BVID__20').click();

    cy.get('.col-8 > .container > .row > .col-12 > #__BVID__20').type('a');

    cy.get('[data-cy=table] > tbody > tr > td:nth-child(1)').click();
  });
});
