import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';

export interface IDropdownOption {
  id: number;
  name: string;
  slug: string;
}

type DropdownProps = {
  selectedItem: IDropdownOption;
  onSelectItem: (item: IDropdownOption) => void;
  items: IDropdownOption[];
};

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  selectedItem,
  onSelectItem,
  items,
}) => {
  return (
    <div className="flex flex-col my-4 mb-8 relative">
      <p className="text-sm font-medium text-gray-700 mb-1">Source</p>
      <Listbox value={selectedItem} onChange={onSelectItem}>
        <Listbox.Button className="relative w-full py-1 pl-3 pr-10 text-left shadow-sm bg-white border border-gray-200 rounded-md focus:ring focus:ring-gray-200 focus:outline-none">
          <span className="block truncate">{selectedItem.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="w-full absolute top-16 z-10 py-1 mt-1 overflow-auto text-base border-gray-200 shadow-sm bg-white rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {items.map((item) => (
              <Listbox.Option
                key={item.id}
                value={item}
                className={({ active }) =>
                  `${active ? 'text-yellow-900 bg-yellow-100' : 'text-gray-900'}
                            cursor-default select-none relative py-2 px-4`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'font-medium' : 'font-normal'
                      } block truncate`}
                    >
                      {item.name}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? 'text-amber-600' : 'text-amber-600'
                        }
                                  absolute inset-y-0 left-0 flex items-center pl-3`}
                      />
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

export default Dropdown;
