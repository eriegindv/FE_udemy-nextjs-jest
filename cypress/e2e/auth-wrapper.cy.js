it("runs auth flow for successful login to protected reservations page", () => {
  // visit reservations page for first show (id = 0)
  cy.task("db:reset").visit("/reservations/0");

  // check for sign in form
  cy.get("h2")
    .contains(/sign in to your account/i)
    .should("exist");

  // check that there's no option to purchase tickets
  cy.get("button")
    .contains(/purchase/i)
    .should("not.exist");

  // enter valid sign-in credentials
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_PASSWORD"));

  // submit the form
  cy.get("main").within(() => {
    cy.get("button")
      .contains(/sign in/i)
      .click();
  });

  // check for purchase buton and band name
  cy.get("button")
    .contains(/purchase/i)
    .should("exist");
  cy.get("h2")
    .contains(/the wandering bunnies/i)
    .should("exist");

  // check for email and sign-out button on navbar
  cy.get("button").contains(Cypress.env("TEST_USER_EMAIL")).should("exist");
  cy.get("button")
    .contains(/sign out/i)
    .should("exist");

  // check that sign in button does not exist
  cy.get("button")
    .contains(/sign in/i)
    .should("not.exist");
});

it("runs auth flow for failed login to protected user page", () => {
  // visit user page
  cy.task("db:reset").visit("/user");

  // check there is no welcome message
  cy.get("h2")
    .contains(/welcome/i)
    .should("not.exist");

  // check for sign in form
  cy.get("h2")
    .contains(/Sign in to your account/i)
    .should("exist");

  // fill out the sign in form with environment variable values, but bad password
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("TEST_USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type("test123");

  // click sign in button
  cy.get("main").within(() => {
    cy.get("button")
      .contains(/sign in/i)
      .click();
  });

  // check for failure message
  cy.findByText(/sign in failed/i).should("exist");

  // fill out the sign in form again, with correct info
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("TEST_PASSWORD"));
  cy.get("main").within(() => {
    cy.get("button")
      .contains(/sign in/i)
      .click();
  });

  // check the user page now shows
  cy.get("h2")
    .contains(/welcome/i)
    .should("exist");
  cy.get("h2")
    .contains(/your tickets/i)
    .should("exist");

  // check for user and sign out buttons on nav bar
  cy.get("button").contains(Cypress.env("TEST_USER_EMAIL")).should("exist");
  cy.get("button")
    .contains(/sign out/i)
    .should("exist");
  cy.get("button")
    .contains(/sign in/i)
    .should("not.exist");
});

it("redirects to sign-in for protected pages", () => {
  cy.fixture("protected-pages.json").then((urls) => {
    urls.forEach((url) => {
      cy.visit(url);
      cy.findByLabelText(/email address/i).should("exist");
      cy.findByLabelText(/password/i).should("exist");
    });
  });
});
