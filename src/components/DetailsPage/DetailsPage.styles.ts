import { Breadcrumbs, Paper } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

import HabitForm from "../HabitForm";

export const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ActionsContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
}));

export const StyledHabitForm = styled(HabitForm)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    marginRight: 0,
  },
}));
