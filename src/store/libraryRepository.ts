import Store from 'electron-store';

import store, { ILibraryItem, IStore } from './store';

class LibraryRepository {
  private store: Store<IStore>;

  constructor(st: Store<IStore>) {
    this.store = st;
  }

  clear() {
    this.store.set('library', []);
  }

  getAllGames(): ILibraryItem[] {
    const library = this.store.get('library');

    return library;
  }

  addGame(game: ILibraryItem): ILibraryItem[] {
    const library = this.store.get('library');

    const newLibrary = [...library, { ...game, order: library.length + 1 }];

    this.store.set('library', newLibrary);

    return newLibrary;
  }

  removeGame(id: string | number): ILibraryItem[] {
    const library = this.store.get('library');
    const newLibrary = library.filter((game) => game.id !== id);

    this.store.set('library', newLibrary);

    return newLibrary;
  }
}

export default new LibraryRepository(store);
