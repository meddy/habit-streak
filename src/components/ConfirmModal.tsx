import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

interface ConfirmModalProps {
  body: string;
  button: string;
  onClose: () => void;
  onConfirm: () => void;
  show: boolean;
  title: string;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const { body, button, onClose, onConfirm, show, title } = props;

  return (
    <Dialog onClose={onClose} open={show}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{body}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {button}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
