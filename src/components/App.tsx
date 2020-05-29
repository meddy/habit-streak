import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import DetailsPage from "./DetailsPage";
import HomePage from "./HomePage";
import SignInButton from "./SignInButton";
import { RootState } from "../store";

export default function App() {
  const email = useSelector((state: RootState) => state.user.email);
  const [showConfirmEmailModal, setShowConfirmEmail] = useState(false);

  useEffect(() => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      if (!email) {
        setShowConfirmEmail(true);
        return;
      }
      // disable login button
      // get email from local store, or prompt user to confirm email
    }
  }, [email]);

  return (
    <BrowserRouter>
      <Navbar bg="dark" className="mb-3" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Habit Streak</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">About</Nav.Link>
          </Nav>
          <SignInButton />
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
