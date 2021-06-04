import React from 'react';

import Warning from '../../icons/Warning';
import Wifi from '../../icons/Wifi';

type DisplayConnectedGamepadProps = {
  gamepad: Gamepad | null;
};

const DisplayConnectedGamepad = ({ gamepad }: DisplayConnectedGamepadProps) => {
  if (!gamepad) {
    return (
      <div className="border-2 border-gray-500 p-2 rounded-lg flex items-center">
        <Warning className="w-6 h-6 mr-1" />
        No controller connected
      </div>
    );
  }
  return (
    <div className="border-2 border-green-500 p-2 rounded-lg flex items-center text-green-500">
      <Wifi className="w-6 h-6 mr-1" />
      {gamepad.id.split('(')[0]}
    </div>
  );
};

export default DisplayConnectedGamepad;
