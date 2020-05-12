import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "../page/HomePage";
import DetailsPage from "../page/DetailsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand href="#home">Habit Streak</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">About</Nav.Link>
          </Nav>
          <Button variant="primary">Log In</Button>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/details/:id" exact>
          <DetailsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
