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
    <div className="flex items-center justify-center w-full bg-black h-16 shadow-md text-white font-orbitron capitalize 4k:h-32 4k:text-3xl">
      Shadow Launcher {title && ` - ${title}`}
    </div>
  );
};

export default Header;
