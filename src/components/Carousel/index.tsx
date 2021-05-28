import React from 'react';

interface IProps {
  url: string;
}

export const First = (props: IProps) => {
  return (
    <img
      className="h-72 w-52 p-1 bg-gray-900 rounded-md shadow mx-4 absolute -translate-x-120 transform"
      style={{ filter: 'grayscale(100%)', opacity: '50%' }}
      src={props.url}
      alt="ck3-cover"
    />
  );
};

export const Previous = (props: IProps) => {
  return (
    <img
      className="h-72 w-52 p-1 bg-gray-900 rounded-md shadow mx-4 absolute -translate-x-60 transform"
      style={{ filter: 'grayscale(100%)', opacity: '50%' }}
      src={props.url}
      alt="ck3-cover"
    />
  );
};

export const Next = (props: IProps) => {
  return (
    <img
      className="h-72 w-52 p-1 bg-gray-900 rounded-md shadow mx-4 absolute translate-x-60 transform"
      style={{ filter: 'grayscale(100%)', opacity: '50%' }}
      src={props.url}
      alt="ck3-cover"
    />
  );
};

export const Last = (props: IProps) => {
  return (
    <img
      className="h-72 w-52 p-1 bg-gray-900 rounded-md shadow mx-4 absolute translate-x-120 transform"
      style={{ filter: 'grayscale(100%)', opacity: '50%' }}
      src={props.url}
      alt="ck3-cover"
    />
  );
};
