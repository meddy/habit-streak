import React, { useState } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { isAfter } from "date-fns";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import AddHistoryModal from "./AddHistoryModal";
import { RootState } from "../app/store";
import { Habit } from "../habit/habitSlice";
import { formatDate, parseDate } from "../utils";
import RemoveHistoryModal from "./RemoveHistoryModal";

interface HistoryCalendarProps {
  habit: Habit;
}

export default function HistoryCalendar(props: HistoryCalendarProps) {
  const { habit } = props;
  const { id, value } = habit;

  const [date, setDate] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

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
        dateClick={(info) => {
          const { dateStr } = info;
          const exists = !!events.find((event) => event.date === dateStr);
          if (!exists && !isAfter(parseDate(dateStr), new Date())) {
            setDate(dateStr);
            setShowAddModal(true);
          }
        }}
        eventClick={(info) => {
          const { start } = info.event;
          if (start instanceof Date) {
            setDate(formatDate(start));
            setShowRemoveModal(true);
          }
        }}
        events={events}
      />
      <AddHistoryModal
        show={showAddModal}
        date={date}
        habit={habit}
        onClose={() => {
          setDate("");
          setShowAddModal(false);
        }}
      />
      <RemoveHistoryModal
        show={showRemoveModal}
        date={date}
        habit={habit}
        onClose={() => {
          setDate("");
          setShowRemoveModal(false);
        }}
      />
    </>
  );
}
