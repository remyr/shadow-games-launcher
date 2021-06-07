import React, { ButtonHTMLAttributes } from 'react';

const SubmitButton: React.FunctionComponent<ButtonHTMLAttributes<
  HTMLButtonElement
>> = () => {
  return (
    <button
      type="submit"
      className="bg-yellow-500 text-white py-1 w-full rounded shadow transition duration-200 hover:bg-yellow-400"
    >
      Add to library
    </button>
  );
};

export default SubmitButton;
