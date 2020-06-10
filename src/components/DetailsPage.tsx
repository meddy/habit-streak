import { Breadcrumbs, Container, Link, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

import { editLabel } from "../slices/habitSlice";
import { RootState } from "../store";

import DeleteHabitButton from "./DeleteHabitButton";
import HabitForm from "./HabitForm";
import HistoryCalendar from "./HistoryCalendar";
import Streak from "./Streak";

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
      <Breadcrumbs>
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">{value}</Typography>
      </Breadcrumbs>
      <Streak habit={habit} />
      <HabitForm
        existing={habits}
        initialValue={value}
        label="Rename"
        onSubmit={(newValue) => {
          dispatch(editLabel({ id, value: newValue }));
          return newValue;
        }}
      />
      <DeleteHabitButton habit={habit} />
      <HistoryCalendar habit={habit} />
    </Container>
  );
}
