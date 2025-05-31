///<reference types="cypress"/>

describe('Тест создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'successOrder.json' });

    // Установка токенов для авторизации
    cy.window().then(() => {
      localStorage.setItem('refreshToken', 'test-refreshToken');
    });
    cy.setCookie('accessToken', 'test-accessToken');

    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Создание успешного заказа', () => {
    // Добавляем булку, начинку и соус
    cy.get('[data-cy=ingredients_bun]').contains('Добавить').click();
    cy.get('[data-cy=ingredients_main]').contains('Добавить').click();
    cy.get('[data-cy=ingredients_sauce]').contains('Добавить').click();

    // Нажимаем кнопку оформления заказа
    cy.get('[data-cy=order_burger_button]')
      .contains('Оформить заказ')
      .should('exist')
      .click();

    // Проверяем, что модальное окно с номером заказа открылось
    cy.get('[data-cy=order_number]').contains('2128506').should('exist');

    // Закрываем модальное окно
    cy.get('[data-cy=close_icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    // Проверяем, что конструктор очищен от ингредиентов
    cy.get('[data-cy=constructor]').should('not.contain', 'Ингридиент_1');
    cy.get('[data-cy=ingredient_constructor]').should(
      'not.contain',
      'Ингридиент_4'
    );
    cy.get('[data-cy=ingredient_constructor]').should(
      'not.contain',
      'Ингридиент_2'
    );
  });
});
