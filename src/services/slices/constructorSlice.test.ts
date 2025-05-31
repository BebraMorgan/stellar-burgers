import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  closeOrderModal,
  sendOrder
} from './constructorSlice';
import * as api from '@api';

import { TConstructorIngredient } from '@utils-types';

describe('Constructor Slice Test', () => {
  const ingredient1: TConstructorIngredient = {
    id: '1',
    _id: '1',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const ingredient2: TConstructorIngredient = {
    id: '2',
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const bun: TConstructorIngredient = {
    id: '3',
    _id: '3',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const initialState = {
    bun: null,
    ingredients: [],
    orderRequest: false,
    orderModalData: null,
    orderError: null
  };

  it('addBun should add bun into constructor', () => {
    const state = constructorReducer(initialState, addBun(bun));
    expect(state.bun).toEqual(bun);
  });

  it('addIngredient should add ingredient into constructor', () => {
    const state = constructorReducer(initialState, addIngredient(ingredient1));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredient1);
  });

  it('removeIngredient should remove ingredient by index', () => {
    const stateWithIngredients = {
      ...initialState,
      bun,
      ingredients: [ingredient1, ingredient2]
    };
    const state = constructorReducer(stateWithIngredients, removeIngredient(0));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredient2);
  });

  it('moveIngredient should move ingredient within constructor', () => {
    const stateWithIngredients = {
      ...initialState,
      bun,
      ingredients: [ingredient1, ingredient2]
    };
    // Переместим ingredient1 (индекс 0) на позицию 1 (вниз)
    const state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );
    expect(state.ingredients[0]).toEqual(ingredient2);
    expect(state.ingredients[1]).toEqual(ingredient1);

    // Переместим ingredient2 (индекс 1) на позицию 0 (вверх)
    const state2 = constructorReducer(
      state,
      moveIngredient({ dragIndex: 1, hoverIndex: 0 })
    );
    expect(state2.ingredients[0]).toEqual(ingredient1);
    expect(state2.ingredients[1]).toEqual(ingredient2);
  });

  it('clearConstructor should reset constructor state', () => {
    const stateWithIngredients = {
      ...initialState,
      bun,
      ingredients: [ingredient1, ingredient2],
      orderModalData: { number: 123 } as any,
      orderError: 'error'
    };
    const state = constructorReducer(stateWithIngredients, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
    expect(state.orderModalData).toBeNull();
    expect(state.orderError).toBeNull();
  });

  it('closeOrderModal should clear order modal data and error', () => {
    const stateWithOrder = {
      ...initialState,
      orderModalData: { number: 123 } as any,
      orderError: 'error'
    };
    const state = constructorReducer(stateWithOrder, closeOrderModal());
    expect(state.orderModalData).toBeNull();
    expect(state.orderError).toBeNull();
  });

  it('should handle sendOrder.pending', () => {
    const action = { type: sendOrder.pending.type };
    const state = constructorReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBeNull();
  });

  it('should handle sendOrder.fulfilled', () => {
    const mockOrder = { number: 12345 /* другие поля, если нужны */ };
    const action = {
      type: sendOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    // Предположим, что в состоянии есть булка и ингредиенты
    const stateBefore = {
      ...initialState,
      bun: { id: '1' } as any,
      ingredients: [{ id: '2' }] as any[]
    };
    const state = constructorReducer(stateBefore, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle sendOrder.rejected', () => {
    const errorMessage = 'Failed to send order';
    const action = {
      type: sendOrder.rejected.type,
      payload: errorMessage
    };
    const state = constructorReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe(errorMessage);
  });

  it('moveIngredient does nothing if dragIndex or hoverIndex are invalid or equal', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2]
    };

    // dragIndex < 0
    let state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: -1, hoverIndex: 1 })
    );
    expect(state.ingredients).toEqual(stateWithIngredients.ingredients);

    // hoverIndex < 0
    state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 0, hoverIndex: -1 })
    );
    expect(state.ingredients).toEqual(stateWithIngredients.ingredients);

    // dragIndex >= length
    state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 10, hoverIndex: 1 })
    );
    expect(state.ingredients).toEqual(stateWithIngredients.ingredients);

    // hoverIndex >= length
    state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 0, hoverIndex: 10 })
    );
    expect(state.ingredients).toEqual(stateWithIngredients.ingredients);

    // dragIndex === hoverIndex
    state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 1, hoverIndex: 1 })
    );
    expect(state.ingredients).toEqual(stateWithIngredients.ingredients);
  });
});
