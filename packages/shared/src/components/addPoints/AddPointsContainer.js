import React from 'react';
import {useFirestoreCollection, useFirebaseApp} from 'reactfire';
import 'firebase/firestore';

import AddPoints from 'shared/src/components/addPoints/AddPoints';
const AddPointsContainer = () => {
  const firebaseApp = useFirebaseApp();
  let query = firebaseApp.firestore().collection('persons');
  const persons = useFirestoreCollection(query, {idField: 'id'});
  let personsArray = [];
  persons.forEach(doc => personsArray.push(doc));

  const onSubmit = async (userId, name, addedPoints) => {
    const nameExists =
      personsArray.filter(entry => entry.data().name === name).length > 0;

    if (nameExists) {
      const ref = firebaseApp
        .firestore()
        .collection('persons')
        .doc(userId);

      await ref
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let newScore = doc.data().score + addedPoints;
            ref.update({score: newScore});
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error);
        });
    }
  };
  return <AddPoints onSubmit={onSubmit} tableEntries={personsArray} />;
};

export default AddPointsContainer;
