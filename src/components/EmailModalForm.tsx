import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

interface EmailModalForm {
  disabled?: boolean;
  onSubmit: (email: string) => void;
  submitLabel: string;
}

export default function EmailModalForm(props: EmailModalForm) {
  const { disabled = false, onSubmit, submitLabel } = props;
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);

  const pattern =
    '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$';

  const errorMsg = "Please enter a valid email.";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (event.currentTarget.checkValidity()) {
      onSubmit(email);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <DialogContent>
        <TextField
          disabled={disabled}
          label="Email address"
          onChange={handleChange}
          required
          type="email"
          value={email}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={disabled} type="submit">
          {submitLabel}
        </Button>
      </DialogActions>
    </form>
  );
}
