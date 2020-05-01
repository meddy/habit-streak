import { combineReducers, configureStore } from "@reduxjs/toolkit";

import habitSlice from "../habit/habitSlice";
import historySlice from "../history/historySlice";

const rootReducer = combineReducers({
  habits: habitSlice.reducer,
  history: historySlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
