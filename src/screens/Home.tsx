import React from 'react';

import Card from '../components/Card';
import { ILibraryItem } from '../store';

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
  'https://media.rawg.io/media/games/1be/1bed7fae69d1004c09dfe1101d5a3a94.jpg',
];
const DATA: ILibraryItem[] = images.map((image, idx) => ({
  coverUrl: image,
  name: `Random placeholder ${idx}`,
  type: 'disk',
}));

const Home = () => {
  return (
    <div className="absolute top-16 bottom-16 left-0 right-0 p-8 overflow-hidden grid grid-cols-4 gap-y-2 gap-x-8">
      {/* <div className=""> */}
      {DATA.map((game, index) => (
        <Card key={game.name} data={game} selected={index === 0} />
      ))}
      {/* </div> */}
    </div>
  );
};

export default Home;
