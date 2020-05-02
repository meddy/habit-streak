import React from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import { RootState } from "../app/store";
import { Habit } from "../habit/habitSlice";

interface HistoryCalendarProps {
  habit: Habit;
}

export default function HistoryCalendar(props: HistoryCalendarProps) {
  const { id, value } = props.habit;
  const events = useSelector((state: RootState) =>
    (state.history[id] ?? []).map((date) => ({ title: value, date }))
  );

  return (
    <FullCalendar
      defaultView="dayGridMonth"
      header={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={(arg) => {
        console.log(arg);
      }}
      events={events}
    />
  );
}
