import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { sendEmailLink } from "../slices/userSlice";

interface LoginFormProps {
  show: boolean;
  onHide: () => void;
}

export default function LoginForm(props: LoginFormProps) {
  const { show, onHide } = props;

  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity()) {
      dispatch(sendEmailLink({ email, url: window.location.href }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Modal onHide={onHide} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Login Via Email Link</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleChange}
              pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              placeholder="Enter email"
              required
              type="email"
              value={email}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button block type="submit" variant="primary">
            Send Email
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
