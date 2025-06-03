import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { TIngredient } from '@utils-types';

export const selectIngredientsItems = (state: RootState) =>
  state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectIngredientById = (id: string) =>
  createSelector([selectIngredientsItems], (items) =>
    items.find((ingredient: TIngredient) => ingredient._id === id)
  );

export const selectIngredientsByIds = (ids: string[]) =>
  createSelector(selectIngredientsItems, (items) =>
    items.filter((item) => ids.includes(item._id))
  );
