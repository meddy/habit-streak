import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../app/store";
import HabitForm from "../habit/HabitForm";
import HabitItem from "../habit/HabitItem";
import { addHabit } from "../habit/habitSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => Object.values(state.habits));
  const existing = habits.map((habit) => habit.label);

  return (
    <>
      <Row>
        <Col md={12} lg={6}>
          <h1>Habit Streak</h1>
        </Col>
        <Col>
          <HabitForm
            existing={existing}
            submitLabel="Add Habit"
            onSubmit={(label) => {
              dispatch(addHabit(label));
              return "";
            }}
          />
        </Col>
      </Row>
      <ListGroup>
        {habits.map((habit) => (
          <HabitItem key={habit.label} habit={habit} />
        ))}
      </ListGroup>
    </>
  );
}
