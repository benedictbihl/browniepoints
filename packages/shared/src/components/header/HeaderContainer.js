import React from "react";
import Header from "shared/src/components/header/Header";
import { useUser, AuthCheck } from "reactfire";
import "firebase/auth";
import firebase from "firebase";

const HeaderContainer = props => {
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

  if (props.isInGuestView)
    return (
      <AuthCheck
        fallback={
          <Header
            userName={props.nameOfCurrentlyViewedBoard}
            returnToOwnBoardButton
          />
        }
      >
        <Header
          userName={user ? user.displayName : ""}
          signOutButton
          signOut={signOut}
          returnToOwnBoardButton
        />
      </AuthCheck>
    );
  return (
    <AuthCheck fallback={<Header />}>
      <Header
        userName={user ? user.displayName : ""}
        signOutButton
        signOut={signOut}
      />
    </AuthCheck>
  );
};

export default HeaderContainer;
