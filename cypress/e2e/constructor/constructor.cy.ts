///<reference types="cypress"/>
describe('Тесты страницы конструктора', function() {
  beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('Проверка добавления булки в конструктор', function() {
    cy.get('[data-cy=ingredients_bun]').contains('Добавить').click();
    cy.get('[data-cy=constructor_bun1]')
      .contains('Ингредиент_1')
      .should('exist');
    cy.get('[data-cy=constructor_bun2]')
      .contains('Ингредиент_1')
      .should('exist');
  });

  it('Проверка добавления основных ингредиентов', function() {
    cy.get('[data-cy=ingredients_main]').contains('Добавить').click();
    cy.get('[data-cy=ingredient_constructor]')
      .contains('Ингредиент_2')
      .should('exist');
    cy.get('[data-cy=ingredients_sauce]').contains('Добавить').click();
    cy.get('[data-cy=ingredient_constructor]')
      .contains('Ингридиент_4')
      .should('exist');
  });
});
