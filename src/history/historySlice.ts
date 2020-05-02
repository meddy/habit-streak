import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { today } from "../utils";

interface HistorySliceState {
  [key: string]: string[];
}

const initialState: HistorySliceState = {};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    toggleComplete(state, action: PayloadAction<string>) {
      const { payload } = action;
      const history = state[payload] ?? [];

      if (history[history.length - 1] === today()) {
        history.pop();
      } else {
        history.push(today());
      }

      state[payload] = history;
    },
  },
});

export const { toggleComplete } = historySlice.actions;

export default historySlice;
