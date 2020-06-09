import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import React from "react";
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

  const isComplete = useSelector((state: RootState) => {
    const history = state.history[id] ?? [];
    return history[history.length - 1] === today();
  });

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          checked={isComplete}
          disableRipple
          edge="start"
          onClick={() => {
            dispatch(toggleComplete(id));
          }}
        />
      </ListItemIcon>
      <ListItemText>{value}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => {
            history.push(`/details/${id}`);
          }}
        >
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
