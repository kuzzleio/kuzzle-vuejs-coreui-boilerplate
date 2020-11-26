describe('Map tests', function() {
  it('just works', function() {
    cy.viewport(1312, 954);

    cy.visit('/');
    cy.location('pathname').should('equal', '/login');

    // enter valid username and password
    cy.get('[data-cy=username]').type(Cypress.env('username'));
    cy.get('[data-cy=password]').type(Cypress.env('password'));
    cy.get('[data-cy=Login-btn]').click();

    cy.visit('http://localhost:8080/map');

    cy.get('#app > div > div > .Map > .vue2leaflet-map').click({ force: true });

    cy.get(
      '.leaflet-pane > .leaflet-pane > .leaflet-marker-icon > .svg-inline--fa > path'
    ).click();

    cy.get(
      '.leaflet-popup-content-wrapper > .leaflet-popup-content > div > .text-left > h3'
    ).click();

    cy.get(
      '.leaflet-popup > .leaflet-popup-content-wrapper > .leaflet-popup-content > div > .text-left'
    ).click();

    cy.get(
      '.leaflet-popup-content-wrapper > .leaflet-popup-content > div > .text-left > .mb-2'
    ).click();

    cy.get(
      '.vue2leaflet-map > .leaflet-pane > .leaflet-pane > .leaflet-popup > .leaflet-popup-close-button'
    ).click();

    cy.get(
      '.vue2leaflet-map > .leaflet-control-container > .leaflet-top > .leaflet-control-zoom > .leaflet-control-zoom-out'
    ).click();

    cy.get(
      '.vue2leaflet-map > .leaflet-control-container > .leaflet-top > .leaflet-control-zoom > .leaflet-control-zoom-in'
    ).click();
  });
});
