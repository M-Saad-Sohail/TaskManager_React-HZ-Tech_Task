import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default localStorage
import taskManagerReducer from "./features/taskManagerSlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, taskManagerReducer);

export const store = configureStore({
  reducer: {
    taskManager: persistedReducer,
  },
  // Middleware for redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

export const persistor = persistStore(store);
