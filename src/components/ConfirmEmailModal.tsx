import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";

import { confirmEmail } from "../slices/userSlice";

import EmailForm from "./EmailForm";

interface ConfirmEmailModalProps {
  show: boolean;
}

export default function ConfirmEmailModal(props: ConfirmEmailModalProps) {
  const dispatch = useDispatch();
  const { show } = props;

  return (
    <Dialog onClose={() => {}} open={show}>
      <DialogTitle>Confirm Email</DialogTitle>
      <DialogContent>
        <EmailForm
          label="Confirm Email"
          onSubmit={(email: string) => {
            dispatch(confirmEmail(email));
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
