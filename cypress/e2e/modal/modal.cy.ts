///<reference types="cypress"/>

describe('Тест модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('Открытие модального окна при клике на ингредиент', () => {
    cy.get('[data-cy=ingredients_bun]').contains('Ингредиент_1').click();
    cy.get('[data-cy=modal]')
      .should('exist')
      .and('contain.text', 'Ингредиент_1');
  });

  it('Закрытие модального окна при клике на крестик', () => {
    cy.get('[data-cy=ingredients_bun]').contains('Ингредиент_1').click();
    cy.get('[data-cy=close_icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Закрытие модального окна при клике на оверлей', () => {
    cy.get('[data-cy=ingredients_bun]').contains('Ингредиент_1').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=overlay]')
      .should('exist')
      .click('topRight', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
