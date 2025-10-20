import React from 'react';
import BarLoader from './BarLoader';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center my-12" aria-live="polite">
       <BarLoader />
      <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">{message}</p>
    </div>
  );
};

export default Loader;