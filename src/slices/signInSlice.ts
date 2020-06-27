import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import firebase from "firebase/app";

import { receiveSignedIn } from "./userSlice";

interface SignInSliceState {
  email: string | null;
  error?: SerializedError | null;
  loading: boolean | null;
}

interface SendEmailLinkPayload {
  email: string;
  url: string;
}

export const sendEmailLink = createAsyncThunk(
  "user/sendEmailLink",
  async (payload: SendEmailLinkPayload) => {
    const { email, url } = payload;
    await firebase
      .auth()
      .sendSignInLinkToEmail(email, { url, handleCodeInApp: true });
    return email;
  }
);

const initialState: SignInSliceState = {
  email: null,
  error: null,
  loading: null,
};

const signInSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    confirmEmail(state, action) {
      state.email = action.payload;
    },
  },
  extraReducers: {
    [sendEmailLink.pending.type](state) {
      state.loading = true;
    },
    [sendEmailLink.fulfilled.type](state, action) {
      state.loading = false;
      state.email = action.payload;
    },
    [sendEmailLink.rejected.type](state, action) {
      state.loading = false;
      state.error = action.error;
    },
    [receiveSignedIn.type]() {
      return initialState;
    },
  },
});

export const { confirmEmail } = signInSlice.actions;

export default signInSlice;
