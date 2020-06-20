import { Box, Button, IconButton, Popover } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import firebase from "firebase/app";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";

export default function AccountButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const email = useSelector((state: RootState) => state.user.email);

  return (
    <>
      <IconButton
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <AccountCircle />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
        open={!!anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box>{email}</Box>
        <Button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </Button>
      </Popover>
    </>
  );
}
