import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

type NewHabitProps = {
  onSubmit: (value: string) => void;
  habitItems: string[];
};

export default function NewHabitForm(props: NewHabitProps) {
  const { onSubmit, habitItems } = props;
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState(false);

  // @todo incorporate
  const isUnique = !habitItems.includes(value);

  return (
    <Form
      inline
      className="mb-3"
      noValidate
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (!form.checkValidity() || !isUnique) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          // @todo reset input
          event.preventDefault();
          onSubmit(value);
        }

        setValidated(true);
      }}
      validated={validated}
    >
      <Form.Control
        className="flex-fill mr-3"
        maxLength={100}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setValue(event.currentTarget.value);
        }}
        placeholder="I want to..."
        required
        value={value}
      />
      <Button type="submit">Add Habit</Button>
    </Form>
  );
}
