import React from 'react';
import WordleGame from './components/WordleGame';
import ConnectionsGame from './components/ConnectionsGame';
import MiniCrosswordGame from './components/MiniCrosswordGame';

function App() {
  return (
    <div className="App">
      {/* <WordleGame /> */}
      {/*  <ConnectionsGame /> */}
      <MiniCrosswordGame />
    </div>
  );
}

export default App;