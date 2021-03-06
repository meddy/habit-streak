import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { isAfter } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import { Habit } from "../../slices/habitSlice";
import { addHistory, removeHistory } from "../../slices/historySlice";
import { RootState } from "../../store";
import { formatDate, parseDate } from "../../utils";
import ConfirmModal from "../ConfirmModal";

import "./HistoryCalendar.css";

interface HistoryCalendarProps {
  habit: Habit;
}

export default function HistoryCalendar(props: HistoryCalendarProps) {
  const dispatch = useDispatch();
  const { habit } = props;
  const { id, value } = habit;

  const [addHistoryDate, setAddHistoryDate] = useState("");
  const [removeHistoryDate, setRemoveHistoryDate] = useState("");

  const events = useSelector((state: RootState) =>
    (state.history[id] ?? []).map((date) => ({ title: value, date }))
  );

  return (
    <>
      <FullCalendar
        dateClick={(info) => {
          const { dateStr } = info;
          const exists = !!events.find((event) => event.date === dateStr);
          if (!exists && !isAfter(parseDate(dateStr), new Date())) {
            setAddHistoryDate(dateStr);
          }
        }}
        defaultView="dayGridMonth"
        eventClick={(info) => {
          const { start } = info.event;
          if (start instanceof Date) {
            setRemoveHistoryDate(formatDate(start));
          }
        }}
        events={events}
        header={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
      />
      <ConfirmModal
        body={`Are you sure you did "${value}" on ${addHistoryDate}?`}
        onClose={() => {
          setAddHistoryDate("");
        }}
        onConfirm={() => {
          dispatch(addHistory({ id, date: addHistoryDate }));
        }}
        show={!!addHistoryDate.length}
        title="Add History"
      />
      <ConfirmModal
        body={`"${value}" on ${removeHistoryDate}`}
        color="secondary"
        onClose={() => {
          setRemoveHistoryDate("");
        }}
        onConfirm={() => {
          dispatch(removeHistory({ id, date: removeHistoryDate }));
        }}
        show={!!removeHistoryDate.length}
        title="Delete History"
      />
    </>
  );
}
