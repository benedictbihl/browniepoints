import React from "react";
import { useFirestoreCollection, useFirebaseApp, AuthCheck } from "reactfire";

import "firebase/firestore";
import "firebase/auth";

import ScoreTable from "shared/src/components/scoreTable/ScoreTable";

const ScoreTableContainer = () => {
  const firebaseApp = useFirebaseApp();
  const query = firebaseApp
    .firestore()
    .collection("persons")
    .orderBy("score", "desc");
  const persons = useFirestoreCollection(query, { idField: "id" });
  const personsArray = [];
  persons.forEach(doc => personsArray.push(doc.data()));

  return (
    <AuthCheck fallback={<ScoreTable scores={personsArray} withSigninMask />}>
      <ScoreTable scores={personsArray} />
    </AuthCheck>
  );
};

export default ScoreTableContainer;
