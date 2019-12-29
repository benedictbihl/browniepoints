import React from "react";
import { useFirestoreCollection, useFirebaseApp } from "reactfire";
import "firebase/firestore";

import ListElement from "shared/src/components/listElement/ListElement";
const ListElementContainer = props => {
  const firebaseApp = useFirebaseApp();
  let query = firebaseApp.firestore().collection("persons");
  const persons = useFirestoreCollection(query, { idField: "id" });
  let personsArray = [];
  persons.forEach(doc => personsArray.push(doc));

  const onSubmit = async (userId, name, addedPoints) => {
    const ref = firebaseApp
      .firestore()
      .collection("persons")
      .doc(userId);

    await ref
      .get()
      .then(function(doc) {
        if (doc.exists) {
          ref.delete();
          firebaseApp
            .firestore()
            .collection("persons")
            .add({ name: name, score: addedPoints });
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };
  return (
    <ListElement
      index={props.index}
      name={props.name}
      score={props.score}
      variant={props.variant}
      onSubmit={onSubmit}
      tableEntries={personsArray}
    />
  );
};

export default ListElementContainer;
