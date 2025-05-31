import { useOrders } from '@hooks/useOrders';
import { useDispatch } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const { orders, fetchOrders } = useOrders();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchOrders();
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
