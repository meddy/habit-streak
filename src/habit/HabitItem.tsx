import React, { useState } from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faClipboardCheck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import { Habit } from "./habitSlice";
import { RootState } from "../app/store";
import { toggleComplete } from "../history/historySlice";
import { today } from "../utils";

type HabitItemProps = {
  habit: Habit;
};

export default function HabitItem(props: HabitItemProps) {
  const { id, value } = props.habit;

  const dispatch = useDispatch();
  const history = useHistory();
  const [isHovering, setHovering] = useState(false);

  const isComplete = useSelector((state: RootState) => {
    const lastCompleted = (state.history[id] ?? [])[-1];
    return lastCompleted && lastCompleted === today();
  });

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
            dispatch(toggleComplete(id));
          }}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          size="sm"
          variant={isComplete ? "success" : "secondary"}
        >
          <FontAwesomeIcon icon={icon} />
        </Button>
        <span>{value}</span>
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
}
