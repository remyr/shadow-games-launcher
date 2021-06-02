import React from 'react';

type DisplayConnectedGamepadProps = {
  gamepad: Gamepad | null;
};

const DisplayConnectedGamepad = ({ gamepad }: DisplayConnectedGamepadProps) => {
  return (
    <div
      className={`border p-2 text-sm flex items-center ${
        gamepad
          ? 'border-green-500 text-green-500'
          : 'border-gray-400 text-gray-400'
      }`}
    >
      <div
        className={`rounded-full w-3 h-3 mr-2 ${
          gamepad ? 'bg-green-500' : 'bg-gray-400'
        }`}
      />
      {gamepad ? gamepad.id.split('(')[0] : 'No controller connected'}
    </div>
  );
};

export default DisplayConnectedGamepad;
