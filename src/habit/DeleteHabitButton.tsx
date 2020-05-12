import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { deleteHabit } from "../app/actions";
import { Habit } from "./habitSlice";

interface DeleteHabitButtonProps {
  habit: Habit;
}

export default function DeleteHabitButton(props: DeleteHabitButtonProps) {
  const { id, value } = props.habit;

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant="danger"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
        &nbsp;Delete Habit
      </Button>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add History</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete "{value}" ?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              dispatch(deleteHabit(id));
              setShowModal(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
