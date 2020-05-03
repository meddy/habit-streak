import React, { useState } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import { RootState } from "../app/store";
import { Habit } from "../habit/habitSlice";
import AddHistoryModal from "./AddHistoryModal";

interface HistoryCalendarProps {
  habit: Habit;
}

export default function HistoryCalendar(props: HistoryCalendarProps) {
  const { habit } = props;
  const { id, value } = habit;

  const [date, setDate] = useState("");

  const events = useSelector((state: RootState) =>
    (state.history[id] ?? []).map((date) => ({ title: value, date }))
  );

  return (
    <>
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={({ dateStr }) => {
          const exists = !!events.find((event) => event.date === dateStr);
          if (!exists) {
            setDate(dateStr);
          }
        }}
        events={events}
      />
      {!!date.length && (
        <AddHistoryModal
          date={date}
          habit={habit}
          onClose={() => {
            setDate("");
          }}
        />
      )}
    </>
  );
}
