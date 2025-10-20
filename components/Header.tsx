import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative text-center mb-8 md:mb-12">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight flex items-center justify-center gap-2">
          Nolthren
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">The AI-Powered README Generator</p>
      </div>
    </header>
  );
};

export default Header;