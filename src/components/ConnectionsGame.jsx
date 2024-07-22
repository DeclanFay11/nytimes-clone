import React, { useState, useEffect } from 'react';
import { INITIAL_ITEMS } from './Answers';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const ConnectionsGame = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState('');
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [correctItems, setCorrectItems] = useState(new Set());

  useEffect(() => {
    // Shuffle items when the component mounts
    setItems(shuffleArray(INITIAL_ITEMS));
  }, []);

  useEffect(() => {
    if (incorrectGuesses >= 4) {
      setMessage('Game over! Too many incorrect guesses.');
    }
  }, [incorrectGuesses]);

  const handleItemClick = (item) => {
    if (correctItems.has(item)) return;
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selected => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = () => {
    if (selectedItems.length !== 3) {
      setMessage('Please select exactly 3 items.');
      return;
    }

    const categories = selectedItems.map(item => item.category);
    if (categories.every(category => category === categories[0])) {
      setMessage(`Correct! All items are related to ${categories[0]}.`);
      setCorrectItems(new Set([...correctItems, ...selectedItems]));
    } else {
      setMessage('Incorrect! Try again.');
      setIncorrectGuesses(prev => prev + 1);
    }

    setSelectedItems([]);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Connections Game</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`p-4 border rounded cursor-pointer
              ${correctItems.has(item) ? 'bg-green-500 text-white' : selectedItems.includes(item) ? 'bg-gray-300' : 'bg-white'}
              ${selectedItems.includes(item) || correctItems.has(item) ? 'border-blue-500' : 'border-gray-300'}
            `}
          >
            {item.name}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Submit
      </button>
      {message && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
          <p>{message}</p>
        </div>
      )}
      <p className="text-center">Incorrect guesses: {incorrectGuesses} / 4</p>
    </div>
  );
};

export default ConnectionsGame;
