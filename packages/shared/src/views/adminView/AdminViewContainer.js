import React from "react";
import {
  useFirestoreCollection,
  useFirebaseApp,
  AuthCheck,
  useUser
} from "reactfire";

import "firebase/firestore";
import "firebase/auth";

import AdminView from "shared/src/views/adminView/AdminView";

const AdminViewContainer = () => {
  const firebaseApp = useFirebaseApp();
  let personsArray = [];
  const user = useUser();
  const userid = user ? user.uid : "0";
  console.log(userid);
  const query = firebaseApp
    .firestore()
    .collection("users")
    .doc(userid)
    .collection("scoreboard")
    .orderBy("score", "desc");
  const persons = useFirestoreCollection(query);
  if (persons) persons.forEach(doc => personsArray.push(doc.data()));
  console.log(persons);

  return (
    <AuthCheck fallback={<AdminView scores={personsArray} withSigninMask />}>
      <AdminView scores={personsArray} />
    </AuthCheck>
  );
};

export default AdminViewContainer;
