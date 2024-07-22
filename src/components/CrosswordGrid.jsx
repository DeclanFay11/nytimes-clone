import React from 'react';

const CrosswordGrid = ({ grid, activeCell, onChange, onKeyDown, checkCorrect, clueNumbers }) => {
  return (
    <div className="grid grid-cols-6 gap-1">
      {grid.map((row, rowIndex) => (
        row.map((cell, colIndex) => {
          const clueNumber = clueNumbers.find(c => c.row === rowIndex && c.col === colIndex)?.number;
          return cell === '#' ? (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-12 h-12 border bg-black"
            />
          ) : (
            <div key={`${rowIndex}-${colIndex}`} className="relative">
              {clueNumber && (
                <div className="absolute top-0 left-0 text-xs p-1">
                  {clueNumber}
                </div>
              )}
              <input
                type="text"
                maxLength="1"
                value={cell !== ' ' ? cell : ''}
                onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
                onKeyDown={(e) => onKeyDown(rowIndex, colIndex, e)}
                className={`w-12 h-12 border text-center text-2xl uppercase
                  ${rowIndex === activeCell[0] && colIndex === activeCell[1] ? 'border-blue-500' : 'border-gray-300'}
                  ${cell !== ' ' && checkCorrect(rowIndex, colIndex) ? 'bg-green-300' : 'bg-white'}
                `}
              />
            </div>
          );
        })
      ))}
    </div>
  );
};

export default CrosswordGrid;
