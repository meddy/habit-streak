import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { sendEmailLink } from "../slices/userSlice";
import { RootState } from "../store";

import EmailModalForm from "./EmailModalForm";

interface SignInModalProps {
  show: boolean;
  onHide: () => void;
}

export default function SignInModal(props: SignInModalProps) {
  const { show, onHide } = props;

  const dispatch = useDispatch();
  const { loading, email } = useSelector((state: RootState) => state.user);
  const emailLinkSent = email && loading !== null;

  const handleSubmit = (email: string) => {
    dispatch(sendEmailLink({ email, url: window.location.href }));
  };

  return (
    <Modal onHide={onHide} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In Via Email Link</Modal.Title>
      </Modal.Header>
      {emailLinkSent && (
        <Modal.Body>
          <p>Please check your email for a link to complete sign in.</p>
        </Modal.Body>
      )}
      {!emailLinkSent && (
        <EmailModalForm
          disabled={!!loading}
          onSubmit={handleSubmit}
          submitLabel="Send Email"
        />
      )}
    </Modal>
  );
}
