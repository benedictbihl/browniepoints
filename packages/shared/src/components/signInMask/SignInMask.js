import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useFirebaseApp } from "reactfire";
import { Typography, makeStyles } from "@material-ui/core";

import firebase from "firebase";

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
  const firebaseApp = useFirebaseApp();
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: "/",
    callbacks: {
      signInSuccessWithAuthResult: async authResult => {
        const ref = firebaseApp
          .firestore()
          .collection("users")
          .doc(authResult.user.uid);

        await ref
          .set({ userName: authResult.user.displayName })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
      }
    }
  };
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
