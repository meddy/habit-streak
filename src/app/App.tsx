import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import DetailsPage from "../page/DetailsPage";
import HomePage from "../page/HomePage";

import LoginButton from "./LoginButton";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" className="mb-3" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Habit Streak</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">About</Nav.Link>
          </Nav>
          <LoginButton />
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/details/:id">
          <DetailsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
