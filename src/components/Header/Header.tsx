import { Toolbar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import AccountButton from "../AccountButton";
import SignInButton from "../SignInButton";

import { StyledAppBar, AppName, NavItem } from "./Header.styles";

export default function Header() {
  const authenticated = useSelector(
    (state: RootState) => state.user.authenticated
  );

  return (
    <StyledAppBar>
      <Toolbar>
        <AppName>Habit Streak</AppName>
        <NavItem>About</NavItem>
        {authenticated && <AccountButton />}
        {!authenticated && <SignInButton />}
      </Toolbar>
    </StyledAppBar>
  );
}
