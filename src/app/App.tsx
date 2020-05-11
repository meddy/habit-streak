import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "../page/HomePage";
import DetailsPage from "../page/DetailsPage";
import styles from "./App.module.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Habit Streak</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="mr-auto">
            <Nav.Link href="#home">About</Nav.Link>
          </Nav>
          <Button variant="primary">Log In</Button>
        </Container>
      </Navbar>
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
