import React from "react";
import { useFirestoreCollection, useFirebaseApp, useUser } from "reactfire";
import "firebase/firestore";
import "firebase/auth";

import ListElement from "shared/src/components/listElement/ListElement";
const ListElementContainer = props => {
  const firebaseApp = useFirebaseApp();
  const user = useUser();
  const userid = user ? user.uid : "0";
  let personsArray = [];
  const query = firebaseApp
    .firestore()
    .collection("users")
    .doc(userid)
    .collection("scoreboard");
  const persons = useFirestoreCollection(query, { idField: "id" });
  persons.forEach(doc => personsArray.push(doc));

  const onSubmit = async (name, addedPoints) => {
    const ref = firebaseApp
      .firestore()
      .collection("users")
      .doc(userid)
      .collection("scoreboard")
      .doc(name);

    await ref
      .set({ score: addedPoints }, { merge: true })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  const onDelete = async name => {
    const ref = firebaseApp
      .firestore()
      .collection("users")
      .doc(userid)
      .collection("scoreboard")
      .doc(name);

    await ref
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error deleting document: ", error);
      });
  };

  return (
    <ListElement
      isInGuestView={props.isInGuestView}
      index={props.index}
      name={props.name}
      score={props.score}
      variant={props.variant}
      onSubmit={onSubmit}
      onDelete={onDelete}
      tableEntries={personsArray}
    />
  );
};

export default ListElementContainer;
