import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { RootState } from "../app/store";
import HabitForm from "../habit/HabitForm";
import { editLabel } from "../habit/habitSlice";
import HistoryCalendar from "../history/HistoryCalendar";

interface RouteParams {
  label: string;
}

export default function DetailsPage() {
  const dispatch = useDispatch();
  const params = useParams<RouteParams>();
  const habit = useSelector((state: RootState) => state.habits[params.label]);
  const existing = useSelector((state: RootState) =>
    Object.values(state.habits)
      .map((habit) => habit.label)
      .filter((label) => label !== habit.label)
  );

  if (!habit) {
    return <Redirect to="/" />;
  }

  const { id, label } = habit;
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs="span">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Habit Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={12} lg={6}>
          Stats go here
        </Col>
        <Col>
          <HabitForm
            initialValue={label}
            existing={existing}
            submitLabel="Rename"
            onSubmit={(newLabel) => {
              dispatch(editLabel({ id, label: newLabel }));
              return newLabel;
            }}
          />
        </Col>
      </Row>
      <HistoryCalendar />
    </>
  );
}
