import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { sendEmailLink } from "../slices/userSlice";
import { RootState } from "../store";

interface SignInModalProps {
  show: boolean;
  onHide: () => void;
}

export default function SignInModal(props: SignInModalProps) {
  const { show, onHide } = props;

  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [value, setValue] = useState("");
  const { loading, email } = useSelector((state: RootState) => state.user);
  const emailLinkSent = email && loading !== null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity()) {
      dispatch(sendEmailLink({ email: value, url: window.location.href }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
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
        <Form noValidate onSubmit={handleSubmit} validated={validated}>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                disabled={!!loading}
                onChange={handleChange}
                pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                placeholder="foo@bar.com"
                required
                type="email"
                value={value}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button block disabled={!!loading} type="submit" variant="primary">
              Send Email
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
}
