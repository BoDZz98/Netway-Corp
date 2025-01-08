import tasksSlice from "./tasks-slice";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage

// Redux Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["tasks"], // Only persist the tasks slice
};

const persistedReducer = persistReducer(persistConfig, tasksSlice.reducer);

const store = configureStore({
  reducer: {
    tasks: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
