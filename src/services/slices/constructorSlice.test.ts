import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  closeOrderModal,
  sendOrder
} from './constructorSlice';
import { initialState } from './constructorSlice';
import { bun, ingredient1, ingredient2 } from './testConstants';

describe('Constructor Slice Test', () => {
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
    const mockOrder = { number: 12345 };
    const action = {
      type: sendOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
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
