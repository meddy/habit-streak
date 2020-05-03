import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { compareAsc, parse } from "date-fns";

import { today } from "../utils";

interface HistorySliceState {
  [key: string]: string[];
}

interface AddHistoryPayload {
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
    addHistory(state, action: PayloadAction<AddHistoryPayload>) {
      const { id, date } = action.payload;
      const history = state[id] ?? [];

      history.push(date);
      history.sort((dateLeft, dateRight) => {
        return compareAsc(
          parse(dateLeft, "y-MM-dd", new Date()),
          parse(dateRight, "y-MM-dd", new Date())
        );
      });

      state[id] = history;
    },
  },
});

export const { toggleComplete, addHistory } = historySlice.actions;

export default historySlice;
