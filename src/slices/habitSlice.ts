import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { deleteHabit } from "../actions";

export interface Habit {
  id: string;
  value: string;
}

interface EditLabelPayload {
  id: string;
  value: string;
}

interface ReorderPayload {
  sourceIndex: number;
  destinationIndex: number;
}

const initialState: Habit[] = [];

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabit(state, action: PayloadAction<string>) {
      state.push({ id: uuidv4(), value: action.payload });
    },
    editLabel(state, action: PayloadAction<EditLabelPayload>) {
      const { id, value } = action.payload;
      const habit = state.find((habit) => habit.id === id);
      if (habit) {
        habit.id = id;
        habit.value = value;
      } else {
        return state;
      }
    },
    reorder(state, action: PayloadAction<ReorderPayload>) {
      const { sourceIndex, destinationIndex } = action.payload;
      const [id] = state.splice(sourceIndex, 1);
      state.splice(destinationIndex, 0, id);
    },
  },
  extraReducers: {
    [deleteHabit.type](state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.findIndex((habit) => habit.id === id);
      if (typeof index !== "undefined") {
        state.splice(index, 1);
      } else {
        return state;
      }
    },
  },
});

export const { addHabit, editLabel, reorder } = habitSlice.actions;

export default habitSlice;
