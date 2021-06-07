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

  addGame(game: ILibraryItem) {
    const library = this.store.get('library');

    this.store.set('library', [
      ...library,
      { ...game, order: library.length + 1 },
    ]);
  }
}

export default new LibraryRepository(store);
