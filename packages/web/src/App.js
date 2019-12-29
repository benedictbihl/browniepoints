import React, { Suspense } from "react";
import "./App.css";
import ScoreTableContainer from "shared/src/components/scoreTable/ScoreTableContainer";
import AddPointsSkeleton from "shared/src/components/addPerson/AddPointsSkeleton";
function App() {
  return (
    <>
      <div className="App">
        <Suspense fallback={<AddPointsSkeleton />}>
          <ScoreTableContainer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
