import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Habit } from "../slices/habitSlice";
import { toggleComplete } from "../slices/historySlice";
import { RootState } from "../store";
import { today } from "../utils";

import Streak from "./Streak";

interface HabitItemProps {
  habit: Habit;
}

export default function HabitItem(props: HabitItemProps) {
  const { habit } = props;
  const { id, value } = habit;

  const dispatch = useDispatch();
  const history = useHistory();

  const isComplete = useSelector((state: RootState) => {
    const history = state.history[id] ?? [];
    return history[history.length - 1] === today();
  });

  const handleComplete = () => {
    dispatch(toggleComplete(id));
  };

  const goToDetails = () => {
    history.push(`/details/${id}`);
  };

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          checked={isComplete}
          disableRipple
          edge="start"
          onClick={handleComplete}
        />
      </ListItemIcon>
      <ListItemText>{value}</ListItemText>
      <ListItemSecondaryAction>
        <Streak habit={habit} onClick={goToDetails} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
