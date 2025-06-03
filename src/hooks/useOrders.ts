import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '@store';
import { fetchOrders as _fetchOrders } from '@slices';
import {
  selectOrders,
  selectCurrentOrder,
  selectOrdersLoading,
  selectOrdersError,
  selectOrderById,
  selectOrderByNumber
} from '@selectors';

export const useOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const currentOrder = useSelector(selectCurrentOrder);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  const fetchOrders = () => {
    dispatch(_fetchOrders());
  };

  useEffect(() => {
    if (orders.length === 0 && !loading) {
    }
  }, [dispatch, orders.length, loading]);

  const getOrderById = (orderId: string) => {
    const select = selectOrderById(orderId);
    return useSelector(select);
  };

  const getOrderByNumber = (orderId: number) => {
    const select = selectOrderByNumber(orderId);
    return useSelector(select);
  };

  return useMemo(
    () => ({
      orders,
      currentOrder,
      loading,
      error,
      fetchOrders,
      getOrderById,
      getOrderByNumber
    }),
    [
      orders,
      currentOrder,
      loading,
      error,
      fetchOrders,
      getOrderById,
      getOrderByNumber
    ]
  );
};
