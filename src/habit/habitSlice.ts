import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Habit = {
  label: string;
  isComplete: boolean;
};

type HabitSliceState = {
  [key: string]: Habit;
};

type EditLabelPayload = {
  oldLabel: string;
  newLabel: string;
};

const initialState: HabitSliceState = {
  "Read a book": { label: "Read a book", isComplete: true },
  "Study Spanish": { label: "Study Spanish", isComplete: false },
  "Stretch 20 mins": { label: "Stretch 20 mins", isComplete: false },
};

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabit(state, action: PayloadAction<Habit>) {
      const { payload } = action;
      state[payload.label] = payload;
    },
    editLabel(state, action: PayloadAction<EditLabelPayload>) {
      const { oldLabel, newLabel } = action.payload;
      state[newLabel] = state[oldLabel];
      delete state[oldLabel];
    },
    toggleHabit(state, action: PayloadAction<string>) {
      const { payload } = action;
      state[payload].isComplete = !state[payload].isComplete;
    },
  },
});

export const { addHabit, editLabel, toggleHabit } = habitSlice.actions;

export default habitSlice;
