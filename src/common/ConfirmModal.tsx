import React from "react";
import { Button, Modal } from "react-bootstrap";

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
    <Modal onHide={onClose} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          variant="primary"
        >
          {button}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
