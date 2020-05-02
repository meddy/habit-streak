import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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

const initialState: HabitSliceState = {
  "fde94b95-2059-4446-92e6-c23c5e92f6ac": "Read a book",
  "a834a10c-ea6d-454d-a381-09cc3258b11c": "Study Spanish",
  "11470416-6669-48cc-ab03-64caea661a23": "Stretch 20 mins",
};

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
});

export const { addHabit, editLabel } = habitSlice.actions;

export default habitSlice;
