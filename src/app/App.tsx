import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HabitDetails from "../habit/HabitDetails";
import Home from "../page/Home";
import styles from "./App.module.css";

export default function App() {
  return (
    <BrowserRouter>
      <Container className={styles.container}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/details/:label" exact>
            <HabitDetails />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
