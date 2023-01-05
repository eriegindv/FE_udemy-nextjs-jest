import "@testing-library/cypress/add-commands";

Cypress.Commands.add("resetDbAndIsrCache", () => {
  cy.task("db:reset");
  const secret = Cypress.env("REVALIDATION_SECRET");
  cy.request("GET", `api/revalidate?secret=${secret}`);
});

Cypress.Commands.add("signIn", (email, password) => {
  // note: for many auth systems, this would POST to an API rather than go through UI sign in flow
  cy.visit("/auth/signin");

  // fill out the sign in form using arguments
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);

  cy.get("main").within(() => {
    cy.get("button")
      .contains(/sign in/i)
      .click();
  });

  // check for welcome message
  cy.get("h2")
    .contains(/welcome/i)
    .should("exist");
});
