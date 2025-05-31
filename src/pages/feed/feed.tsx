import { useFeed } from '@hooks/useFeed';
import { useIngredients } from '@hooks/useIngredients';
import { useDispatch } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const { orders, loading, getFeeds } = useFeed();
  const dispatch = useDispatch();
  const { fetchIngredients } = useIngredients();

  useEffect(() => {
    if (orders.length === 0 && !loading) {
      getFeeds();
    }
    fetchIngredients();
  }, [dispatch, orders.length, loading]);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
