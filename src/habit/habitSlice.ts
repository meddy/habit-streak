import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { deleteHabit } from "../app/actions";

export interface Habit {
  id: string;
  value: string;
}

interface HabitSliceState {
  [key: string]: string;
}

interface EditLabelPayload {
  id: string;
  value: string;
}

const initialState: HabitSliceState = {};

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabit(state, action: PayloadAction<string>) {
      const { payload } = action;
      const id = uuidv4();
      state[id] = payload;
    },
    editLabel(state, action: PayloadAction<EditLabelPayload>) {
      const { id, value } = action.payload;
      if (state[id]) {
        state[id] = value;
      } else {
        return state;
      }
    },
  },
  extraReducers: {
    [deleteHabit.type]: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state[id];
    },
  },
});

export const { addHabit, editLabel } = habitSlice.actions;

export default habitSlice;
