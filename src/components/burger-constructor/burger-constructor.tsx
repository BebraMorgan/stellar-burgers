import { FC } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useBurgerConstructor } from '@hooks/useBurgerConstructor';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

export const BurgerConstructor: FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    price,
    orderRequest,
    orderModalData,
    constructorItems,
    onOrderClick,
    onCloseOrderModal
  } = useBurgerConstructor();

  const handleOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    onOrderClick();
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={onCloseOrderModal}
    />
  );
};
