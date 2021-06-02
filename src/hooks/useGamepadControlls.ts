import { useEffect, useState } from 'react';
import useGamepads from './useGamepads';

export enum GamepadCode {
  UP = 12,
  DOWN = 13,
  LEFT = 14,
  RIGHT = 15,
}

function useGamepadControlls(code: GamepadCode) {
  const { firstGamepad } = useGamepads();
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // https://xtrp.io/blog/2020/12/15/how-to-use-the-html5-gamepad-api/
      // Reference for correspondance between ID and ontroller's buttons
      if (firstGamepad) {
        const gamepad = navigator.getGamepads()[firstGamepad?.index];
        setIsPressed(gamepad?.buttons[code].pressed as boolean);
      }

      // // Directional DOWN
      // if (firstGamepad?.buttons[13].pressed) {
      //   console.log('DOWN');
      // }
      // // Directional LEFT
      // if (firstGamepad?.buttons[14].pressed) {
      //   console.log('LEFT');
      // }
      // // Directional RIGHT
      // if (firstGamepad?.buttons[14].pressed) {
      //   console.log('RIGHT');
      // }
    }, 1000 / 10);

    return () => {
      clearInterval(interval);
    };
  }, [firstGamepad, code]);

  return isPressed;
}

export default useGamepadControlls;
