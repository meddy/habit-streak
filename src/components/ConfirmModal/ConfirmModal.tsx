import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  PropTypes,
} from "@material-ui/core";
import React from "react";

import { StyledDialogContent } from "./ConfirmModal.styles";

interface ConfirmModalProps {
  body: string;
  color?: PropTypes.Color;
  onClose: () => void;
  onConfirm: () => void;
  show: boolean;
  title: string;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const { body, color = "primary", onClose, onConfirm, show, title } = props;

  return (
    <Dialog onClose={onClose} open={show}>
      <DialogTitle>{title}</DialogTitle>
      <StyledDialogContent>{body}</StyledDialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color={color}
          onClick={() => {
            onConfirm();
            onClose();
          }}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
