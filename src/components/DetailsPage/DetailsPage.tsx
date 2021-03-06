import { Container, Link, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, Link as RouterLink } from "react-router-dom";

import { editLabel } from "../../slices/habitSlice";
import { RootState } from "../../store";
import DeleteHabitButton from "../DeleteHabitButton";
import HistoryCalendar from "../HistoryCalendar";

import {
  StyledBreadcrumbs,
  ActionsContainer,
  StyledHabitForm,
} from "./DetailsPage.styles";

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
