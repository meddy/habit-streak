import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import firebase from "firebase/app";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import "firebase/auth";
import "fontsource-roboto";

import App from "./components/App";
import firebaseConfig from "./firebase.config.json";
import * as serviceWorker from "./serviceWorker";
import { receiveSignedIn, receiveSignedOut } from "./slices/userSlice";
import store, { persistor } from "./store";

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.displayName);
    console.log(user.email);
    store.dispatch(receiveSignedIn());
  } else {
    store.dispatch(receiveSignedOut());
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
