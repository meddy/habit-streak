import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import EmailModalForm from "./EmailModalForm";

interface ConfirmEmailModalProps {
  show: boolean;
}

export default function ConfirmEmailModal(props: ConfirmEmailModalProps) {
  const { show } = props;
  const [value, setValue] = useState("");

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Confirm Email</Modal.Title>
      </Modal.Header>
      <EmailModalForm />
    </Modal>
  );
}
