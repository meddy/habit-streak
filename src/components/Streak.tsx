import { IconButton } from "@material-ui/core";
import { Whatshot, WhatshotOutlined } from "@material-ui/icons";
import { subDays } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";

import { Habit } from "../slices/habitSlice";
import { RootState } from "../store";
import { formatDate, parseDate, today } from "../utils";

interface StreakProps {
  habit: Habit;
  onClick: () => void;
}

export default function Streak(props: StreakProps) {
  const { habit, onClick } = props;

  const streak = useSelector((state: RootState) => {
    const history = state.history[habit.id] ?? [];
    if (!history.length) {
      return 0;
    }

    const lastIndex = history.length - 1;
    const latest = history[lastIndex];
    if (latest !== today() && latest !== formatDate(subDays(new Date(), 1))) {
      return 0;
    }

    let streak = 0;
    let current = parseDate(history[lastIndex]);
    for (let i = lastIndex; i >= 0; i--) {
      if (history[i] === formatDate(current)) {
        streak += 1;
        current = subDays(current, 1);
      } else {
        break;
      }
    }

    return streak;
  });

  const noun = streak === 1 || streak === 0 ? "day" : "days";
  const Icon = streak > 0 ? Whatshot : WhatshotOutlined;
  return (
    <IconButton onClick={onClick} title={`${streak} ${noun} streak`}>
      <Icon />
      &nbsp;
      {streak}
    </IconButton>
  );
}
