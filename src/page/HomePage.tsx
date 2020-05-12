import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import { RootState } from "../app/store";
import HabitForm from "../habit/HabitForm";
import HabitList from "../habit/HabitList";
import { addHabit } from "../habit/habitSlice";

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
        submitLabel="Add Habit"
        onSubmit={(newHabit) => {
          dispatch(addHabit(newHabit));
          return "";
        }}
      />
      <HabitList habits={habits} />
    </Container>
  );
}
