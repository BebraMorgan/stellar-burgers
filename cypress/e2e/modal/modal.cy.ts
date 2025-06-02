///<reference types="cypress"/>
import { selectors } from '../../support/selectors';

describe('Тест модального окна', () => {
  beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');

    cy.get(selectors.ingredientsBun).as('bunSection');
  });

  it('Открытие модального окна при клике на ингредиент', () => {
    cy.get('@bunSection').contains('Ингредиент_1').click();

    cy.get(selectors.modal).as('modalWindow').should('exist');
    cy.get('@modalWindow').contains('Ингредиент_1').should('exist');
  });

  it('Закрытие модального окна при клике на крестик', () => {
    cy.get('@bunSection').contains('Ингредиент_1').click();

    cy.get(selectors.closeIcon).as('closeIcon').should('exist').click();

    cy.get(selectors.modal).should('not.exist');
  });

  it('Закрытие модального окна при клике на оверлей', () => {
    cy.get('@bunSection').contains('Ингредиент_1').click();

    cy.get(selectors.modal).as('modalWindow').should('exist');

    cy.get(selectors.overlay)
      .as('overlay')
      .should('exist')
      .click('topRight', { force: true });

    cy.get('@modalWindow').should('not.exist');
  });
});
