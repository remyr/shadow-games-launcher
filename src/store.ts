import Store from 'electron-store';

export interface ILibraryItem {
  coverUrl: string;
  name: string;
  type: string;
  directory?: string;
  file?: string;
  url?: string;
}

export interface IStore {
  library: ILibraryItem[];
}

const store = new Store<IStore>({
  defaults: {
    library: [],
  },
});

export default store;
