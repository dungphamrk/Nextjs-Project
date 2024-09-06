// src/slices/orderSlice.ts
import { createSlice, createAsyncThunk, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Order } from "../../interfaces/types"; // Import the Order interface
import { OrderService } from "../../services/orders.service"; // Import the OrderService
import axios from "axios";
import { RootState } from "../store";

// Define the initial state using the Order interface
export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
  totalPages: number;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
  modalOpen: false,
  totalPages: 1,
};

// Async thunk for fetching all orders
export const fetchPaginatedOrders: any = createAsyncThunk(
  "orders/fetchPaginatedOrders",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(
      `http://localhost:3000/orders?_page=${page}&_limit=${limit}`
    );
    console.log(response.data);
    
    return {
      orders: response.data,
      totalPages: Math.ceil(
        parseInt(response.headers["x-total-count"]) / limit
      ),
    };
  }
);

export const getAllOrders: any = createAsyncThunk(
  "orders/getAll",
  async () => {
    const data = await OrderService.getAllOrders();
    return data;
  }
);

// Async thunk for adding an order
export const addOrder: any = createAsyncThunk(
  "orders/add",
  async (order: Order) => {
    const newOrder = await OrderService.addOrder(order);
    return newOrder;
  }
);

// Async thunk for updating an order
export const updateOrder: any = createAsyncThunk(
  "orders/update",
  async (order: Order) => {
    const updatedOrder = await OrderService.updateOrder(order);
    return updatedOrder;
  }
);

// Async thunk for deleting an order
export const deleteOrder: any = createAsyncThunk(
  "orders/delete",
  async (id: number) => {
    await OrderService.deleteOrder(id);
    return id;
  }
);

// Create the order slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    openModal(state) {
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPaginatedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addOrder.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.orders.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add order";
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateOrder.fulfilled,
        (state, action: PayloadAction<Order>) => {
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update order";
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.orders = state.orders.filter(
            (order) => order.id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete order";
      });
  },
});

export const selectPaginatedOrders = createSelector(
  (state: RootState) => state.orders.orders,
  (orders) => orders
);

// Export the actions
export const { openModal, closeModal } = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;
