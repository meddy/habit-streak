import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { confirmEmail } from "../slices/userSlice";

import EmailModalForm from "./EmailModalForm";

interface ConfirmEmailModalProps {
  show: boolean;
}

export default function ConfirmEmailModal(props: ConfirmEmailModalProps) {
  const dispatch = useDispatch();
  const { show } = props;

  const handleSubmit = (email: string) => {
    dispatch(confirmEmail(email));
  };

  return (
    <Modal onHide={() => {}} show={show}>
      <Modal.Header>
        <Modal.Title>Confirm Email</Modal.Title>
      </Modal.Header>
      <EmailModalForm onSubmit={handleSubmit} submitLabel="Confirm Email" />
    </Modal>
  );
}
