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

    return library.sort((a, b) => (a.order as number) - (b.order as number));
  }

  addGame(game: ILibraryItem): ILibraryItem[] {
    const library = this.store.get('library');

    const newLibrary = [...library, { ...game, order: library.length + 1 }];

    this.store.set('library', newLibrary);

    return newLibrary;
  }

  removeGame(id: string | number): ILibraryItem[] {
    const library = this.store.get('library');
    const newLibrary = library
      .filter((game) => game.id !== id)
      .sort((a, b) => (a.order as number) - (b.order as number))
      .map((game, index) => ({ ...game, order: index + 1 }));

    this.store.set('library', newLibrary);

    return newLibrary;
  }

  save(data: ILibraryItem[]) {
    this.store.set('library', data);
  }
}

export default new LibraryRepository(store);
