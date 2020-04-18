import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

type NewHabitProps = {
  onSubmit: (value: string) => void;
  habitItems: string[];
};

export default function NewHabitForm(props: NewHabitProps) {
  const { onSubmit, habitItems } = props;
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState(false);

  const isValid =
    value.length > 0 && value.length < 100 && !habitItems.includes(value);

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
