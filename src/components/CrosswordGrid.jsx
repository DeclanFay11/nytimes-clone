import React from 'react';

const CrosswordGrid = ({ grid, activeCell, onChange, onKeyDown, checkCorrect }) => {
  return (
    <div className="grid grid-cols-5 gap-1">
      {grid.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          cell === '#' ? (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-12 h-12 border bg-black"
            />
          ) : (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              value={cell !== ' ' ? cell : ''}
              onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
              onKeyDown={(e) => onKeyDown(rowIndex, colIndex, e)}
              className={`w-12 h-12 border text-center text-2xl uppercase
                ${rowIndex === activeCell[0] && colIndex === activeCell[1] ? 'border-blue-500' : 'border-gray-300'}
                ${checkCorrect(rowIndex, colIndex) ? 'bg-green-300' : 'bg-white'}
              `}
            />
          )
        ))
      ))}
    </div>
  );
};

export default CrosswordGrid;
