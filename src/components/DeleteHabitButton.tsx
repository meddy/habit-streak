import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Delete as DeleteIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteHabit } from "../actions";
import { Habit } from "../slices/habitSlice";

const StyledButton = styled(Button)({
  marginBottom: 0,
});

interface DeleteHabitButtonProps {
  habit: Habit;
}

export default function DeleteHabitButton(props: DeleteHabitButtonProps) {
  const { id, value } = props.habit;

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <StyledButton
        color="secondary"
        onClick={() => {
          setShowModal(true);
        }}
        variant="contained"
      >
        <DeleteIcon />
        &nbsp;Delete Habit
      </StyledButton>
      <Dialog
        onClose={() => {
          setShowModal(false);
        }}
        open={showModal}
      >
        <DialogTitle>Add History</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{value}" ?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteHabit(id));
              setShowModal(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
