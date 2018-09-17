// https://docs.cypress.io/api/introduction/api.html

describe("Main page", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Bidirectional currency converter");
  });
});
