import React, { useState, useEffect, useCallback } from 'react';

const WORDS = ['SWEET', 'ANGEL', 'QUEEN'];
const MAX_ATTEMPTS = 6;
const KEYBOARD_LETTERS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

const WordleGame = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [letterStates, setLetterStates] = useState({});

  useEffect(() => {
    setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);

  const submitGuess = useCallback(() => {
    const newGuesses = [...guesses];
    newGuesses[attemptNumber] = currentGuess;
    setGuesses(newGuesses);

    const newLetterStates = { ...letterStates };
    currentGuess.split('').forEach((letter, index) => {
      if (targetWord[index] === letter) {
        newLetterStates[letter] = 'correct';
      } else if (targetWord.includes(letter)) {
        newLetterStates[letter] = newLetterStates[letter] !== 'correct' ? 'present' : newLetterStates[letter];
      } else {
        newLetterStates[letter] = newLetterStates[letter] ? newLetterStates[letter] : 'absent';
      }
    });
    setLetterStates(newLetterStates);

    if (currentGuess === targetWord) {
      setGameOver(true);
      setMessage(`Congratulations! You guessed the word: ${targetWord}`);
    } else if (attemptNumber === MAX_ATTEMPTS - 1) {
      setGameOver(true);
      setMessage(`Game over! The word was ${targetWord}.`);
    } else {
      setAttemptNumber(prev => prev + 1);
    }

    setCurrentGuess('');
  }, [currentGuess, targetWord, attemptNumber, guesses, letterStates]);

  const handleKeyPress = useCallback((key) => {
    if (gameOver) return;

    if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        setMessage('Please enter a 5-letter word.');
        return;
      }
      submitGuess();
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  }, [gameOver, currentGuess, submitGuess]);

  const handleKeyDown = useCallback((event) => {
    if (gameOver) return;
    const key = event.key.toUpperCase();
    
    if (key === 'ENTER') {
      handleKeyPress('ENTER');
    } else if (key === 'BACKSPACE') {
      handleKeyPress('BACKSPACE');
    } else if (/^[A-Z]$/.test(key)) {
      handleKeyPress(key);
    }
  }, [gameOver, handleKeyPress]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const getLetterColor = (letter, index, guess) => {
    if (targetWord[index] === letter) return 'bg-green-500';
    if (targetWord.includes(letter)) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const renderGuess = (guess, attemptIndex) => {
    const letterArray = guess.padEnd(5, ' ').split('');
    return letterArray.map((letter, index) => (
      <div
        key={index}
        className={`w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold
          ${attemptIndex < attemptNumber || gameOver ? getLetterColor(letter, index, guess) : 'border-gray-300'}
          ${letter !== ' ' ? (attemptIndex < attemptNumber || gameOver ? 'text-white' : 'text-black') : ''}
        `}
      >
        {letter !== ' ' ? letter : ''}
      </div>
    ));
  };

  const getKeyColor = (letter) => {
    if (!letterStates[letter]) return 'bg-gray-200';
    switch (letterStates[letter]) {
      case 'correct': return 'bg-green-500 text-white';
      case 'present': return 'bg-yellow-500 text-white';
      case 'absent': return 'bg-gray-500 text-white';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Wordle Clone</h1>
      <div className="grid grid-rows-6 gap-2 mb-4">
        {guesses.map((guess, index) => (
          <div key={index} className="flex justify-center gap-2">
            {renderGuess(index === attemptNumber && !gameOver ? currentGuess : guess, index)}
          </div>
        ))}
      </div>
      <div className="mb-4">
        {KEYBOARD_LETTERS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center mb-2">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`px-2 py-4 mx-1 rounded font-bold ${getKeyColor(key)}
                  ${key === 'ENTER' || key === 'BACKSPACE' ? 'text-xs px-1' : 'text-sm'}
                `}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            ))}
          </div>
        ))}
      </div>
      {message && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
          <p className="font-bold">Game Status</p>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default WordleGame;
