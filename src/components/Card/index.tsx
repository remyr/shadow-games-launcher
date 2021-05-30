import React from 'react';
import { ILibraryItem } from '../../store';

type CardProps = {
  selected?: boolean;
  data: ILibraryItem;
};

const Card: React.FunctionComponent<CardProps> = ({ selected, data }) => {
  return (
    <div
      className={`h-64 w-96 overflow-hidden ${
        selected ? '' : 'filter grayscale'
      }`}
    >
      <div className="bg-gray-800">
        <img
          src={data.coverUrl}
          alt="cover"
          className={`w-full h-52 ${selected ? '' : 'opacity-50'}`}
        />
      </div>
      <h2
        className={` text-center font-orbitron mt-2 ${
          selected ? 'text-white' : 'text-gray-600'
        }`}
      >
        {data.name}
      </h2>
    </div>
  );
};

Card.defaultProps = {
  selected: false,
};

export default Card;
