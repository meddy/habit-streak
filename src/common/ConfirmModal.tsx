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
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {button}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
