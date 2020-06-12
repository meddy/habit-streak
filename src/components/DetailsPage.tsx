import {
  Breadcrumbs,
  Container,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Link as RouterLink } from "react-router-dom";

import { editLabel } from "../slices/habitSlice";
import { RootState } from "../store";

import DeleteHabitButton from "./DeleteHabitButton";
import HabitForm from "./HabitForm";
import HistoryCalendar from "./HistoryCalendar";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ActionsContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const StyledHabitForm = styled(HabitForm)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(2),
}));

interface RouteParams {
  id: string;
}

export default function DetailsPage() {
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
      <StyledBreadcrumbs>
        <Link color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="textPrimary">{value}</Typography>
      </StyledBreadcrumbs>
      <ActionsContainer>
        <StyledHabitForm
          existing={habits}
          initialValue={value}
          label="Rename"
          onSubmit={(newValue) => {
            dispatch(editLabel({ id, value: newValue }));
            return newValue;
          }}
        />
        <DeleteHabitButton habit={habit} />
      </ActionsContainer>
      <HistoryCalendar habit={habit} />
    </Container>
  );
}
