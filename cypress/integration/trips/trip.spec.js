/* eslint-disable no-undef */
describe("Trip tests", () => {
  let passengerUser;
  before(() => {
    Cypress.config("baseUrl", "https://travel-to.herokuapp.com/");
    passengerUser = {
      email: "passenger@travel-to.com",
      password: "passenger"
    };
  });

  it("Unauthenthicated user can search for trips", function() {
    cy.visit("/");
    cy.get("[data-cy=from]").type("Copenhagen");
    cy.get("[data-cy=to]").type("Oslo");
    cy.get("[data-cy=searchTrips]").click();
    cy.url().should("contain", "trips");
    cy.url().should("contain", "Copenhagen");
    cy.url().should("contain", "Oslo");
    cy.contains("Newest trips");
  });

  it("Unauthenthicated user search cannot see trip details and gets redirected to login page", function() {
    cy.visit("/");
    cy.searchTrip(null, "Copenhagen", "Oslo");
    cy.get("[data-cy=trip-21]").click();
    cy.url().should("contain", "login");
  });

  it("Passenger can search for trips", function() {
    cy.login(passengerUser.email, passengerUser.password);
    cy.get("[data-cy=from]").type("Copenhagen");
    cy.get("[data-cy=to]").type("Oslo");
    cy.get("[data-cy=searchTrips]").click();
    cy.url().should("contain", "trips");
    cy.url().should("contain", "Copenhagen");
    cy.url().should("contain", "Oslo");
    cy.contains("Newest trips");
  });

  it("Passenger can see trip details", function() {
    cy.searchTrip(passengerUser, "Copenhagen", "Oslo");
    cy.get("[data-cy=trip-21]").click();
    cy.url().should("contain", "trip/21");
    cy.wait(50);
    cy.contains("Copenhagen - Oslo");
    cy.contains("Join");
  });
});
