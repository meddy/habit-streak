import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "habit",
  initialState: [
    { label: "Read a book", isComplete: true },
    { label: "Study Spanish", isComplete: false },
    { label: "Stretch 20 mins", isComplete: false },
  ],
  reducers: {},
});
