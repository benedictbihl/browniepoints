import React from "react";
import { useFirestoreCollection, useFirebaseApp } from "reactfire";
import "firebase/firestore";

import ScoreTable from "shared/src/components/scoreTable/ScoreTable";

const ScoreTableContainer = () => {
  const firebaseApp = useFirebaseApp();
  let query = firebaseApp.firestore().collection("persons");
  query = query.orderBy("score", "desc");
  const persons = useFirestoreCollection(query, { idField: "id" });
  let personsArray = [];
  persons.forEach(doc => personsArray.push(doc.data()));

  return <ScoreTable scores={personsArray} />;
};

export default ScoreTableContainer;
