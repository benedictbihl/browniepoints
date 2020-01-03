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
      .set({ name: name, score: addedPoints }, { merge: true })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };
  return (
    <AuthCheck fallback={null}>
      <AddPerson onSubmit={onSubmit} tableEntries={personsArray} />
    </AuthCheck>
  );
};

export default AddPersonContaier;
