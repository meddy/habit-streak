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
  id: string;
}

export default function DetailsPage() {
  const dispatch = useDispatch();
  const params = useParams<RouteParams>();
  const habits = useSelector((state: RootState) =>
    Object.keys(state.habits).map((id) => ({ id, value: state.habits[id] }))
  );

  const habit = habits.find((habit) => habit.id === params.id);

  if (!habit) {
    return <Redirect to="/" />;
  }

  const { id, value } = habit;
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs="span">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{value}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col md={12} lg={6}>
          Stats go here
        </Col>
        <Col>
          <HabitForm
            initialValue={value}
            existing={habits}
            submitLabel="Rename"
            onSubmit={(newValue) => {
              dispatch(editLabel({ id, value: newValue }));
              return newValue;
            }}
          />
        </Col>
      </Row>
      <HistoryCalendar habit={habit} />
    </>
  );
}
