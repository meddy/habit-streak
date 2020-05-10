import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import habitSlice from "../habit/habitSlice";
import historySlice from "../history/historySlice";

const rootReducer = combineReducers({
  habits: habitSlice.reducer,
  history: historySlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof persistedReducer>;

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

// not authenticated
// authenticated -> sync data
// merge and local with remote
// keep local, then download remote
// then write final result to remote

export default store;
