import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { ILibraryItem } from '../../store/store';

type LibraryProps = {
  data: ILibraryItem[];
};

const Library: React.FunctionComponent<LibraryProps> = ({ data }) => {
  return (
    <div className="flex-1">
      <div className="shadow rounded ml-8 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                File or URL
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((game) => (
              <tr key={game.name}>
                <td className="px-6 py-2 whitespace-nowrap flex items-center">
                  <div className="mr-2 text-gray-300">
                    <ChevronUpIcon className="h-5 w-5 hover:text-gray-500 cursor-pointer transition-all duration-300" />
                    <ChevronDownIcon className="h-5 w-5 hover:text-gray-500 cursor-pointer" />
                  </div>
                  {game.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{game.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {game.file || game.url}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    type="button"
                    disabled
                    // href="/"
                    className="bg-blue-500 mr-2 py-1 px-4 text-white rounded shadow hover:bg-blue-400 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled
                    // href="/"
                    className="bg-red-500 py-1 px-4 text-white rounded shadow hover:bg-red-400 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Library;
