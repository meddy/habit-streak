import { Button, ListItem } from "@material-ui/core";
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import React, { useState } from "react";
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

  const Icon =
    isHovering || isComplete ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

  const toggleHover = () => {
    setHovering(!isHovering);
  };

  return (
    <ListItem>
      <div>
        <Button
          onClick={() => {
            dispatch(toggleComplete(id));
          }}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          <Icon />
        </Button>
        <span>{value}</span>
      </div>
      <Button
        onClick={() => {
          history.push(`/details/${id}`);
        }}
      >
        <EditIcon />
      </Button>
    </ListItem>
  );
}
