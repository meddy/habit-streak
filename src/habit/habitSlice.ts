import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Habit = {
  id: string;
  label: string;
  isComplete: boolean;
};

type HabitSliceState = {
  [key: string]: Habit;
};

type EditLabelPayload = {
  id: string;
  label: string;
};

const initialState: HabitSliceState = {
  "fde94b95-2059-4446-92e6-c23c5e92f6ac": {
    id: "fde94b95-2059-4446-92e6-c23c5e92f6ac",
    label: "Read a book",
    isComplete: true,
  },
  "a834a10c-ea6d-454d-a381-09cc3258b11c": {
    id: "a834a10c-ea6d-454d-a381-09cc3258b11c",
    label: "Study Spanish",
    isComplete: false,
  },
  "11470416-6669-48cc-ab03-64caea661a23": {
    id: "11470416-6669-48cc-ab03-64caea661a23",
    label: "Stretch 20 mins",
    isComplete: false,
  },
};

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabit(state, action: PayloadAction<string>) {
      const { payload } = action;
      const id = uuidv4();
      state[id] = {
        id,
        label: payload,
        isComplete: false,
      };
    },
    editLabel(state, action: PayloadAction<EditLabelPayload>) {
      const { id, label } = action.payload;
      if (state[id]) {
        state[id].label = label;
      } else {
        return state;
      }
    },
    toggleHabit(state, action: PayloadAction<string>) {
      const { payload } = action;
      state[payload].isComplete = !state[payload].isComplete;
    },
  },
});

export const { addHabit, editLabel, toggleHabit } = habitSlice.actions;

export default habitSlice;
