import React from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

import { RootState } from "../app/store";

interface RouteParams {
  label: string;
}

export default function DetailsPage() {
  const params = useParams<RouteParams>();
  const habit = useSelector((state: RootState) => state.habits[params.label]);
  if (!habit) {
    return <Redirect to="/" />;
  }

  return <h1>{params.label}</h1>;
}
