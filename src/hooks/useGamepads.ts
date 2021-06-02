import { useState, useEffect, useCallback } from 'react';

type ConnectedGamepadsState = {
  [index: string]: Gamepad;
};

function useGamepads() {
  const [connectedGamepads, setConnectedGamepads] = useState<
    ConnectedGamepadsState
  >({});

  const firstController = useCallback(() => {
    const indexes = Object.keys(connectedGamepads).map((k) => +k);
    if (indexes.length === 0) {
      return null;
    }
    const minIndex = Math.min(...indexes);
    return connectedGamepads[minIndex];
  }, [connectedGamepads]);

  useEffect(() => {
    const gamepads = navigator.getGamepads();

    if (gamepads) {
      const onlineGamepads = Object.keys(gamepads)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((k: any) => gamepads[k])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((gamepad: any) => gamepad && gamepad.connected)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((acc, gamepad: any) => {
          return { ...acc, [gamepad.index]: gamepad };
        }, {});
      setConnectedGamepads(onlineGamepads);
    }
  }, []);

  // Listen if a controller connect or disconnect to the application
  const handleGamepadConnexion = useCallback(
    ({ gamepad }: GamepadEvent, connecting: boolean) => {
      if (connecting) {
        setConnectedGamepads((previousControllers) => ({
          ...previousControllers,
          [gamepad.index]: gamepad,
        }));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setConnectedGamepads((previousControllers: any) => {
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

  return {
    gamepads: connectedGamepads,
    firstGamepad: firstController(),
  };
}

export default useGamepads;
