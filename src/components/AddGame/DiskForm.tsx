import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import path from 'path';

import { SUPPORT_GAME_TYPE } from '../../constants';
import store, { ILibraryItem } from '../../store';

interface FormData {
  name: string;
  coverUrl: string;
}

export const DiskForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormData>();
  const [selectedFile, setSelectedFile] = useState<any>();

  const history = useHistory();

  const onSubmit = handleSubmit((data) => {
    const file = selectedFile.path;
    const directory = path.dirname(file);

    const payload: ILibraryItem = {
      ...data,
      file,
      directory,
      type: SUPPORT_GAME_TYPE.DISK,
    };
    const library = store.get('library');
    store.set('library', [...library, payload]);
    history.push('/');
  });

  return (
    <form
      className="flex items-center flex-col h-full pb-16 justify-center w-full"
      onSubmit={onSubmit}
    >
      <input
        className="w-1/3 bg-gray-800 border border-gray-200 rounded-md p-2 text-white focus:outline-none my-2"
        type="text"
        placeholder="Name"
        {...register('name')}
      />
      <input
        className="w-1/3 bg-gray-800 border border-gray-200 rounded-md p-2 text-white focus:outline-none my-2"
        type="text"
        placeholder="Cover url"
        {...register('coverUrl')}
      />
      <label className="w-1/3 bg-green-500 text-white rounded-md p-2 cursor-pointer text-center my-2 flex items-center justify-center">
        {selectedFile ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        )}
        <span className="ml-2">
          {selectedFile
            ? `${path.basename(selectedFile.path)}`
            : 'Select a game'}
        </span>
        <input
          className="hidden"
          type="file"
          onChange={(e: any) => setSelectedFile(e.target.files[0])}
        />
      </label>
      <button
        type="submit"
        className="bg-gray-200 p-2 rounded-md flex items-center mt-8 focus:outline-none w-1/3 justify-center"
      >
        Add to library
      </button>
    </form>
  );
};
