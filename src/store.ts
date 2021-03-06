import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import habitSlice from "./slices/habitSlice";
import historySlice from "./slices/historySlice";
import signInSlice from "./slices/signInSlice";
import userSlice from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const signInPersistConfig = {
  key: "user",
  storage,
  whitelist: ["email"],
};

const rootReducer = combineReducers({
  habits: habitSlice.reducer,
  history: historySlice.reducer,
  signIn: persistReducer(signInPersistConfig, signInSlice.reducer),
  user: userSlice.reducer,
});

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
