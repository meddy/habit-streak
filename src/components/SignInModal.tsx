import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendEmailLink } from "../slices/userSlice";
import { RootState } from "../store";

import EmailModalForm from "./EmailModalForm";

interface SignInModalProps {
  show: boolean;
  onHide: () => void;
}

export default function SignInModal(props: SignInModalProps) {
  const { show, onHide } = props;

  const dispatch = useDispatch();
  const { loading, email } = useSelector((state: RootState) => state.user);
  const emailLinkSent = email && loading !== null;

  return (
    <Dialog onClose={onHide} open={show}>
      <DialogTitle>Sign In Via Email Link</DialogTitle>
      {emailLinkSent && (
        <DialogContent>
          <p>Please check your email for a link to complete sign in.</p>
        </DialogContent>
      )}
      {!emailLinkSent && (
        <EmailModalForm
          disabled={!!loading}
          onSubmit={(email: string) => {
            dispatch(sendEmailLink({ email, url: window.location.href }));
          }}
          submitLabel="Send Email"
        />
      )}
    </Dialog>
  );
}
