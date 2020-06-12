import {
  AppBar,
  AppBarProps,
  Toolbar,
  Typography,
  TypographyProps,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";

import AccountButton from "./AccountButton";
import SignInButton from "./SignInButton";

const StyledAppBar = styled((props: AppBarProps) => (
  <AppBar position="static" {...props} />
))(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const AppName = styled((props: TypographyProps) => (
  <Typography variant="h4" {...props} />
))(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const NavItem = styled((props: TypographyProps) => (
  <Typography variant="h6" {...props} />
))({
  flexGrow: 1,
});

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
