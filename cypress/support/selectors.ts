export const selectors = {
  ingredientsBun: '[data-cy=ingredients_bun]',
  ingredientsMain: '[data-cy=ingredients_main]',
  ingredientsSauce: '[data-cy=ingredients_sauce]',
  constructorBun1: '[data-cy=constructor_bun1]',
  constructorBun2: '[data-cy=constructor_bun2]',
  ingredientConstructor: '[data-cy=ingredient_constructor]',
  modal: '[data-cy=modal]',
  closeIcon: '[data-cy=close_icon]',
  overlay: '[data-cy=overlay]',
  orderBurgerButton: '[data-cy=order_burger_button]',
  orderNumber: '[data-cy=order_number]',
  constructor: '[data-cy=constructor]'
};

export type SelectorKey = keyof typeof selectors;
