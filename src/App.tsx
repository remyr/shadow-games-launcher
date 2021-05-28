import React, { useEffect, useState, useCallback } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import './App.global.css';

import store, { ILibraryItem } from './store';

import Settings from './icons/Settings';
import Exit from './icons/Exit';
import AddGame from './components/AddGame';
import { Previous, Next, First, Last } from './components/Carousel';
import {
  ControllerStatusOnline,
  ControllerStatusOffline,
} from './components/ControllerStatus';
import { EVENTS, SUPPORT_GAME_TYPE } from './constants';

const Home = () => {
  const [library, setLibrary] = useState<ILibraryItem[]>([]);
  const [gameSelected, setGameSelected] = useState<number>(0);
  const [controllers, setControllers] = useState({});

  // Return index of the first controller. Sometimes if you disconnect the first one, and 2 controllers were connected
  // the first index is 0. To handle buttons pressed on controller, you should specify which index you want to listen.
  const firstController = () => {
    const indexes = Object.keys(controllers).map((k) => +k);
    if (indexes.length === 0) {
      return null;
    }
    return Math.min(...indexes);
  };

  // Init data (Game library & Gamepads connected)
  useEffect(() => {
    // Get game saved
    const libraryData = store.get('library');
    setLibrary(libraryData);
    if (libraryData.length > 0) {
      setGameSelected(0);
    }

    const gamepads = navigator.getGamepads();

    // Check if a controller is connected
    if (gamepads) {
      const connectedGamepads = Object.keys(gamepads)
        .map((k: any) => gamepads[k])
        .filter((gamepad: any) => gamepad && gamepad.connected)
        .reduce((acc, gamepad: any) => {
          return { ...acc, [gamepad.index]: gamepad };
        }, {});
      setControllers(connectedGamepads);
    }
  }, []);

  const nextGame = useCallback(() => {
    if (gameSelected + 1 < library.length) {
      setGameSelected((previousState) => previousState + 1);
    }
  }, [gameSelected, library]);

  const previousGame = useCallback(() => {
    if (gameSelected - 1 >= 0) {
      setGameSelected((previousState) => previousState - 1);
    }
  }, [gameSelected]);

  const selectGame = useCallback(() => {
    const game = library[gameSelected];
    console.log(game);

    if (game.type === SUPPORT_GAME_TYPE.DISK) {
      ipcRenderer.send(EVENTS.LAUNCH_GAME, game);
    }

    if (game.type === SUPPORT_GAME_TYPE.EGS) {
      console.log('open', game.url);
      open(game.url);
    }
  }, [gameSelected, library]);

  // Handle gamepad controlls
  useEffect(() => {
    const interval = setInterval(() => {
      const index: any = firstController();
      const gamepad = navigator.getGamepads()[index];

      // https://xtrp.io/blog/2020/12/15/how-to-use-the-html5-gamepad-api/
      // Reference for correspondance between ID and button on controller

      if (gamepad?.buttons[14].pressed) {
        previousGame();
      }

      if (gamepad?.buttons[15].pressed) {
        nextGame();
      }

      if (gamepad?.buttons[0].pressed) {
        selectGame();
      }
    }, 1000 / 10);

    return () => {
      clearInterval(interval);
    };
  }, [controllers, gameSelected]);

  // Callback for event 'Keydown' to move inside games with arrow keys
  const handleDown = useCallback(
    (event: KeyboardEvent) => {
      const { key: pressedKey } = event;

      if ('ArrowLeft' === pressedKey) {
        previousGame();
      }
      if ('ArrowRight' === pressedKey) {
        nextGame();
      }
      if ('Enter' === pressedKey) {
        selectGame();
      }
    },
    [gameSelected, library]
  );

  // Register event for keydown
  useEffect(() => {
    window.addEventListener('keydown', handleDown);

    return () => {
      window.removeEventListener('keydown', handleDown);
    };
  }, [handleDown]);

  // Listen if a controller connect or disconnect to the application
  const handleGamepadConnexion = useCallback(
    ({ gamepad }: GamepadEvent, connecting: boolean) => {
      if (connecting) {
        setControllers((previousControllers) => ({
          ...previousControllers,
          [gamepad.index]: gamepad,
        }));
      } else {
        setControllers((previousControllers: any) => {
          delete previousControllers[gamepad.index.toString()];
          return { ...previousControllers };
        });
      }
    },
    []
  );

  // Register event listeners
  useEffect(() => {
    window.addEventListener(
      'gamepadconnected',
      (e) => handleGamepadConnexion(e as GamepadEvent, true),
      false
    );
    window.addEventListener(
      'gamepaddisconnected',
      (e) => handleGamepadConnexion(e as GamepadEvent, false),
      false
    );

    return () => {
      window.removeEventListener('gamepadconnected', (e) =>
        handleGamepadConnexion(e as GamepadEvent, true)
      );
      window.removeEventListener('gamepaddisconnected', (e) =>
        handleGamepadConnexion(e as GamepadEvent, false)
      );
    };
  }, [handleGamepadConnexion]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-800">
      <h1 className="text-center text-2xl text-white mt-8">Game Launcher</h1>
      <div className="flex items-center justify-center relative mt-32">
        {library.length > 0 && (
          <>
            {library[gameSelected - 2] && (
              <First url={library[gameSelected - 2].coverUrl} />
            )}
            {library[gameSelected - 1] && (
              <Previous url={library[gameSelected - 1].coverUrl} />
            )}
            <img
              className="h-72 w-52 p-1 bg-gray-900 rounded-md shadow mx-4"
              src={library[gameSelected].coverUrl}
              alt="ck3-cover"
            />
            {library[gameSelected + 1] && (
              <Next url={library[gameSelected + 1].coverUrl} />
            )}
            {library[gameSelected + 2] && (
              <Last url={library[gameSelected + 2].coverUrl} />
            )}
          </>
        )}
      </div>

      <div className="h-16 w-full bg-gray-900 fixed bottom-0 flex items-center justify-between px-8">
        {firstController() !== null ? (
          <ControllerStatusOnline
            text={controllers[firstController()].id?.split('(')[0]}
          />
        ) : (
          <ControllerStatusOffline />
        )}
        <div className="flex items-center">
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={() => store.clear()}
              className="bg-gray-200 p-2 rounded-md flex items-center mx-2"
            >
              <span className="ml-1">Reset store</span>
            </button>
          )}
          <Link
            to="add-game"
            className="bg-gray-200 p-2 rounded-md flex items-center mx-2"
          >
            <Settings />
            <span className="ml-1">Configure</span>
          </Link>
          <button className="bg-gray-200 p-2 rounded-md flex items-center mx-2">
            <Exit />
            <span className="ml-1">Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add-game" component={AddGame} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}
