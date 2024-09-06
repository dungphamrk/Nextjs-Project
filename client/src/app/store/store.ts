import { configureStore } from "@reduxjs/toolkit";
import producstReducer from "./reducers/productsSlice";
import userReducer from "./reducers/userSlice";
import categoriesSlice from "./reducers/categoriesSlice";
import cartReducer from "./reducers/cartSlice";
import orderSlice from "./reducers/orderSlice";

const store: any = configureStore({
  reducer: {
    products: producstReducer,
    users: userReducer,
    categories: categoriesSlice,
    cart: cartReducer,
    orders: orderSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
