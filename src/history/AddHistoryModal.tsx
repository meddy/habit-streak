import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { Habit } from "../habit/habitSlice";
import { addHistory } from "./historySlice";

interface AddHistoryModalProps {
  date: string;
  habit: Habit;
  onClose: () => void;
}

export default function AddHistoryModal(props: AddHistoryModalProps) {
  const dispatch = useDispatch();
  const { date, habit, onClose } = props;
  const { id, value } = habit;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you did "{value}" on {date}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            dispatch(addHistory({ id, date }));
            onClose();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
