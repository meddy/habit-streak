import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function LoginButton() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setShow(true);
        }}
        variant="success"
      >
        Log In
      </Button>
      <Modal
        onHide={() => {
          setShow(false);
        }}
        show={show}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Via Email Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter email" type="email" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            onClick={() => {
              setShow(false);
            }}
            variant="primary"
          >
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
