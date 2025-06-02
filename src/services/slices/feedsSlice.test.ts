import feedsReducer, { fetchFeeds, initialState } from './feedsSlice';
import { TOrdersData } from '@utils-types';
import { mockOrders } from './testConstants';

describe('feedsSlice reducer and async actions', () => {
  it('should handle initial state', () => {
    expect(feedsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeeds.fulfilled', () => {
    const payload: TOrdersData = {
      orders: mockOrders,
      total: 10,
      totalToday: 5
    };
    const action = { type: fetchFeeds.fulfilled.type, payload };
    const state = feedsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeeds.rejected with payload', () => {
    const errorMessage = 'Network error';
    const action = { type: fetchFeeds.rejected.type, payload: errorMessage };
    const state = feedsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle fetchFeeds.rejected without payload', () => {
    const action = { type: fetchFeeds.rejected.type };
    const state = feedsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error loading feeds');
  });

  it('fetchFeeds.fulfilled with empty orders array', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: { orders: [], total: 0, totalToday: 0 }
    };
    const state = feedsReducer(initialState, action);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
    expect(state.loading).toBe(false);
  });

  it('fetchFeeds.rejected without payload sets default error message', () => {
    const action = { type: fetchFeeds.rejected.type };
    const state = feedsReducer(initialState, action);
    expect(state.error).toBe('Error loading feeds');
    expect(state.loading).toBe(false);
  });
});
