import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FunctionComponent<InputProps> = ({
  // type = 'text',
  label,
  ...rest
}) => {
  const inputId = Math.random().toString(36);

  return (
    <div className="flex flex-col mb-8">
      <label
        className="text-sm font-medium text-gray-700 mb-1 capitalize"
        htmlFor={inputId}
      >
        {label}
      </label>
      <input
        className="border shadow-sm border-gray-200 py-1 px-4 rounded-md bg-white focus:outline-none focus:ring focus:ring-gray-200"
        id={inputId}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </div>
  );
};

export default Input;
