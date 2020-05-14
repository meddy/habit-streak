import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

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
        className="deleteHabitButton__button"
        onClick={() => {
          setShowModal(true);
        }}
        variant="danger"
      >
        <FontAwesomeIcon icon={faTrash} />
        &nbsp;Delete Habit
      </Button>
      <Modal
        onHide={() => {
          setShowModal(false);
        }}
        show={showModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add History</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete "{value}" ?</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowModal(false);
            }}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteHabit(id));
              setShowModal(false);
            }}
            variant="danger"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
