import React, { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import { useTransition } from 'react-spring';

import { ILibraryItem } from '../store/store';
import chunk from '../utils/chunk';

import Card from '../components/Card';
import useKeyPress from '../hooks/useKeyPress';
import useWindowDimensions from '../hooks/useWindowDimension';
import useGamepadControlls, { GamepadCode } from '../hooks/useGamepadControlls';
import LibraryRepository from '../store/libraryRepository';

const CARD_WIDTH = 342;
const CARD_HEIGHT = 208;
const PADDING_X = 64;
const PADDING_Y = 0;

const Home = () => {
  const { width } = useWindowDimensions();
  const [items, setItems] = useState<ILibraryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selected, setSelected] = useState<number>(0);
  const [ref, bounds] = useMeasure();
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [pageSize, setPageSize] = useState(0);

  const arrowDown = useKeyPress('ArrowDown');
  const arrowUp = useKeyPress('ArrowUp');
  const arrowLeft = useKeyPress('ArrowLeft');
  const arrowRight = useKeyPress('ArrowRight');

  const gamepadButtonUp = useGamepadControlls(GamepadCode.UP);
  const gamepadButtonDown = useGamepadControlls(GamepadCode.DOWN);
  const gamepadButtonLeft = useGamepadControlls(GamepadCode.LEFT);
  const gamepadButtonRight = useGamepadControlls(GamepadCode.RIGHT);

  const transition = useTransition(items, {
    from: {
      opacity: 0,
      x: -50,
    },
    enter: (_, index) => ({
      opacity: 1,
      x: 0,
      delay: 100 * index,
    }),
    config: { duration: 300 },
  });

  const ratio = width > 2560 ? 2 : 1;

  useEffect(() => {
    // Get game saved
    const libraryData = LibraryRepository.getAllGames();
    setItems(libraryData);
    if (libraryData.length > 0) {
      setSelected(0);
    }
  }, []);

  // Init grid from size window
  useEffect(() => {
    const columnsCount = Math.floor(
      (bounds.width - PADDING_X * ratio) / (CARD_WIDTH * ratio)
    );
    const rowsCount = Math.floor(
      (bounds.height - PADDING_Y * ratio) / (CARD_HEIGHT * ratio)
    );
    const pageCount = columnsCount * rowsCount;

    setColumns(columnsCount);
    setRows(rowsCount);
    setPageSize(pageCount);
  }, [bounds, ratio]);

  // Select chunk of data from current page
  useEffect(() => {
    if (pageSize !== 0) {
      const chunkedData = chunk<ILibraryItem>(items, pageSize);
      setItems(chunkedData[currentPage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  // Handle controls
  useEffect(() => {
    if (arrowRight || gamepadButtonRight) {
      const nextTarget = selected + 1;
      if (nextTarget <= items.length - 1) {
        setSelected((previousValue) => previousValue + 1);
        if (nextTarget > (pageSize - 1) * (currentPage + 1)) {
          setCurrentPage((previousPage) => previousPage + 1);
        }
      }
    }
    if (arrowLeft || gamepadButtonLeft) {
      const nextTarget = selected - 1;
      if (nextTarget >= 0) {
        setSelected((previousValue) => previousValue - 1);

        const condition = pageSize * currentPage;
        if (nextTarget < condition && condition > 0) {
          setCurrentPage((previousPage) => previousPage - 1);
        }
      }
    }
    if (arrowUp || gamepadButtonUp) {
      const nextTarget = selected - columns;
      let topShift = columns;
      if (nextTarget < rows * columns * currentPage) {
        topShift = 0;
      }
      setSelected((previousValue) => previousValue - topShift);
    }
    if (arrowDown || gamepadButtonDown) {
      const nextTarget = selected + columns;

      const itemsDisplayed = rows * columns * (currentPage + 1);
      const freeSpace = itemsDisplayed - items.length;

      let bottomShift = columns;
      // const itemCurrentRow = Math.round(
      //   (selected - rowCount * columnsCount * currentPage) / columnsCount,
      // );

      if (nextTarget > items.length - 1) {
        return;
      }

      if (nextTarget < itemsDisplayed) {
        if (freeSpace > 0 && nextTarget > DATA.length) {
          // if freeSpace is negative, there is empty spot in the page,
          bottomShift = 0;
        }
      } else {
        bottomShift = 0;
        // bottomShift = itemCurrentRow * columnsCount * -1;
      }
      setSelected((previousValue) => previousValue + bottomShift);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    arrowDown,
    arrowUp,
    arrowLeft,
    arrowRight,
    columns,
    pageSize,
    gamepadButtonDown,
    gamepadButtonLeft,
    gamepadButtonRight,
    gamepadButtonUp,
  ]);

  // const selectGame = useCallback(() => {
  //   const game = library[gameSelected];

  //   if (game.type === SUPPORT_GAME_TYPE.DISK) {
  //     ipcRenderer.send(EVENTS.LAUNCH_GAME, game);
  //   }

  //   if (game.type === SUPPORT_GAME_TYPE.EGS) {
  //     // eslint-disable-next-line no-restricted-globals
  //     open(game.url);
  //   }
  // }, [gameSelected, library]);

  const fragment = transition((styles, game, _, index) => (
    <Card
      key={game.id}
      style={styles}
      data={game}
      selected={selected === index}
    />
  ));

  return (
    <div
      ref={ref}
      className={`absolute top-16 bottom-16 4k:bottom-32 left-0 right-0 px-8 py-12 overflow-hidden grid grid-cols-${columns} gap-8`}
    >
      {fragment}
    </div>
  );
};

export default Home;
