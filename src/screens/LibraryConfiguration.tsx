import React, { useEffect, useState } from 'react';

import AddGameForm from '../components/AddGamePanel/Form';
import GamesList from '../components/GamesListConfig/List';
import LibraryRepository from '../store/libraryRepository';
import { ILibraryItem } from '../store/store';

const LibraryConfiguration = () => {
  const [data, setData] = useState<ILibraryItem[]>([]);

  function loadGames() {
    const library = LibraryRepository.getAllGames();
    setData(library);
  }

  useEffect(() => {
    loadGames();
  }, []);

  const handleSubmit = (game: ILibraryItem) => {
    const newLibrary = LibraryRepository.addGame(game);
    setData(newLibrary);
  };

  const removeGame = (id: string | number) => {
    const newLibrary = LibraryRepository.removeGame(id);

    setData(newLibrary);
  };

  const changeOrder = (index: number, direction: number) => {
    if (index === 0 && direction === -1) {
      return;
    }
    if (index === data.length - 1 && direction === 1) {
      return;
    }
    const currentItem = data[index];
    const nextItem = data[index + direction];

    const dataCopy = [...data];
    dataCopy[index] = {
      ...currentItem,
      order: currentItem.order ? currentItem.order + direction : 0,
    };
    dataCopy[index + direction] = {
      ...nextItem,
      order: nextItem.order ? nextItem.order - direction : 0,
    };

    LibraryRepository.save(dataCopy);
    loadGames();
  };

  return (
    <div className="flex py-8">
      <AddGameForm submit={handleSubmit} />
      <GamesList changeOrder={changeOrder} remove={removeGame} data={data} />
    </div>
  );
};

export default LibraryConfiguration;
