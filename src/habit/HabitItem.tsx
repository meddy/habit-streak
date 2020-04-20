import React, { useState } from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faClipboardCheck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

type HabitItemProps = {
  isComplete: boolean;
  label: string;
  onDelete: () => void;
  onToggle: () => void;
};

const HabitItem = (props: HabitItemProps) => {
  const { isComplete, label, onDelete, onToggle } = props;
  const [isHovering, setHovering] = useState(false);
  const icon = isHovering || isComplete ? faClipboardCheck : faClipboard;

  const toggleHover = () => {
    setHovering(!isHovering);
  };

  return (
    <ListGroupItem className="d-flex justify-content-between">
      <div>
        <Button
          className="mr-2"
          onClick={() => {
            onToggle();
          }}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          size="sm"
          variant={isComplete ? "success" : "secondary"}
        >
          <FontAwesomeIcon icon={icon} />
        </Button>
        <span>{label}</span>
      </div>
      <Button onClick={onDelete} size="sm" variant="secondary">
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </ListGroupItem>
  );
};

export default HabitItem;
