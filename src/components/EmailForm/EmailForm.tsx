import { IconButton, InputAdornment } from "@material-ui/core";
import { Send as SendIcon } from "@material-ui/icons";
import React, { useState } from "react";

import { StyledForm, StyledTextField } from "./EmailForm.styles";

interface EmailForm {
  disabled?: boolean;
  label: string;
  onSubmit: (email: string) => void;
}

export default function EmailModal(props: EmailForm) {
  const { label, disabled = false, onSubmit } = props;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errorMsg =
    !validEmail.test(email) && submitted ? "Please enter a valid email." : "";

  return (
    <StyledForm
      noValidate
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setSubmitted(true);

        if (event.currentTarget.checkValidity()) {
          onSubmit(email);
        }
      }}
    >
      <StyledTextField
        disabled={disabled}
        error={!!errorMsg.length}
        helperText={errorMsg}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        label={label}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
        required
        type="email"
        value={email}
      />
    </StyledForm>
  );
}
