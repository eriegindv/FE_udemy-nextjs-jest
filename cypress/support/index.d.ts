declare namespace Cypress {
  interface Chainable {
    resetDbAndIsrCache(): Chainable<any>;
    signIn(email, password): Chainable<any>;
  }
}
