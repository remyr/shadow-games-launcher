import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { RouteDefinition } from '../../routes';

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    switch (location.pathname) {
      case RouteDefinition.Configuration.path:
        setTitle('Configuration');
        break;
      default:
        setTitle(null);
    }
  }, [location]);

  return (
    <header className="flex items-center justify-center w-full text-white font-orbitron capitalize border-b border-gray-200 bg-white text-xl h-16">
      <h1 className="text-yellow-500">
        Shadow Games Launcher {title && ` - ${title}`}
      </h1>
    </header>
  );
};

export default Header;
