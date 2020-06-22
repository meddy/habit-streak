import { Dialog, DialogTitle } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendEmailLink } from "../slices/userSlice";
import { RootState } from "../store";

import { StyledDialogContent } from "./ConfirmModal/ConfirmModal.styles";
import EmailForm from "./EmailForm";

interface SignInModalProps {
  show: boolean;
  onHide: () => void;
}

export default function SignInModal(props: SignInModalProps) {
  const { show, onHide } = props;

  const dispatch = useDispatch();
  const { loading, signInEmail } = useSelector(
    (state: RootState) => state.user
  );
  const emailLinkSent = signInEmail && loading !== null;

  return (
    <Dialog onClose={onHide} open={show}>
      <DialogTitle>Sign In Via Email Link</DialogTitle>
      <StyledDialogContent>
        {emailLinkSent && (
          <p>
            Please check your email for a link to complete the sign in process.
          </p>
        )}
        {!emailLinkSent && (
          <EmailForm
            disabled={!!loading}
            label="Email Address"
            onSubmit={(email: string) => {
              dispatch(sendEmailLink({ email, url: window.location.href }));
            }}
          />
        )}
      </StyledDialogContent>
    </Dialog>
  );
}
