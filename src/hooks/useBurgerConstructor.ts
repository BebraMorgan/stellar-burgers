import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from '@store';
import {
  selectConstructorBun,
  selectConstructorIngredients,
  selectOrderRequest,
  selectOrderModalData
} from '@selectors';
import {
  sendOrder,
  closeOrderModal,
  removeIngredient,
  moveIngredient
} from '@slices';
import { TConstructorIngredient } from '@utils-types';

export const useBurgerConstructor = () => {
  const dispatch = useDispatch();

  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const onOrderClick = useCallback(() => {
    if (!bun || orderRequest) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(sendOrder(ingredientIds));
  }, [bun, ingredients, orderRequest, dispatch]);

  const onCloseOrderModal = useCallback(() => {
    dispatch(closeOrderModal());
  }, [dispatch]);

  const removeIngredientByIndex = useCallback(
    (index: number) => {
      dispatch(removeIngredient(index));
    },
    [dispatch]
  );

  const moveIngredientByIndex = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      console.log('Move from', dragIndex, 'to', hoverIndex);
    },
    [dispatch]
  );

  const constructorItems = useMemo(
    () => ({ bun, ingredients }),
    [bun, ingredients]
  );

  return {
    price,
    orderRequest,
    orderModalData,
    constructorItems,
    onOrderClick,
    onCloseOrderModal,
    removeIngredientByIndex,
    moveIngredientByIndex
  };
};
