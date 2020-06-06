import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, OverlayTrigger } from "react-bootstrap";

import AccountMenu from "./AccountMenu";

export default function AccountButton() {
  return (
    <OverlayTrigger overlay={AccountMenu} placement="bottom" trigger="click">
      <Button variant="success">
        <FontAwesomeIcon icon={faUser} />
      </Button>
    </OverlayTrigger>
  );
}
