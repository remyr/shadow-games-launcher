import React from 'react';
import { Link } from 'react-router-dom';

import useGamepads from '../../hooks/useGamepads';

import Settings from '../../icons/Settings';
import DisplayConnectedGamepad from './DisplayConnectedGamepad';

const Footer = () => {
  const { firstGamepad } = useGamepads();

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-between px-8 text-gray-500 h-16 ">
      <DisplayConnectedGamepad gamepad={firstGamepad} />
      <Link to="/configuration">
        <Settings className="w-7 h-7 text-gray-500 hover:text-white transition duration-300" />
      </Link>
    </footer>
  );
};

export default Footer;
