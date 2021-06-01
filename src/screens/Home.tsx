import React, { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import { useTransition, animated } from 'react-spring';

import { ILibraryItem } from '../store';
import chunk from '../utils/chunk';

import Card from '../components/Card';
import useKeyPress from '../hooks/useKeyPress';
import useWindowDimensions from '../hooks/useWindowDimension';

const images = [
  'https://media.rawg.io/media/games/0bc/0bcc108295a244b488d5c25f7d867220.jpg',
  'https://media.rawg.io/media/games/193/19390fa5e75e9048b22c9a736cf9992f.jpg',
  'https://media.rawg.io/media/games/59f/59fc1c5de1d29cb9234741c97d250150.jpg',
  'https://media.rawg.io/media/games/071/0711f22aeaf7927ccd071b186743ca5e.jpg',
  'https://media.rawg.io/media/games/9f1/9f189c639f70f91166df415811a8b525.jpg',
  'https://media.rawg.io/media/games/c6b/c6bd26767c1053fef2b10bb852943559.jpg',
  'https://media.rawg.io/media/games/a8b/a8bf6f31bfbdaf7d4b86c1953c62cee0.jpg',
  'https://media.rawg.io/media/games/336/336c6bd63d83cf8e59937ab8895d1240.jpg',
  'https://media.rawg.io/media/games/3c4/3c4a44ed99c87c56e0cdcfaaaf5c3628.jpg',
  'https://media.rawg.io/media/games/116/116b93c6876a361a96b2eee3ee58ab13.jpg',
  'https://media.rawg.io/media/games/b86/b86c1a368a97b1fb0b757429f7659c70.jpg',
  // 'https://media.rawg.io/media/games/1be/1bed7fae69d1004c09dfe1101d5a3a94.jpg',
];
const DATA: ILibraryItem[] = images.map((image, idx) => ({
  id: idx,
  coverUrl: image,
  name: `Random placeholder ${idx}`,
  type: 'disk',
}));

const CARD_WIDTH = 384;
const CARD_HEIGHT = 256;
const PADDING_X = 128;
const PADDING_Y = 0;

const Home = () => {
  const { width } = useWindowDimensions();
  const [items, setItems] = useState<ILibraryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selected, setSelected] = useState(0);
  const [ref, bounds] = useMeasure();
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [pageSize, setPageSize] = useState(0);

  const arrowDown = useKeyPress('ArrowDown');
  const arrowUp = useKeyPress('ArrowUp');
  const arrowLeft = useKeyPress('ArrowLeft');
  const arrowRight = useKeyPress('ArrowRight');

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
      const chunkedData = chunk<ILibraryItem>(DATA, pageSize);
      setItems(chunkedData[currentPage]);
    }
  }, [currentPage, pageSize]);

  // Handle controls
  useEffect(() => {
    if (arrowRight) {
      const nextTarget = selected + 1;
      if (nextTarget <= DATA.length - 1) {
        setSelected((previousValue) => previousValue + 1);
        if (nextTarget > (pageSize - 1) * (currentPage + 1)) {
          setCurrentPage((previousPage) => previousPage + 1);
        }
      }
    }
    if (arrowLeft) {
      const nextTarget = selected - 1;
      if (nextTarget >= 0) {
        setSelected((previousValue) => previousValue - 1);

        const condition = pageSize * currentPage;
        if (nextTarget < condition && condition > 0) {
          setCurrentPage((previousPage) => previousPage - 1);
        }
      }
    }
    if (arrowUp) {
      const nextTarget = selected - columns;
      let topShift = columns;
      if (nextTarget < rows * columns * currentPage) {
        topShift = 0;
      }
      setSelected((previousValue) => previousValue - topShift);
    }

    if (arrowDown) {
      const nextTarget = selected + columns;

      const itemsDisplayed = rows * columns * (currentPage + 1);
      const freeSpace = itemsDisplayed - DATA.length;

      let bottomShift = columns;
      // const itemCurrentRow = Math.round(
      //   (selected - rowCount * columnsCount * currentPage) / columnsCount,
      // );

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
  }, [arrowDown, arrowUp, arrowLeft, arrowRight, columns, pageSize]);

  const fragment = transition((styles, game) => (
    <Card
      key={game.id}
      style={styles}
      data={game}
      selected={selected === game.id}
    />
  ));

  return (
    <div
      ref={ref}
      className={`absolute top-16 4k:top-32 bottom-16 4k:bottom-32 left-0 right-0 p-8 4k:p-16 overflow-hidden grid grid-cols-${columns} gap-y-2 4k:gap-y-4 gap-x-8`}
    >
      {fragment}
      {/* <div className=""> */}
      {/* {items.map((game) => (
        <Card key={game.id} data={game} selected={selected === game.id} />
      ))} */}
      {/* </div> */}
    </div>
  );
};

export default Home;
