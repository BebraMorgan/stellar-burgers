import ordersReducer, {
  fetchOrders,
  fetchOrderByNumber,
  clearCurrentOrder,
  initialState
} from './ordersSlice';
import { mockOrder, mockOrders } from './testConstants';

describe('ordersSlice reducer and async actions', () => {
  it('should handle initial state', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // Тесты для fetchOrders

  it('should handle fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchOrders.fulfilled', () => {
    const action = { type: fetchOrders.fulfilled.type, payload: mockOrders };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.error).toBeNull();
  });

  it('should handle fetchOrders.rejected with payload', () => {
    const errorMessage = 'Network error';
    const action = { type: fetchOrders.rejected.type, payload: errorMessage };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle fetchOrders.rejected without payload', () => {
    const action = { type: fetchOrders.rejected.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error loading orders');
  });

  // Тесты для fetchOrderByNumber

  it('should handle fetchOrderByNumber.pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchOrderByNumber.fulfilled', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.currentOrder).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it('should handle fetchOrderByNumber.rejected with payload', () => {
    const errorMessage = 'Order not found';
    const action = {
      type: fetchOrderByNumber.rejected.type,
      payload: errorMessage
    };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle fetchOrderByNumber.rejected without payload', () => {
    const action = { type: fetchOrderByNumber.rejected.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error loading order');
  });

  // Тест редьюсера clearCurrentOrder

  it('should handle clearCurrentOrder', () => {
    const stateWithCurrentOrder = {
      ...initialState,
      currentOrder: mockOrder
    };
    const state = ordersReducer(stateWithCurrentOrder, clearCurrentOrder());
    expect(state.currentOrder).toBeNull();
  });
});
