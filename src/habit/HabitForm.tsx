import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

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
      <Row>
        <Col md={9} lg={8} xl={9}>
          <Form.Control
            className="mb-2"
            isInvalid={validated ? !isValid : undefined}
            isValid={validated ? isValid : undefined}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setValue(event.currentTarget.value);
            }}
            placeholder="I want to..."
            value={value}
          />
        </Col>
        <Col>
          <Button block type="submit">
            {submitLabel}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
