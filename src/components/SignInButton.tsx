import { Button } from "@material-ui/core";
import React, { useState } from "react";

import SignInModal from "./SignInModal";

export default function SignInButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Sign In
      </Button>
      <SignInModal
        onHide={() => {
          setShowModal(false);
        }}
        show={showModal}
      />
    </>
  );
}
