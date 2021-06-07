import React from 'react';

type SelectFileButtonProps = {
  handleFile: (e: File | null) => void;
  filePath: string | null;
};

const SelectFileButton: React.FunctionComponent<SelectFileButtonProps> = ({
  handleFile,
  filePath,
}) => {
  return (
    <div className="mb-8">
      <label className="block text-center cursor-pointer bg-gray-300 py-1 w-full text-white rounded shadow transition duration-200 hover:bg-gray-200">
        Select .exe file
        <input
          type="file"
          className="hidden"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFile(e.target && e.target.files && e.target.files[0])
          }
        />
      </label>
      {filePath && <p className="text-xs mt-1 text-gray-500">{filePath}</p>}
    </div>
  );
};

export default SelectFileButton;
