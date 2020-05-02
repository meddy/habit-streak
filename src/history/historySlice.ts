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
      if (state[payload] === undefined) {
        state[payload] = [];
      }

      state[payload].push(today());
    },
  },
});

export const { toggleComplete } = historySlice.actions;

export default historySlice;
