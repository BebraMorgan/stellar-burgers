import { useOrders } from '@hooks/useOrders';
import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const { orders } = useOrders();

  return <ProfileOrdersUI orders={orders} />;
};
