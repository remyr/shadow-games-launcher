import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-center w-full text-white font-orbitron capitalize border-b border-gray-200 bg-white text-xl h-16">
      <Link to="/" className="text-yellow-500">
        Shadow Games Launcher
      </Link>
    </header>
  );
};

export default Header;
