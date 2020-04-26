import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

import { RootState } from "../app/store";
import HabitForm from "../habit/HabitForm";
import { editLabel } from "../habit/habitSlice";

interface RouteParams {
  label: string;
}

export default function DetailsPage() {
  const dispatch = useDispatch();
  const params = useParams<RouteParams>();
  const history = useHistory();
  const habit = useSelector((state: RootState) => state.habits[params.label]);
  const existing = useSelector((state: RootState) =>
    Object.values(state.habits)
      .map((habit) => habit.label)
      .filter((label) => label !== habit.label)
  );

  if (!habit) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs="span">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Habit Details</Breadcrumb.Item>
      </Breadcrumb>
      <HabitForm
        existing={existing}
        submitLabel="Rename"
        onSubmit={(newLabel) => {
          dispatch(editLabel({ oldLabel: habit.label, newLabel }));
          history.push(`/details/${newLabel}`);
        }}
      />
    </>
  );
}
