import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

interface ReorderPayload {
  sourceIndex: number;
  destinationIndex: number;
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reorder(state, action: PayloadAction<ReorderPayload>) {
      const { sourceIndex, destinationIndex } = action.payload;
      const [id] = state.splice(sourceIndex, 1);
      state.splice(destinationIndex, 0, id);
    },
  },
});

export const { reorder } = orderSlice.actions;

export default orderSlice;
