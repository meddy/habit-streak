import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

type HabitFormProps = {
  existing: String[];
  submitLabel: String;
  onSubmit: (label: string) => void;
};

export default function HabitForm(props: HabitFormProps) {
  const { existing, submitLabel, onSubmit } = props;
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState(false);

  const isValid =
    value.length > 0 && value.length < 100 && !existing.includes(value);

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
          setValue("");
          setValidated(false);
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
      <Button type="submit">{submitLabel}</Button>
    </Form>
  );
}
