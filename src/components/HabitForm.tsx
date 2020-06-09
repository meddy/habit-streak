import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import { AddCircle as AddCircleIcon } from "@material-ui/icons";
import React, { useState } from "react";

import { Habit } from "../slices/habitSlice";

interface HabitFormProps {
  initialValue?: string;
  existing: Habit[];
  submitLabel: string;
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
  const classes = useStyles();
  const { initialValue = "", existing, submitLabel, onSubmit } = props;
  const [value, setValue] = useState(initialValue);
  const [validated, setValidated] = useState(false);

  const isValid =
    value.length > 0 &&
    value.length < 100 &&
    !existing.map((habit) => habit.value).includes(value);

  return (
    <form
      className={classes.root}
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
      <TextField
        error={isValid}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AddCircleIcon />
            </InputAdornment>
          ),
        }}
        label="New Habit"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.currentTarget.value);
        }}
        placeholder="I want to..."
        value={value}
        variant="outlined"
      />
    </form>
  );
}
