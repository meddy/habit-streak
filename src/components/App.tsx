import { AppBar, Button, Container, Typography } from "@material-ui/core";
import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";

import { RootState } from "../store";

import AccountButton from "./AccountButton";
import AppAlert from "./AppAlert";
import ConfirmEmailModal from "./ConfirmEmailModal";
import DetailsPage from "./DetailsPage";
import HomePage from "./HomePage";
import SignInButton from "./SignInButton";

export default function App() {
  const history = useHistory();
  const { email, authenticated } = useSelector(
    (state: RootState) => state.user,
    shallowEqual
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmEmailModal, setShowConfirmEmail] = useState(false);

  useEffect(() => {
    let mounted = true;
    const currentUrl = window.location.href;

    async function handleSignIn() {
      // Are we trying to sign in?
      if (!firebase.auth().isSignInWithEmailLink(currentUrl)) {
        return;
      }

      // Is the user using a different device, or did they clear their browser data?
      if (!email) {
        if (mounted) {
          setShowConfirmEmail(true);
        }
        return;
      }

      try {
        await firebase.auth().signInWithEmailLink(email, currentUrl);
        // Clear auth query parameters.
        history.replace("/");
      } catch (error) {
        console.error(error.message);
        if (mounted) {
          setErrorMessage(
            "Email link is no longer valid. Please click Sign In to send a new one."
          );
        }
      }
    }

    handleSignIn();

    return () => {
      mounted = false;
    };
  }, [email, history]);

  const handleDismissError = () => {
    setErrorMessage("");
  };

  return (
    <>
      <AppBar position="static">
        <Typography variant="h6">Habit Streak</Typography>
        <Typography variant="h6">About</Typography>
        {authenticated && <AccountButton />}
        {!authenticated && <SignInButton />}
      </AppBar>
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
