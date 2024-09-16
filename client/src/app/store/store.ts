import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/postsSlice";
import userReducer from "./reducers/userSlice";
import CommentsParentReducer from "./reducers/CommentsParentReducer";
import CommentsChildReducer from "./reducers/CommentsChildReducer";

const store: any = configureStore({
  reducer: {
    posts: postsReducer,
    users: userReducer,
    commentsParent:CommentsParentReducer,
    commentsChild:CommentsChildReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
