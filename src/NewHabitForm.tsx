import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

type NewHabitProps = {
  onSubmit: (value: string) => void;
};

// @todo: validation
export default function NewHabitForm(props: NewHabitProps) {
  const { onSubmit } = props;
  const [value, setValue] = useState("");
  return (
    <Form
      inline
      className="mb-3"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(value);
      }}
    >
      <Form.Control
        placeholder="I want to..."
        className="flex-fill mr-3"
        value={value}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setValue(event.currentTarget.value);
        }}
      />
      <Button type="submit">Add</Button>
    </Form>
  );
}
