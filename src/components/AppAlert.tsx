import React from "react";
import { Alert, Container } from "react-bootstrap";

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
      <Alert dismissible onClose={onClose} variant="danger">
        {message}
      </Alert>
    </Container>
  );
}
