import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Typography, makeStyles } from "@material-ui/core";

import firebase from "firebase";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexFlow: "column nowrap",
    height: " 100%",
    justifyContent: "center"
  }
}));

const SignInMask = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Typography variant="h5">
        To add people to your scoreboard, sign in first
      </Typography>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default SignInMask;
