import ordersReducer, {
  fetchOrders,
  fetchOrderByNumber,
  clearCurrentOrder
} from './ordersSlice';
import { TOrder } from '@utils-types';

describe('ordersSlice reducer and async actions', () => {
  const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Order 1',
      createdAt: '2025-06-01T10:00:00.000Z',
      updatedAt: '2025-06-01T10:05:00.000Z',
      number: 1001
    },
    {
      _id: '2',
      ingredients: ['3', '4'],
      status: 'pending',
      name: 'Order 2',
      createdAt: '2025-06-01T11:00:00.000Z',
      updatedAt: '2025-06-01T11:05:00.000Z',
      number: 1002
    }
  ];

  const mockOrder: TOrder = {
    _id: '1',
    ingredients: ['1', '2'],
    status: 'done',
    name: 'Order 1',
    createdAt: '2025-06-01T10:00:00.000Z',
    updatedAt: '2025-06-01T10:05:00.000Z',
    number: 1001
  };

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
