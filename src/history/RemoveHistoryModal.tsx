import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { removeHistory } from "./historySlice";
import { Habit } from "../habit/habitSlice";

interface AddHistoryModalProps {
  date: string;
  habit: Habit;
  onClose: () => void;
  show: boolean;
}

export default function RemoveHistoryModal(props: AddHistoryModalProps) {
  const dispatch = useDispatch();
  const { date, habit, onClose, show } = props;
  const { id } = habit;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remove History</Modal.Title>
      </Modal.Header>
      <Modal.Body>{date}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            dispatch(removeHistory({ id, date }));
            onClose();
          }}
        >
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
