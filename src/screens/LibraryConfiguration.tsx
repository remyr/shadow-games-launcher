import React, { useEffect, useState } from 'react';

import AddGameForm from '../components/AddGamePanel/Form';
import GamesList from '../components/GamesListConfig/List';
import LibraryRepository from '../store/libraryRepository';
import { ILibraryItem } from '../store/store';

const LibraryConfiguration = () => {
  const [data, setData] = useState<ILibraryItem[]>([]);

  useEffect(() => {
    const library = LibraryRepository.getAllGames();
    setData(library);
  }, []);

  const handleSubmit = (game: ILibraryItem) => {
    const newLibrary = LibraryRepository.addGame(game);
    setData(newLibrary);
  };

  const removeGame = (id: string | number) => {
    const newLibrary = LibraryRepository.removeGame(id);

    setData(newLibrary);
  };

  return (
    <div className="flex py-8">
      <AddGameForm submit={handleSubmit} />
      <GamesList remove={removeGame} data={data} />
    </div>
  );
};

export default LibraryConfiguration;
