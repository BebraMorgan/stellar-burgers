import { combineReducers } from '@reduxjs/toolkit';
import user from './userSlice';
import orders from './ordersSlice';
import ingredients from './ingredientsSlice';
import feed from './feedsSlice';
import constructorSlice from './constructorSlice';
export { fetchIngredients } from './ingredientsSlice';

export { fetchOrders } from './ordersSlice';

export * from './userSlice';

export { fetchFeeds } from './feedsSlice';

export * from './constructorSlice';

const rootReducer = combineReducers({
  ingredients,
  orders,
  user,
  feed,
  constructorReducer: constructorSlice
});

export default rootReducer;
