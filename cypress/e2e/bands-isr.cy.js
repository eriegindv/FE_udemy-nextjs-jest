it("skips client-side bundle, confirming data from ISR cache", () => {
  // reference: https://glebbahmutov.com/blog/ssr-e2e/#removing-application-bundle
  cy.request("/bands")
    .its("body")
    .then((html) => {
      // remove the scripts, so they don't start automatically
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHtml);
    });

  cy.get("h2")
    .contains(/the joyous nun riot/i)
    .should("exist");
  cy.get("h2")
    .contains(/shamrock pete/i)
    .should("exist");
  cy.get("h2")
    .contains(/the wandering bunnies/)
    .should("exist");
});
