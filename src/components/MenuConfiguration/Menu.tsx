import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Routes from '../../routes';
import MenuItem from './MenuItem';

const menu = [
  {
    id: 0,
    name: Routes.LibraryConfiguration.name,
    path: Routes.LibraryConfiguration.path,
  },
  {
    id: 1,
    name: Routes.ApplicationConfiguration.name,
    path: Routes.ApplicationConfiguration.path,
  },
  {
    id: 2,
    name: Routes.PluginsConfiguration.name,
    path: Routes.PluginsConfiguration.path,
  },
];

const Menu = () => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(0);

  useEffect(() => {
    const nextElement = menu.find((item) => item.path === location.pathname);
    setSelectedMenu(nextElement?.id || 0);
  }, [location]);

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="bg-white flex rounded-full border border-gray-200 h-12">
        {menu.map((item) => (
          <MenuItem
            selected={item.id === selectedMenu}
            label={item.name}
            key={item.id}
            path={item.path}
          />
        ))}
        <div
          style={{ transform: `translateX(${100 * selectedMenu}%)` }}
          className="absolute h-12 w-48 bg-yellow-500 rounded-full transition-all duration-250 shadow-md"
        />
      </div>
    </div>
  );
};

export default Menu;
