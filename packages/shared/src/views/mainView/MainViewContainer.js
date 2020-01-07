import React, { useState, useEffect } from "react";
import AdminViewContainer from "shared/src/views/adminView/AdminViewContainer";
import GuestView from "shared/src/views/guestView/GuestView";
import { useFirestoreCollection, useFirebaseApp } from "reactfire";

import "firebase/firestore";
import "firebase/auth";
const MainViewContainer = () => {
  useEffect(() => {
    getUserName();
  }, []);

  const [userName, setUserName] = useState("");
  const firebaseApp = useFirebaseApp();
  let personsArray = [];
  const uid = window.location.pathname.substr(1)
    ? window.location.pathname.substr(1)
    : "null";
  const scoreboardQuery = firebaseApp
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("scoreboard")
    .orderBy("score", "desc");
  const userEntries = useFirestoreCollection(scoreboardQuery);
  if (userEntries)
    userEntries.docs.forEach(doc => personsArray.push(doc.data()));

  const getUserName = async () => {
    const userNameRef = firebaseApp
      .firestore()
      .collection("users")
      .doc(uid);

    await userNameRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          setUserName(doc.data().userName);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  if (!userEntries.empty) {
    //userId does exist and has entries
    return (
      <GuestView
        nameOfCurrentlyViewedBoard={userName}
        scores={personsArray}
      ></GuestView>
    );
  }

  return <AdminViewContainer />;
};

export default MainViewContainer;
