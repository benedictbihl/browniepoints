import React from "react";
import {
  useFirestoreCollection,
  useFirebaseApp,
  useUser,
  AuthCheck
} from "reactfire";
import "firebase/firestore";
import "firebase/auth";

import AddPerson from "shared/src/components/addPerson/AddPerson";
const AddPersonContaier = () => {
  const firebaseApp = useFirebaseApp();
  const user = useUser();

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
          let newScore = doc.data().score + addedPoints;
          ref.update({ score: newScore });
        } else {
          // doc.data() will be undefined in this case
          firebaseApp
            .firestore()
            .collection("persons")
            .add({ name: name, score: addedPoints });
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };
  return (
    <AuthCheck
      fallback={
        <AddPerson disabled onSubmit={onSubmit} tableEntries={personsArray} />
      }
    >
      <AddPerson onSubmit={onSubmit} tableEntries={personsArray} />
    </AuthCheck>
  );
};

export default AddPersonContaier;
