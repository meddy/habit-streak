import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

import HabitItem from "../habit/HabitItem";
import NewHabitForm from "../habit/NewHabitForm";
import { RootState } from "../app/store";

export default function Home() {
  const habits = useSelector((state: RootState) => Object.values(state.habits));

  return (
    <>
      <NewHabitForm />
      <ListGroup>
        {habits.map((habit) => (
          <HabitItem key={habit.label} habit={habit} />
        ))}
      </ListGroup>
    </>
  );
}
