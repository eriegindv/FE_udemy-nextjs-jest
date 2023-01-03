import { generateRandomId } from "@/lib/features/reservations/utils";
import { generateNewBand } from "@/__tests__/__mocks__/fakeData/newBand";

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

it("displays correct band name for band route that existed at build time", () => {
  cy.task("db:reset").visit("/bands/1");
  cy.get("h2")
    .contains(/Shamrock Pete/i)
    .should("exist");
});

it("diplays error for band route that not existed at build time", () => {
  cy.task("db:reset").visit("/bands/12345");
  cy.get("h2")
    .contains(/band not found/i)
    .should("exist");
});

it("displays name for band that was not present at build time", () => {
  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);

  cy.task("db:reset").task("addBand", newBand).visit(`/bands/${bandId}`);
  cy.get("h2")
    .contains(/Avalanche of Cheese/i)
    .should("exist");
});
