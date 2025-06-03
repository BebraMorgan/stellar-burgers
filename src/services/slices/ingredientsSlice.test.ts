import ingredientsReducer, {
  fetchIngredients,
  initialState
} from './ingredientsSlice';
import { mockIngredients } from './testConstants';

describe('ingredientsSlice reducer and async actions', () => {
  it('should handle initial state', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.rejected with payload', () => {
    const errorMessage = 'Network error';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle fetchIngredients.rejected without payload', () => {
    const action = { type: fetchIngredients.rejected.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error loading ingredients');
  });

  it('fetchIngredients.fulfilled with empty array', () => {
    const action = { type: fetchIngredients.fulfilled.type, payload: [] };
    const state = ingredientsReducer(initialState, action);
    expect(state.items).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it('fetchIngredients.rejected without payload sets default error', () => {
    const action = { type: fetchIngredients.rejected.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.error).toBe('Error loading ingredients');
    expect(state.loading).toBe(false);
  });
});
