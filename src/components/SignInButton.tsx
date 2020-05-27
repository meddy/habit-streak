import React, { useState } from "react";
import { Button } from "react-bootstrap";

import SignInForm from "./SignInForm";

export default function SignInButton() {
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
        Sign In
      </Button>
      <SignInForm onHide={handleHide} show={showModal} />
    </>
  );
}
