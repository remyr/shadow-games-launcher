import React, { FC } from 'react';

interface SelectSourceButtonProps
  extends React.ComponentPropsWithoutRef<'button'> {
  text: String;
}

export const SelectSourceButton: FC<SelectSourceButtonProps> = ({
  text,
  ...props
}) => {
  return (
    <button
      {...props}
      className="bg-gray-200 p-2 rounded-md flex items-center mt-8 focus:outline-none w-1/3 justify-center"
    >
      {text}
    </button>
  );
};
