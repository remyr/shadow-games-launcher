import React from 'react';

import Ban from '../../icons/Ban';

type ControllerDisplayInfoProps = {
  text?: string;
};

export const ControllerStatusOnline = ({
  text,
}: ControllerDisplayInfoProps) => {
  return (
    <div className="text-green-500 border border-green-500 p-2 rounded-md flex items-center">
      <div className="h-3 w-3 bg-green-400 rounded-full mr-2" />
      <span>{text}</span>
    </div>
  );
};

export const ControllerStatusOffline = ({
  text = 'No controller detected',
}: ControllerDisplayInfoProps) => {
  return (
    <div className="text-gray-500 border border-gray-500 p-2 rounded-md flex items-center">
      {/* <div className="h-3 w-3 bg-gray-500 rounded-full mr-2"></div> */}
      <Ban />
      <span className="ml-2">{text}</span>
    </div>
  );
};
