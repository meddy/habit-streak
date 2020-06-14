import {
  AppBar,
  AppBarProps,
  Typography,
  TypographyProps,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React from "react";

export const StyledAppBar = styled((props: AppBarProps) => (
  <AppBar position="static" {...props} />
))(({ theme }) => ({
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const AppName = styled((props: TypographyProps) => (
  <Typography variant="h4" {...props} />
))(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

export const NavItem = styled((props: TypographyProps) => (
  <Typography variant="h6" {...props} />
))({
  flexGrow: 1,
});
