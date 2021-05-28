import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import path from 'path';

import { SUPPORT_GAME_TYPE } from '../../constants';
import store, { ILibraryItem } from '../../store';

interface FormData {
  name: string;
  coverUrl: string;
  url: string;
}

export const EGSForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormData>();

  const history = useHistory();

  const onSubmit = handleSubmit((data) => {
    const payload: ILibraryItem = {
      ...data,
      type: SUPPORT_GAME_TYPE.EGS,
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
      <input
        className="w-1/3 bg-gray-800 border border-gray-200 rounded-md p-2 text-white focus:outline-none my-2"
        type="text"
        placeholder="Url"
        {...register('url')}
      />
      <button
        type="submit"
        className="bg-gray-200 p-2 rounded-md flex items-center mt-8 focus:outline-none w-1/3 justify-center"
      >
        Add to library
      </button>
    </form>
  );
};
