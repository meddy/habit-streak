import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import styles from "./App.module.css";
import Home from "./Home";

export default function App() {
  return (
    <BrowserRouter>
      <Container className={styles.container}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
