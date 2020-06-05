import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";

export default function AccountMenu() {
  return (
    <Button variant="light">
      Sign Out
      <FontAwesomeIcon icon={faSignOutAlt} />
    </Button>
  );
  // account icon
  // overlay with email address
  // sign out button
}
