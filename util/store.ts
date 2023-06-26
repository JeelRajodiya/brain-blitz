import { configureStore } from "@reduxjs/toolkit";
import { QuizResult } from "./types";
import counterSlice from "./slices/counterSlice";
import resultSlice from "./slices/resultSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    quizResult: resultSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
