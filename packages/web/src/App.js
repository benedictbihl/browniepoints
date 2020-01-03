import React, { Suspense } from "react";
import "./App.css";
import MainViewContainer from "shared/src/views/mainView/MainViewContainer";
import AddPointsSkeleton from "shared/src/components/addPerson/AddPointsSkeleton";
import "firebase/firestore";

function App() {
  return (
    <>
      <div className="App">
        <Suspense fallback={<AddPointsSkeleton />}>
          <MainViewContainer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
