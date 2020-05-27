import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import firebase from "firebase/app";

interface UserSliceState {
  email: string | null;
  error?: SerializedError | null;
  pending: boolean;
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

const initialState: UserSliceState = {
  email: null,
  error: null,
  pending: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [sendEmailLink.pending.type]: (state) => {
      state.pending = true;
    },
    [sendEmailLink.fulfilled.type]: (state, action) => {
      state.email = action.payload;
    },
    [sendEmailLink.rejected.type]: (state, action) => {
      state.pending = false;
      state.error = action.error;
    },
  },
});

export default userSlice;
