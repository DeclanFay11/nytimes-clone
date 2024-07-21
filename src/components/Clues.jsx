import React from 'react';

const Clues = ({ clues }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Across</h2>
      <ul>
        {clues.across.map(clue => (
          <li key={clue.number}>
            <strong>{clue.number}.</strong> {clue.clue}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Down</h2>
      <ul>
        {clues.down.map(clue => (
          <li key={clue.number}>
            <strong>{clue.number}.</strong> {clue.clue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clues;
