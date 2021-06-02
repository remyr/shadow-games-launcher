import React from 'react';
import { Link } from 'react-router-dom';

import useGamepads from '../../hooks/useGamepads';

import Settings from '../../icons/Settings';
import DisplayConnectedGamepad from './DisplayConnectedGamepad';

const Footer = () => {
  const { firstGamepad } = useGamepads();

  return (
    <div className="flex items-center justify-between w-full bg-black h-16 shadow-md text-white font-orbitron capitalize 4k:h-32 4k:text-3xl px-8 4k:px-16">
      <DisplayConnectedGamepad gamepad={firstGamepad} />
      <Link to="/configuration">
        <Settings className="w-7 h-7 text-gray-400 hover:text-white transition duration-300" />
      </Link>
    </div>
  );
};

export default Footer;
