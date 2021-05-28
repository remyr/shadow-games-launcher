import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Left from '../../icons/Left';
import Exit from '../../icons/Exit';
import { SelectSourceButton } from './SelectSourceButton';
import { EGSForm } from './EGSForm';
import { DiskForm } from './DiskForm';

enum Source {
  Disk,
  EGS,
}

const AddGame = () => {
  const [source, setSource] = useState<Source | null>(null);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-800">
      <h1 className="text-center text-2xl text-white mt-8">
        Add game to library
      </h1>
      {source === null && (
        <div className="flex items-center flex-col h-full pb-16 justify-center">
          <SelectSourceButton
            onClick={() => setSource(Source.Disk)}
            text="From disk"
          />
          <SelectSourceButton
            onClick={() => setSource(Source.EGS)}
            text="From Epic Game Store"
          />
        </div>
      )}
      {source === Source.Disk && <DiskForm />}
      {source === Source.EGS && <EGSForm />}
      <div className="h-16 w-full bg-gray-900 fixed bottom-0 flex items-center justify-between px-8">
        <div className=""></div>
        <div className="flex items-center">
          <Link
            to="/"
            className="bg-gray-200 p-2 rounded-md flex items-center mx-2"
          >
            <Left />
            <span className="ml-1">Back</span>
          </Link>
          <button className="bg-gray-200 p-2 rounded-md flex items-center mx-2">
            <Exit />
            <span className="ml-1">Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGame;
