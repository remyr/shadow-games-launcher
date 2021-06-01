import React from 'react';
import { animated } from 'react-spring';
import { ILibraryItem } from '../../store';

type CardProps = {
  selected?: boolean;
  data: ILibraryItem;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any;
};

const Card: React.FunctionComponent<CardProps> = ({
  selected,
  data,
  style,
}) => {
  return (
    <animated.div style={style} className="flex w-full justify-center">
      <div
        className={`h-64 4k:h-128 w-96 4k:w-192 overflow-hidden ${
          selected ? '' : 'filter grayscale'
        }`}
      >
        <div className="bg-gray-800">
          <img
            src={data.coverUrl}
            alt="cover"
            className={`w-full h-52 4k:h-104 ${selected ? '' : 'opacity-50'}`}
          />
        </div>
        <h2
          className={` text-center font-orbitron mt-2 4k:mt-4 4k:text-3xl ${
            selected ? 'text-white' : 'text-gray-600'
          }`}
        >
          {data.name}
        </h2>
      </div>
    </animated.div>
  );
};

Card.defaultProps = {
  selected: false,
};

export default Card;
