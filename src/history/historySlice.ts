import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { compareAsc } from "date-fns";

import { today, parseDate } from "../utils";

interface HistorySliceState {
  [key: string]: string[];
}

interface HistoryPayload {
  id: string;
  date: string;
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
    addHistory(state, action: PayloadAction<HistoryPayload>) {
      const { id, date } = action.payload;
      const history = state[id] ?? [];

      history.push(date);
      history.sort((dateLeft, dateRight) =>
        compareAsc(parseDate(dateLeft), parseDate(dateRight))
      );

      state[id] = history;
    },
    removeHistory(state, action: PayloadAction<HistoryPayload>) {
      const { id, date: removeDate } = action.payload;
      const history = state[id] ?? [];

      state[id] = history.filter((date) => date !== removeDate);
    },
  },
});

export const {
  toggleComplete,
  addHistory,
  removeHistory,
} = historySlice.actions;

export default historySlice;
