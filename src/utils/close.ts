import { ipcRenderer } from 'electron';
import { EVENTS } from '../constants';

export default () => {
  ipcRenderer.send(EVENTS.CLOSE_APP);
};
