import { configureStore } from "@reduxjs/toolkit";
import taskManagerReducer from "./features/taskManagerSlice";

export const store = configureStore({
  reducer: {
    taskManager: taskManagerReducer,
  },
});
