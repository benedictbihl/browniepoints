import React, {Suspense} from 'react';
import './App.css';
import AddPointsContainer from 'shared/src/components/addPoints/AddPointsContainer';
import ScoreTableContainer from 'shared/src/components/scoreTable/ScoreTableContainer';
import AddPointsSkeleton from 'shared/src/components/addPoints/AddPointsSkeleton';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Suspense fallback={<AddPointsSkeleton />}>
          <AddPointsContainer />
          <ScoreTableContainer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
