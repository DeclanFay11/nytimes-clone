import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WordleGame from './components/WordleGame';
import ConnectionsGame from './components/ConnectionsGame';
import MiniCrosswordGame from './components/MiniCrosswordGame';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/wordle" element={<WordleGame />} />
          <Route path="/connections" element={<ConnectionsGame />} />
          <Route path="/crossword" element={<MiniCrosswordGame />} />
          <Route path="/" element={<Navigate to="/wordle" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;