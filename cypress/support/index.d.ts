/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable<Subject = any> {
    addIngredient(type: 'bun' | 'main' | 'sauce'): Chainable<Element>;
    placeOrder(): Chainable<Element>;
    closeModal(): Chainable<Element>;
  }
}
