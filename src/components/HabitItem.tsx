import {
  faSquare,
  faCheckSquare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Habit } from "../slices/habitSlice";
import { toggleComplete } from "../slices/historySlice";
import { RootState } from "../store";
import { today } from "../utils";

interface HabitItemProps {
  habit: Habit;
}

export default function HabitItem(props: HabitItemProps) {
  const { id, value } = props.habit;

  const dispatch = useDispatch();
  const history = useHistory();
  const [isHovering, setHovering] = useState(false);

  const isComplete = useSelector((state: RootState) => {
    const history = state.history[id] ?? [];
    return history[history.length - 1] === today();
  });

  const icon = isHovering || isComplete ? faCheckSquare : faSquare;

  const toggleHover = () => {
    setHovering(!isHovering);
  };

  return (
    <ListGroupItem className="d-flex justify-content-between">
      <div>
        <Button
          className="mr-2"
          onClick={() => {
            dispatch(toggleComplete(id));
          }}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          size="sm"
          variant={isComplete ? "success" : "info"}
        >
          <FontAwesomeIcon icon={icon} />
        </Button>
        <span>{value}</span>
      </div>
      <Button
        onClick={() => {
          history.push(`/details/${id}`);
        }}
        size="sm"
        variant="info"
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </ListGroupItem>
  );
}
