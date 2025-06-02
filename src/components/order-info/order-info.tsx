import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useLocation, useParams } from 'react-router-dom';
import { useIngredients } from '@hooks/useIngredients';
import { useSelector } from '@store';
import { useOrders } from '@hooks/useOrders';
import { useFeed } from '@hooks/useFeed';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const location = useLocation();

  const { getOrderByNumber } = useOrders();
  const { getFeedOrderByNumber } = useFeed();
  const { getIngredientsSelectorByIds } = useIngredients();

  if (!number) return <>order number not found</>;

  const isFeed = location.pathname.startsWith('/feed');
  const feedOrderData = getFeedOrderByNumber(Number(number));
  const defaultOrderData = getOrderByNumber(Number(number));
  const orderData = isFeed ? feedOrderData : defaultOrderData;

  const ingredients: TIngredient[] = useSelector(
    orderData ? getIngredientsSelectorByIds(orderData.ingredients) : () => []
  );

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderData) return <Preloader />;
  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
