import { Button } from "@material-ui/core";
import React, { useState } from "react";

import SignInModal from "./SignInModal";

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
      <Button onClick={handleClick}>Sign In</Button>
      <SignInModal onHide={handleHide} show={showModal} />
    </>
  );
}
