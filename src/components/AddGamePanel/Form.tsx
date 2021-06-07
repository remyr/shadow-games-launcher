import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

import Input from '../Form/Input';
import Dropdown, { IDropdownOption } from '../Form/Dropdown';
import SubmitButton from './SubmitButton';
import SelectFileButton from './SelectFileButton';
import { ILibraryItem } from '../../store/store';

type FormProps = {
  submit: (payload: ILibraryItem) => void;
};

const sources: IDropdownOption[] = [
  { id: 1, name: 'From disk', slug: 'disk' },
  { id: 2, name: 'From Epic Game Store', slug: 'egs' },
];

const Form: React.FunctionComponent<FormProps> = ({ submit }) => {
  const [selectedSource, setSelectedSource] = useState<IDropdownOption>(
    sources[0]
  );
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [coverUrl, setCoverUrl] = useState<string>('');
  const [gameUrl, setGameUrl] = useState<string>('');

  const handleSelectSource = (source: IDropdownOption) => {
    setSelectedPath(null);
    setSelectedSource(source);
  };

  const resetForm = () => {
    setSelectedSource(sources[0]);
    setSelectedPath(null);
    setName('');
    setCoverUrl('');
    setGameUrl('');
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const payload: ILibraryItem = {
      id: uuidv4(),
      coverUrl,
      name,
      type: selectedSource.slug,
      url: gameUrl,
      file: selectedPath as string,
      directory: selectedPath ? path.dirname(selectedPath) : '',
    };

    submit(payload);

    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/3 rounded-md shadow-sm border border-gray-200 bg-white p-8"
    >
      <Dropdown
        items={sources}
        onSelectItem={handleSelectSource}
        selectedItem={selectedSource}
      />
      {selectedSource.id === 1 && (
        <SelectFileButton
          handleFile={(file) => setSelectedPath(file ? file.path : null)}
          filePath={selectedPath}
        />
      )}
      {selectedSource.id === 2 && (
        <Input
          value={gameUrl}
          onChange={(e) => setGameUrl(e.target.value)}
          label="Url"
        />
      )}
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="name"
      />
      <Input
        value={coverUrl}
        onChange={(e) => setCoverUrl(e.target.value)}
        label="cover url"
      />
      <SubmitButton />
    </form>
  );
};

export default Form;
