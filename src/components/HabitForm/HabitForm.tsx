import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { AddCircle as AddCircleIcon } from "@material-ui/icons";
import React, { useState } from "react";

import { Habit } from "../../slices/habitSlice";

import { StyledForm } from "./HabitForm.styles";

interface HabitFormProps {
  className?: string;
  initialValue?: string;
  existing: Habit[];
  label: string;
  onSubmit: (label: string) => string;
}

export default function HabitForm(props: HabitFormProps) {
  const { className, initialValue = "", existing, label, onSubmit } = props;

  const [value, setValue] = useState(initialValue);
  const [submitted, setSubmitted] = useState(false);

  const isValidLength = value.length >= 3 && value.length <= 100;
  const isUnique = !existing.map((habit) => habit.value).includes(value);
  const isValid = isValidLength && isUnique;
  let errorMsg = "";
  if (!isValidLength) {
    errorMsg = "Habit must be between 3 and 100 characters.";
  }

  if (!isUnique) {
    errorMsg = "Habit already defined.";
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!submitted) {
      setSubmitted(true);
    }

    if (isValid) {
      onSubmit(value);
      setSubmitted(false);
      setValue("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <StyledForm className={className} noValidate onSubmit={handleSubmit}>
      <TextField
        error={submitted && !isValid}
        fullWidth
        helperText={submitted ? errorMsg : ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <AddCircleIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        label={label}
        onChange={handleChange}
        placeholder="I want to..."
        value={value}
        variant="outlined"
      />
    </StyledForm>
  );
}
