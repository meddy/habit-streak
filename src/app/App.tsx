import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "../page/HomePage";
import DetailsPage from "../page/DetailsPage";
import styles from "./App.module.css";

export default function App() {
  return (
    <BrowserRouter>
      <Container className={styles.container}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/details/:id" exact>
            <DetailsPage />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
