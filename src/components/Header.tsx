import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";

import AccountButton from "./AccountButton";
import SignInButton from "./SignInButton";

const useStyle = makeStyles((theme) => ({
  appName: {
    marginRight: theme.spacing(2),
  },
  navItem: {
    flexGrow: 1,
  },
  root: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Header() {
  const classes = useStyle();
  const authenticated = useSelector(
    (state: RootState) => state.user.authenticated
  );

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography className={classes.appName} variant="h4">
          Habit Streak
        </Typography>
        <Typography className={classes.navItem} variant="h6">
          About
        </Typography>
        {authenticated && <AccountButton />}
        {!authenticated && <SignInButton />}
      </Toolbar>
    </AppBar>
  );
}
