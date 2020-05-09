import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../app/store";
import HabitForm from "../habit/HabitForm";
import HabitList from "../habit/HabitList";
import { addHabit } from "../habit/habitSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits);

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
      <HabitList habits={habits} />
    </>
  );
}
