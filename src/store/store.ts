import Store from 'electron-store';

export interface ILibraryItem {
  id: string | number;
  coverUrl: string;
  name: string;
  type: string;
  directory?: string;
  file?: string;
  url?: string;
  order?: number;
}

export interface IAppConfiguration {
  isFullScreen: boolean;
  onStartup: boolean;
}

export interface IStore {
  library: ILibraryItem[];
  appConfig: IAppConfiguration;
}

const store = new Store<IStore>({
  defaults: {
    library: [],
    appConfig: {
      isFullScreen: false,
      onStartup: false,
    },
  },
});

export default store;
