import {
  Breadcrumbs,
  Container,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Link as RouterLink } from "react-router-dom";

import { editLabel } from "../slices/habitSlice";
import { RootState } from "../store";

import DeleteHabitButton from "./DeleteHabitButton";
import HabitForm from "./HabitForm";
import HistoryCalendar from "./HistoryCalendar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumbs: {
      marginBottom: theme.spacing(2),
    },
    actions: {
      display: "flex",
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    habitForm: {
      flexGrow: 1,
      marginRight: theme.spacing(2),
    },
  })
);

interface RouteParams {
  id: string;
}

export default function DetailsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams<RouteParams>();
  const habits = useSelector((state: RootState) => state.habits);

  const habit = habits.find((habit) => habit.id === params.id);

  if (!habit) {
    return <Redirect to="/" />;
  }

  const { id, value } = habit;
  return (
    <Container>
      <Breadcrumbs className={classes.breadcrumbs}>
        <Link color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="textPrimary">{value}</Typography>
      </Breadcrumbs>
      <Paper className={classes.actions}>
        <HabitForm
          className={classes.habitForm}
          existing={habits}
          initialValue={value}
          label="Rename"
          onSubmit={(newValue) => {
            dispatch(editLabel({ id, value: newValue }));
            return newValue;
          }}
        />
        <DeleteHabitButton habit={habit} />
      </Paper>
      <HistoryCalendar habit={habit} />
    </Container>
  );
}
