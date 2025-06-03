import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '@store';
import { fetchIngredients as _fetchIngredients } from '@slices';
import {
  selectIngredientsItems,
  selectIngredientsLoading,
  selectIngredientsError,
  selectIngredientById,
  selectIngredientsByIds
} from '@selectors';

export const useIngredients = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectIngredientsItems);
  const loading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);

  const fetchIngredients = useCallback(() => {
    dispatch(_fetchIngredients());
  }, [dispatch]);

  const getIngredientSelectorById = useCallback(
    (id: string) => selectIngredientById(id),
    []
  );

  const getIngredientsSelectorByIds = useCallback(
    (ids: string[]) => selectIngredientsByIds(ids),
    []
  );

  return useMemo(
    () => ({
      items,
      loading,
      error,
      fetchIngredients,
      getIngredientsSelectorByIds,
      getIngredientSelectorById
    }),
    [
      items,
      loading,
      error,
      fetchIngredients,
      getIngredientSelectorById,
      getIngredientsSelectorByIds
    ]
  );
};
