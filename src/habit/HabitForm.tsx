import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { Habit } from "./habitSlice";

interface HabitFormProps {
  initialValue?: string;
  existing: Habit[];
  submitLabel: string;
  onSubmit: (label: string) => string;
}

export default function HabitForm(props: HabitFormProps) {
  const { initialValue = "", existing, submitLabel, onSubmit } = props;
  const [value, setValue] = useState(initialValue);
  const [validated, setValidated] = useState(false);

  const isValid =
    value.length > 0 &&
    value.length < 100 &&
    !existing.map((habit) => habit.value).includes(value);

  return (
    <Form
      inline
      className="mb-3"
      noValidate
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (isValid) {
          setValue(onSubmit(value));
          setValidated(false);
        } else {
          setValidated(true);
        }
      }}
    >
      <Form.Control
        className="flex-fill habitForm__input"
        isInvalid={validated ? !isValid : undefined}
        isValid={validated ? isValid : undefined}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setValue(event.currentTarget.value);
        }}
        placeholder="I want to..."
        value={value}
      />
      <Button className="habitForm__button" type="submit">
        {submitLabel}
      </Button>
    </Form>
  );
}
