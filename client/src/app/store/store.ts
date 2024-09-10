import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/postsSlice";
import userReducer from "./reducers/userSlice";

const store: any = configureStore({
  reducer: {
    posts: postsReducer,
    users: userReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
