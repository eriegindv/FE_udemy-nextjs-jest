it("displays Show page after clicking 'purchase more tickets' button", () => {
  // login using custom command
  cy.task("db:reset").signIn(
    Cypress.env("TEST_USER_EMAIL"),
    Cypress.env("TEST_PASSWORD")
  );

  // access user page
  cy.visit("/user");

  // find and click on button to buy tickets
  cy.get("main").within(() => {
    cy.get("button")
      .contains(/purchase more tickets/i)
      .click();
  });

  // check that "Shows" page shows
  cy.get("h2")
    .contains(/upcoming shows/i)
    .should("exist");
});
