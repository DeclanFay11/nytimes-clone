import React, { useState, useEffect } from 'react';

const ITEMS = [
  { id: 1, name: 'Apple', category: 'Fruit' },
  { id: 2, name: 'Banana', category: 'Fruit' },
  { id: 3, name: 'Carrot', category: 'Vegetable' },
  { id: 4, name: 'Broccoli', category: 'Vegetable' },
  { id: 5, name: 'Lion', category: 'Animal' },
  { id: 6, name: 'Tiger', category: 'Animal' },
  { id: 7, name: 'Banana', category: 'Fruit' },
  { id: 8, name: 'Broccoli', category: 'Vegetable' },
  { id: 9, name: 'Lion', category: 'Animal' },
];

const ConnectionsGame = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [message, setMessage] = useState('');
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [correctItems, setCorrectItems] = useState([]);
  
    useEffect(() => {
      if (incorrectGuesses >= 4) {
        setMessage('Game over! Too many incorrect guesses.');
      }
    }, [incorrectGuesses]);
  
    const handleItemClick = (item) => {
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
        setMessage('Correct! All items are related.');
        setCorrectItems([...correctItems, ...selectedItems]);
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
          {ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`p-4 border rounded cursor-pointer
                ${correctItems.includes(item) ? 'bg-green-300' : ''}
                ${selectedItems.includes(item) && !correctItems.includes(item) ? 'bg-blue-300' : 'bg-white'}
                ${selectedItems.includes(item) ? 'border-blue-500' : 'border-gray-300'}
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