import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../app/store";
import { Habit, addHabit } from "./habitSlice";

export default function NewHabitForm() {
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) =>
    Object.values(state.habits).map((habit: Habit) => habit.label)
  );

  const isValid =
    value.length > 0 && value.length < 100 && !labels.includes(value);

  return (
    <Form
      inline
      className="mb-3"
      noValidate
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (isValid) {
          dispatch(addHabit({ label: value, isComplete: false }));
        } else {
          setValidated(true);
        }
      }}
    >
      <Form.Control
        className="flex-fill mr-3"
        isInvalid={validated ? !isValid : undefined}
        isValid={validated ? isValid : undefined}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setValue(event.currentTarget.value);
        }}
        placeholder="I want to..."
        value={value}
      />
      <Button type="submit">Add Habit</Button>
    </Form>
  );
}
