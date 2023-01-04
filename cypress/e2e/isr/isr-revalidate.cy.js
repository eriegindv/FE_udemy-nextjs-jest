import { generateRandomId } from "@/lib/features/reservations/utils";
import { generateNewBand } from "@/__tests__/__mocks__/fakeData/newBand";
import { generateNewShow } from "@/__tests__/__mocks__/fakeData/newShow";

it("should load refreshed page from cache after new band is added", () => {
  // check that new band is not on page
  cy.task("db:reset").visit("/bands");
  cy.get("h2")
    .contains(/avalanche of cheese/i)
    .should("not.exist");

  // add new band via post requiest to api
  const bandId = generateRandomId();
  const band = generateNewBand(bandId);
  const secret = Cypress.env("REVALIDATION_SECRET");

  cy.request("POST", `/api/bands?secret=${secret}`, { newBand: band }).then(
    (response) => {
      expect(response.body.revalidated).to.equal(true);
    }
  );

  // reload page; new band should appear
  cy.reload();
  cy.get("h2")
    .contains(/avalanche of cheese/i)
    .should("exist");

  // reset ISR cache to initial db conditions
  cy.resetDbAndIsrCache();
});

it("should load refreshed page from cache after new show is added", () => {
  cy.task("db:reset").visit("/shows");
  cy.get("h2")
    .contains(/Avalanche of Cheese/i)
    .should("not.exist");

  const showId = generateRandomId();
  const newShow = generateNewShow(showId);
  const secret = Cypress.env("REVALIDATION_SECRET");

  cy.request("POST", `api/shows?secret=${secret}`, { newShow }).then(
    (response) => {
      expect(response.body.revalidated).to.equal(true);
    }
  );

  cy.reload();
  cy.get("h2")
    .contains(/Avalanche of Cheese/i)
    .should("exist");

  cy.resetDbAndIsrCache();
});
