/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get("[data-cy=loginLink]").click();
  cy.url().should("contain", "Login");

  cy.get("[data-cy=email]").type(email);
  cy.get("[data-cy=password]").type(password);
  cy.get("[data-cy=login]").click();
  cy.url().should("not.contain", "Login");
  cy.get("[data-cy=loginLink]").should("not.exist");
});

//
// -- This is a child command --
Cypress.Commands.add("searchTrip", (user, from, to) => {
  if (user) {
    cy.login(user.email, user.password);
  }
  cy.get("[data-cy=from]").type(from);
  cy.get("[data-cy=to]").type(to);
  cy.get("[data-cy=searchTrips]").click();
  cy.url().should("contain", "trips");
  cy.url().should("contain", "Copenhagen");
  cy.url().should("contain", "Oslo");
  cy.contains("Newest trips");
});

//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
