describe('logs in', () => {
  it('using UI', () => {
    cy.visit('/');
    cy.location('pathname').should('equal', '/login');

    // enter valid username and password
    cy.get('[name=username]').type(Cypress.env('username'));
    cy.get('[name=password]').type(Cypress.env('password'));
    cy.contains('button', 'Login').click();

    // confirm we have logged in successfully
    cy.location('pathname').should('equal', '/');
    cy.contains('Welcome to Your Kuzzle')
      .should('be.visible')
      .then(() => {
        /* global window */
        const userString = window.localStorage.getItem('user_token');
        expect(userString).to.be.a('string');
      });

    // now we can log out
    cy.get('[name=logout]').click();
    cy.location('pathname').should('equal', '/login');
  });

  it('Does not log in with invalid password', () => {
    cy.visit('/');
    cy.location('pathname').should('equal', '/login');

    // enter valid username and password
    cy.get('[name=username]').type('username');
    cy.get('[name=password]').type('wrong-password');
    cy.contains('button', 'Login').click();

    // still on /login page plus an error is displayed
    cy.location('pathname').should('equal', '/login');
    cy.contains(
      '.alert-danger',
      'Sorry, either the username or the password you entered is wrong.'
    ).should('be.visible');
  });
});
