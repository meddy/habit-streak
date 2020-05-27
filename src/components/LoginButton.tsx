import React, { useState } from "react";
import { Button } from "react-bootstrap";

import LoginForm from "./LoginForm";

export default function LoginButton() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleHide = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={handleClick} variant="success">
        Log In
      </Button>
      <LoginForm onHide={handleHide} show={showModal} />
    </>
  );
}
