import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { RootState } from "../store";

import ConfirmEmailModal from "./ConfirmEmailModal";
import DetailsPage from "./DetailsPage";
import HomePage from "./HomePage";
import SignInButton from "./SignInButton";

export default function App() {
  const email = useSelector((state: RootState) => state.user.email);
  const [showConfirmEmailModal, setShowConfirmEmail] = useState(false);

  useEffect(() => {
    console.log("test");
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      console.log("test2");
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
      <ConfirmEmailModal show={showConfirmEmailModal} />
    </BrowserRouter>
  );
}
