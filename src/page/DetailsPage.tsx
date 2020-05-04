import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { Breadcrumb, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { RootState } from "../app/store";
import HabitForm from "../habit/HabitForm";
import { editLabel } from "../habit/habitSlice";
import HistoryCalendar from "../history/HistoryCalendar";
import Streak from "../history/Streak";

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
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col md={12} lg={6}>
              <Streak habit={habit} />
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
        </Card.Body>
      </Card>
      <h2 className="display-3">Habit History</h2>
      <HistoryCalendar habit={habit} />
    </>
  );
}
