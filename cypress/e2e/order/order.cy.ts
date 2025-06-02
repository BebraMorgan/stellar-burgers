///<reference types="cypress"/>
import { selectors } from '../../support/selectors';

describe('Тест создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'successOrder.json' });

    cy.window().then(() => {
      localStorage.setItem('refreshToken', 'test-refreshToken');
    });
    cy.setCookie('accessToken', 'test-accessToken');

    cy.viewport(1300, 800);
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Создание успешного заказа', () => {
    // Добавляем булку, начинку и соус
    cy.addIngredient('bun');
    cy.addIngredient('main');
    cy.addIngredient('sauce');

    // Оформляем заказ
    cy.placeOrder();

    // Проверяем номер заказа
    cy.get(selectors.orderNumber).contains('2128506').should('exist');

    // Закрываем модальное окно
    cy.closeModal();

    cy.get(selectors.constructor).should('not.contain', 'Ингридиент_1');
    cy.get(selectors.ingredientConstructor).should(
      'not.contain',
      'Ингридиент_4'
    );
    cy.get(selectors.ingredientConstructor).should(
      'not.contain',
      'Ингридиент_2'
    );
  });
});
