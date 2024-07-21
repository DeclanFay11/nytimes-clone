import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-around text-white">
        <li>
          <Link to="/wordle" className="hover:underline">Wordle</Link>
        </li>
        <li>
          <Link to="/connections" className="hover:underline">Connections</Link>
        </li>
        <li>
          <Link to="/crossword" className="hover:underline">Mini Crossword</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
