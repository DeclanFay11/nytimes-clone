import React, { useState } from 'react';
import CrosswordGrid from './CrosswordGrid';
import Clues from './Clues';

const initialGrid = [
  [' ', ' ', ' ', ' ', ' '],
  [' ', '#', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', '#', ' '],
  [' ', ' ', ' ', ' ', ' ']
];

const answers = [
  ['A', 'P', 'P', 'L', 'E'],
  ['P', '#', 'B', 'O', 'Y'],
  ['P', ' ', ' ', ' ', ' '],
  ['L', ' ', ' ', '#', ' '],
  ['E', ' ', ' ', ' ', ' ']
];

const clues = {
  across: [
    { number: 1, clue: 'A fruit', answer: 'APPLE', row: 0, col: 0 },
    { number: 2, clue: 'A person', answer: 'BOY', row: 1, col: 2 }
  ],
  down: [
    // Add down clues here if needed
    { number: 1, clue: 'A fruit', answer: 'APPLE', row: 0, col: 0}
  ]
};

const MiniCrosswordGame = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [activeCell, setActiveCell] = useState([0, 0]);

  const handleChange = (row, col, value) => {
    if (grid[row][col] === '#') return;
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? value.toUpperCase() : cell))
    );
    setGrid(newGrid);
  };

  const handleKeyDown = (row, col, event) => {
    if (event.key === 'ArrowUp' && row > 0) setActiveCell([row - 1, col]);
    if (event.key === 'ArrowDown' && row < 4) setActiveCell([row + 1, col]);
    if (event.key === 'ArrowLeft' && col > 0) setActiveCell([row, col - 1]);
    if (event.key === 'ArrowRight' && col < 4) setActiveCell([row, col + 1]);
  };

  const isWordCorrect = (word, answer) => word.join('') === answer;

  const checkCorrectAcross = (row, col) => {
    const clue = clues.across.find(c => c.row === row && col >= c.col && col < c.col + c.answer.length);
    if (!clue) return false;
    const word = grid[row].slice(clue.col, clue.col + clue.answer.length);
    return isWordCorrect(word, clue.answer);
  };

  const checkCorrectDown = (row, col) => {
    const clue = clues.down.find(c => c.col === col && row >= c.row && row < c.row + c.answer.length);
    if (!clue) return false;
    const word = grid.slice(clue.row, clue.row + clue.answer.length).map(r => r[col]);
    return isWordCorrect(word, clue.answer);
  };

  const checkCorrect = (row, col) => checkCorrectAcross(row, col) || checkCorrectDown(row, col);

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Mini Crossword</h1>
      <CrosswordGrid
        grid={grid}
        activeCell={activeCell}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        checkCorrect={checkCorrect}
      />
      <Clues clues={clues} />
    </div>
  );
};

export default MiniCrosswordGame;
