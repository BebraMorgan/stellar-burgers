import { RootState } from '@store';
import { createSelector } from '@reduxjs/toolkit';

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;

export const selectFeedOrderByNumber = (number: number) =>
  createSelector(selectFeedOrders, (orders) =>
    orders.find((order) => order.number == number)
  );
