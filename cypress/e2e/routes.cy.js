// using "@testing-library/cypress/add-commands" in cypress/support/commands.ts
// to use command testing-library command
it("displays correct heading when navigating to shows route", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /shows/i }).click();
  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});

// not using lib
it("displays correct heading when navigating to bands route", () => {
  cy.visit("/bands");
  cy.get("button").contains(/bands/i).click();
  cy.get("h2")
    .contains(/our illustrious performers/i)
    .should("exist");
});
