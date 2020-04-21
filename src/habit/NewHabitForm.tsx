import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../app/store";

type NewHabitProps = {
  onSubmit: (value: string) => void;
};

export default function NewHabitForm(props: NewHabitProps) {
  const dispatch = useDispatch();
  const { onSubmit } = props;
  const labels = useSelector((state: RootState) =>
    state.habits.map((habit) => habit.label)
  );
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState(false);

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
          onSubmit(value);
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
