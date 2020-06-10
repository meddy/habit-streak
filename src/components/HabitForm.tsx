import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AddCircle as AddCircleIcon } from "@material-ui/icons";
import React, { useState } from "react";

import { Habit } from "../slices/habitSlice";

interface HabitFormProps {
  initialValue?: string;
  existing: Habit[];
  label: string;
  onSubmit: (label: string) => string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default function HabitForm(props: HabitFormProps) {
  const { initialValue = "", existing, label, onSubmit } = props;

  const classes = useStyles();
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
    <form className={classes.root} noValidate onSubmit={handleSubmit}>
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
    </form>
  );
}
