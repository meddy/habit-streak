import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase/app";

interface UserSliceState {
  authenticated: boolean;
  email: string | null;
  error?: SerializedError | null;
  loading: boolean | null;
  signInEmail: string | null;
}

interface SendEmailLinkPayload {
  email: string;
  url: string;
}

interface ReceiveSignedInPayload {
  email: string | null;
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

const initialState: UserSliceState = {
  authenticated: false,
  email: null,
  error: null,
  loading: null,
  signInEmail: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    confirmEmail(state, action) {
      state.email = action.payload;
    },
    receiveError(state, action) {
      return state;
      // show message
    },
    receiveSignedIn(state, action: PayloadAction<ReceiveSignedInPayload>) {
      state.authenticated = true;
      state.email = action.payload.email;
      state.signInEmail = null;
    },
    receiveSignedOut() {
      return initialState;
    },
  },
  extraReducers: {
    [sendEmailLink.pending.type]: (state) => {
      state.loading = true;
    },
    [sendEmailLink.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.signInEmail = action.payload;
    },
    [sendEmailLink.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const {
  receiveSignedIn,
  receiveSignedOut,
  confirmEmail,
} = userSlice.actions;

export default userSlice;
