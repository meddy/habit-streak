import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { addHabit } from "../../slices/habitSlice";
import { RootState } from "../../store";
import HabitForm from "../HabitForm";
import HabitList from "../HabitList";

export default function HomePage() {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits);

  // Nav bar, add about and login
  // move habit form under
  // implement email link login
  return (
    <Container className="home__container">
      <HabitForm
        existing={habits}
        onSubmit={(newHabit) => {
          dispatch(addHabit(newHabit));
          return "";
        }}
        submitLabel="Add Habit"
      />
      <HabitList habits={habits} />
    </Container>
  );
}
