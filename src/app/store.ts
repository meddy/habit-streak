import { combineReducers, configureStore } from "@reduxjs/toolkit";

import habitSlice from "../habit/habitSlice";

const rootReducer = combineReducers({
  habits: habitSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
