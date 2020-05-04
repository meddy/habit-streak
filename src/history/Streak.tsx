import React from "react";
import { useSelector } from "react-redux";

import { Habit } from "../habit/habitSlice";
import { RootState } from "../app/store";
import { formatDate, parseDate, today } from "../utils";
import { subDays } from "date-fns";

interface StreakProps {
  habit: Habit;
}

export default function Streak(props: StreakProps) {
  const { habit } = props;
  const streak = useSelector((state: RootState) => {
    const history = state.history[habit.id] ?? [];
    if (!history.length) {
      console.log("test");
      return 0;
    }

    const lastIndex = history.length - 1;
    const latest = history[lastIndex];
    if (latest !== today() && latest !== formatDate(subDays(new Date(), 1))) {
      console.log("test2");
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

  return <p>Streak: {streak}</p>;
}
