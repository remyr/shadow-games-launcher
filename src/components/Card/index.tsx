import React from 'react';
import { animated } from 'react-spring';
import { ILibraryItem } from '../../store';

import Play from '../../icons/Play';

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
    <animated.div style={style} className="relative h-48 mb-4">
      <div
        className={`absolute w-full z-10 flex items-center flex-col rounded-xl overflow-hidden bg-yellow-900${
          selected ? 'shadow-md' : ''
        }`}
      >
        <img
          className={`w-full aspect-h-1 h-48 `}
          src={data.coverUrl}
          alt="cover"
        />
      </div>
      {selected && (
        // <div className={`z-0 w-full flex items-center flex-col border border-gray-200 rounded-xl overflow-hidden bg-yellow-900 ${selected ? 'shadow-md' : ''} absolute bottom-10 filter blur-xl`}>
        <img
          className={`w-full absolute top-4 px-8 filter blur-lg opacity-80 aspect-h-1 h-48 ${
            selected ? '' : 'filter grayscale opacity-90'
          }`}
          src={data.coverUrl}
          alt="cover"
        />
        // </div>
      )}
      {selected && (
        <>
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-yellow-500 opacity-50 z-20 rounded-xl" />
          <div className="absolute top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center flex-col">
            <Play className="w-12 h-12 text-white" />
            <p className="font-orbitron text-white">
              Assassin`&apos;`s creed 3
            </p>
          </div>
        </>
      )}
    </animated.div>
    // <animated.div style={style} className="flex w-full justify-center">
    //   <div
    //     className={`h-64 4k:h-128 w-96 4k:w-192 overflow-hidden ${
    //       selected ? '' : 'filter grayscale'
    //     }`}
    //   >
    //     <div className="bg-gray-800">
    //       <img
    //         src={data.coverUrl}
    //         alt="cover"
    //         className={`w-full h-52 4k:h-104 ${selected ? '' : 'opacity-50'}`}
    //       />
    //     </div>
    //     <h2
    //       className={` text-center font-orbitron mt-2 4k:mt-4 4k:text-3xl ${
    //         selected ? 'text-white' : 'text-gray-600'
    //       }`}
    //     >
    //       {data.name}
    //     </h2>
    //   </div>
    // </animated.div>
  );
};

Card.defaultProps = {
  selected: false,
};

export default Card;
