import React from 'react';
import { Link } from 'react-router-dom';

type MenuItemsProps = {
  selected: boolean;
  label: string;
  path: string;
};

const MenuItem: React.FunctionComponent<MenuItemsProps> = ({
  selected,
  label,
  path,
}) => {
  return (
    <Link
      to={path}
      className={`h-12 w-48 z-10 bg-opacity-10 flex items-center justify-center cursor-pointer focus:outline-none ${
        selected ? 'text-white' : 'text-gray-400'
      }`}
    >
      {label}
    </Link>
  );
};

export default MenuItem;
