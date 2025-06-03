import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface OrdersState {
  orders: TOrder[];
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
}

export const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null
};

export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchOrders', async (_, thunkAPI) => {
  try {
    const orders = await getOrdersApi();
    return orders;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch orders');
  }
});

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orders/fetchOrderByNumber', async (number, thunkAPI) => {
  try {
    const response = await getOrderByNumberApi(number);
    if (response.success && response.orders.length > 0) {
      return response.orders[0];
    } else {
      return thunkAPI.rejectWithValue('Order not found');
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch order');
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error loading orders';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.loading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error loading order';
      });
  }
});

export const { clearCurrentOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
