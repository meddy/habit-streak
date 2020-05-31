import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";

import { RootState } from "../store";

import AppAlert from "./AppAlert";
import ConfirmEmailModal from "./ConfirmEmailModal";
import DetailsPage from "./DetailsPage";
import HomePage from "./HomePage";
import SignInButton from "./SignInButton";

export default function App() {
  const history = useHistory();
  const email = useSelector((state: RootState) => state.user.email);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmEmailModal, setShowConfirmEmail] = useState(false);

  useEffect(() => {
    const handleSignIn = async () => {
      if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        if (!email) {
          setShowConfirmEmail(true);
          return;
        }

        try {
          await firebase
            .auth()
            .signInWithEmailLink(email, window.location.href);

          history.replace("/");
          return;
        } catch (error) {
          console.error(error.message);
          setErrorMessage(
            "Email link is no longer valid. Please click Sign In to send a new one."
          );
        }
      }
    };

    handleSignIn();
  }, [email, history]);

  const handleDismissError = () => {
    setErrorMessage("");
  };

  return (
    <>
      <Navbar bg="dark" className="mb-3" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Habit Streak</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">About</Nav.Link>
          </Nav>
          <SignInButton />
        </Container>
      </Navbar>
      <AppAlert message={errorMessage} onClose={handleDismissError} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/details/:id">
          <DetailsPage />
        </Route>
      </Switch>
      <ConfirmEmailModal show={showConfirmEmailModal} />
    </>
  );
}
