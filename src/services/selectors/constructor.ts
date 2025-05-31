import { RootState } from '@store';

export const selectConstructorBun = (state: RootState) =>
  state.constructorReducer.bun;

export const selectConstructorIngredients = (state: RootState) =>
  state.constructorReducer.ingredients;

export const selectOrderRequest = (state: RootState) =>
  state.constructorReducer.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.constructorReducer.orderModalData;
