import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 text-center py-5 px-4">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Made with{' '}
        <a 
            href="https://github.com/amarapurkaryash/Nolthren" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-semibold text-gray-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300"
        >
            Nolthren
        </a> 
        {' '} & Gemini AI.
      </p>
    </footer>
  );
};

export default Footer;