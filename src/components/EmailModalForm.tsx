import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface EmailModalForm {
  disabled?: boolean;
  onSubmit: (email: string) => void;
  submitLabel: string;
}

export default function EmailModalForm(props: EmailModalForm) {
  const { disabled = false, onSubmit, submitLabel } = props;
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (event.currentTarget.checkValidity()) {
      onSubmit(email);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Form noValidate onSubmit={handleSubmit} validated={validated}>
      <Modal.Body>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            disabled={disabled}
            onChange={handleChange}
            pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
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
        <Button block disabled={disabled} type="submit" variant="primary">
          {submitLabel}
        </Button>
      </Modal.Footer>
    </Form>
  );
}
