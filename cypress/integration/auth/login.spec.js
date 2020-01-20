/* eslint-disable no-undef */
describe("Login and register tests", () => {
  before(() => {
    Cypress.config("baseUrl", "https://travel-to.herokuapp.com/");
  });

  it("User can login", function() {
    cy.visit("/");
    cy.get("[data-cy=loginLink]").click();
    cy.url().should("contain", "Login");

    cy.get("[data-cy=email]").type("passenger@travel-to.com");
    cy.get("[data-cy=password]").type("passenger");
    cy.get("[data-cy=login]").click();
    cy.url().should("not.contain", "Login");
    cy.get("[data-cy=loginLink]").should("not.exist");
  });

  it("User can register", function() {
    cy.visit("/");
    cy.get("[data-cy=loginLink]").click();
    cy.get("[data-cy=registerLink]").click();
    cy.url().should("contain", "Login");

    // TODO: Setup staging server so we can test creating of new data
    // cy.get("[data-cy=email]").type('passenger@travel-to.com');
    // cy.get("[data-cy=password]").type('passenger');
    // cy.get("[data-cy=register]").click();
  });
});
