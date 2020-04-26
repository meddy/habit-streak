import React, { useState } from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faClipboardCheck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import { Habit, toggleHabit } from "./habitSlice";

type HabitItemProps = {
  habit: Habit;
};

const HabitItem = (props: HabitItemProps) => {
  const { habit } = props;
  const { id, isComplete, label } = habit;

  const dispatch = useDispatch();
  const history = useHistory();
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
            dispatch(toggleHabit(id));
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
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          history.push(`/details/${id}`);
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </ListGroupItem>
  );
};

export default HabitItem;
