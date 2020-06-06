import { Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

interface AppAlertProps {
  message: string;
  onClose: () => void;
}

export default function AppAlert(props: AppAlertProps) {
  const { message, onClose } = props;

  if (!message.length) {
    return null;
  }

  return (
    <Container>
      <Alert onClose={onClose} severity="error">
        {message}
      </Alert>
    </Container>
  );
}
