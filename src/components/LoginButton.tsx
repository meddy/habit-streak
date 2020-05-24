import firebase from "firebase/app";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const actionCodeSettings = {
  url: window.location.href,
  handleCodeInApp: true,
};

export default function LoginButton() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        variant="success"
      >
        Log In
      </Button>
      <Modal
        onHide={() => {
          setShowModal(false);
        }}
        show={showModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Via Email Link</Modal.Title>
        </Modal.Header>
        <Form
          noValidate
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);

            const form = event.currentTarget;
            if (form.checkValidity()) {
              try {
                await firebase
                  .auth()
                  .sendSignInLinkToEmail(email, actionCodeSettings);
                // save email in local storage
              } catch (err) {
                // todo: do something
                console.log(err);
              }
            }
          }}
          validated={validated}
        >
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
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
    </>
  );
}
