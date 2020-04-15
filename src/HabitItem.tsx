import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type HabitItemProps = {
  label: string;
  onDelete: () => void;
};

const HabitItem = (props: HabitItemProps) => {
  const { label, onDelete } = props;

  return (
    <ListGroupItem className="d-flex justify-content-between">
      <span>{label}</span>
      <Button variant="danger" size="sm" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </ListGroupItem>
  );
};

export default HabitItem;
