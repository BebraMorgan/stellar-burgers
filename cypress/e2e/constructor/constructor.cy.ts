///<reference types="cypress"/>
import { selectors } from '../../support/selectors';

describe('Тесты страницы конструктора', function() {
  beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');

    cy.get(selectors.ingredientsBun).as('bunSection');
    cy.get(selectors.ingredientsMain).as('mainSection');
    cy.get(selectors.ingredientsSauce).as('sauceSection');
    cy.get(selectors.constructorBun1).as('constructorBun1');
    cy.get(selectors.constructorBun2).as('constructorBun2');
    cy.get(selectors.ingredientConstructor).as('ingredientConstructor');
  });

  it('Проверка добавления булки в конструктор', function() {
    cy.get('@bunSection').contains('Добавить').click();
    cy.get('@constructorBun1').contains('Ингредиент_1').should('exist');
    cy.get('@constructorBun2').contains('Ингредиент_1').should('exist');
  });

  it('Проверка добавления основных ингредиентов', function() {
    cy.get('@mainSection').contains('Добавить').click();
    cy.get('@ingredientConstructor').contains('Ингредиент_2').should('exist');
    cy.get('@sauceSection').contains('Добавить').click();
    cy.get('@ingredientConstructor').contains('Ингридиент_4').should('exist');
  });
});
