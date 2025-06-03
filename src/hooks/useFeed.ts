import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '@store';
import { fetchFeeds } from '@slices';
import {
  selectFeedOrders,
  selectFeedLoading,
  selectFeedError,
  selectFeedTotal,
  selectFeedTotalToday,
  selectFeedOrderByNumber
} from '@selectors';

export const useFeed = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const loading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);
  const total = useSelector(selectFeedTotal);
  const totalToday = useSelector(selectFeedTotalToday);

  const getFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const getFeedOrderByNumber = (orderId: number) => {
    const select = selectFeedOrderByNumber(orderId);
    return useSelector(select);
  };

  return useMemo(
    () => ({
      orders,
      loading,
      error,
      total,
      totalToday,
      getFeeds,
      getFeedOrderByNumber
    }),
    [orders, loading, error, total, totalToday, getFeeds, getFeedOrderByNumber]
  );
};
