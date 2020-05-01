import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../app/store";
import HabitForm from "../habit/HabitForm";
import HabitItem from "../habit/HabitItem";
import { addHabit } from "../habit/habitSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) =>
    Object.keys(state.habits).map((id) => ({ id, value: state.habits[id] }))
  );

  return (
    <>
      <Row>
        <Col md={12} lg={6}>
          <h1>Habit Streak</h1>
        </Col>
        <Col>
          <HabitForm
            existing={habits}
            submitLabel="Add Habit"
            onSubmit={(newHabit) => {
              dispatch(addHabit(newHabit));
              return "";
            }}
          />
        </Col>
      </Row>
      <ListGroup>
        {habits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} />
        ))}
      </ListGroup>
    </>
  );
}
