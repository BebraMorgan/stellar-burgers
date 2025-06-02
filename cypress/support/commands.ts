/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
//
/// <reference types="cypress" />
import { selectors, SelectorKey } from './selectors';

Cypress.Commands.add('addIngredient', (type: 'bun' | 'main' | 'sauce') => {
  const selectorKey =
    `ingredients${type.charAt(0).toUpperCase()}${type.slice(1)}` as SelectorKey;

  cy.get(selectors[selectorKey]).contains('Добавить').click();
});

Cypress.Commands.add('placeOrder', () => {
  cy.get(selectors.orderBurgerButton).contains('Оформить заказ').click();
});

Cypress.Commands.add('closeModal', () => {
  cy.get(selectors.closeIcon).should('exist').click();
  cy.get(selectors.modal).should('not.exist');
});
