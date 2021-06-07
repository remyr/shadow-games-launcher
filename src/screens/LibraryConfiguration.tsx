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
    setData((previousData) => [...previousData, game]);
    LibraryRepository.addGame(game);
  };

  return (
    <div className="flex py-8">
      <AddGameForm submit={handleSubmit} />
      <GamesList data={data} />
    </div>
  );
};

export default LibraryConfiguration;
