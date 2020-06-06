import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { OverlayInjectedProps } from "react-bootstrap/Overlay";

export default function AccountMenu(props: OverlayInjectedProps) {
  return (
    <Button style={props.style} variant="light">
      Sign Out
      <FontAwesomeIcon icon={faSignOutAlt} />
    </Button>
  );
  // account icon
  // overlay with email address
  // sign out button
}
