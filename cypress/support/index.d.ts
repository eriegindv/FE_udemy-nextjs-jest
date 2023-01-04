declare namespace Cypress {
  interface Chainable {
    resetDbAndIsrCache(): Chainable<any>;
  }
}
