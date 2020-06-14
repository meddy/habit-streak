import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";

import { confirmEmail } from "../slices/userSlice";

import EmailModalForm from "./EmailModalForm";

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
        <EmailModalForm
          onSubmit={(email: string) => {
            dispatch(confirmEmail(email));
          }}
          submitLabel="Confirm Email"
        />
      </DialogContent>
    </Dialog>
  );
}
