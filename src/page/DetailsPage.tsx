import React from "react";
import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { RootState } from "../app/store";
import DeleteHabitButton from "../habit/DeleteHabitButton";
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
  const habits = useSelector((state: RootState) => state.habits);

  const habit = habits.find((habit) => habit.id === params.id);

  if (!habit) {
    return <Redirect to="/" />;
  }

  const { id, value } = habit;
  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item linkAs="span">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{value}</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col lg={12} xl={3}>
              <Streak habit={habit} />
            </Col>
            <Col xl={9}>
              <HabitForm
                existing={habits}
                initialValue={value}
                onSubmit={(newValue) => {
                  dispatch(editLabel({ id, value: newValue }));
                  return newValue;
                }}
                submitLabel="Rename"
              />
              <DeleteHabitButton habit={habit} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <HistoryCalendar habit={habit} />
    </Container>
  );
}
