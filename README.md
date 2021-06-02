# Shadow Game Launcher

Shadow Game Launcher is like his name said an application to launch games from your ShadowPC (but works on regular computer aswell).

The main goal is to launch games installed in my ShadowPC on the AppleTV's or iPad client with a gamepad connected to it.

At the moment, the application supports games installed on your disk (from steam for example) & games installed from Epic Game Launcher.

## Technical environment

- Based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
- [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) for styling
- [React-spring](https://github.com/pmndrs/react-spring) for animations
- [electron-storage](https://github.com/sindresorhus/electron-store) to persist data
- Support [Rawg](https://rawg.io/) API to retrieve poster for games

### TODO

- [x] Grid responsive
- [ ] Detect & Display gamepads connected
- [x] Navigate with arrow keys
- [ ] Navigate with gamepad
- [ ] Add / Remove game in library
- [ ] Re-order games
- [ ] Configure application (fullscreen, on startup)
