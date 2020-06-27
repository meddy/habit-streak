import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserSliceState {
  email: string | null;
}

const initialState: UserSliceState = {
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    receiveSignedIn(state, action: PayloadAction<string | null>) {
      state.email = action.payload;
    },
    receiveSignedOut() {
      return initialState;
    },
  },
});

export const { receiveSignedIn, receiveSignedOut } = userSlice.actions;

export default userSlice;
