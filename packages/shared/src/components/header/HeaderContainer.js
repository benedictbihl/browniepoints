import React from "react";
import Header from "shared/src/components/header/Header";
import { useUser, AuthCheck } from "reactfire";
import "firebase/auth";
import firebase from "firebase";

const HeaderContainer = () => {
  const user = useUser();
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("Signed out");
      })
      .catch(function(error) {
        console.log("Signout Error ", error);
      });
  };
  return (
    <AuthCheck fallback={<Header />}>
      <Header
        userName={user ? user.displayName : ""}
        showSignedInButtonSet
        signOut={signOut}
      />
    </AuthCheck>
  );
};

export default HeaderContainer;
