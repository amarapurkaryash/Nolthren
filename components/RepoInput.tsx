
import React from 'react';

interface RepoInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: () => void;
  isBusy: boolean;
}

const RepoInput: React.FC<RepoInputProps> = ({
  inputValue,
  setInputValue,
  onSubmit,
  isBusy,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter GitHub username, repo URL, or user/repo"
          className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200 dark:bg-neutral-800 dark:border-neutral-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
          disabled={isBusy}
          aria-label="GitHub username, repository URL, or username/repository"
        />
        <button
          onClick={onSubmit}
          disabled={isBusy || !inputValue}
          className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center px-6 py-3 font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-violet-600 dark:text-white dark:hover:bg-violet-500 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isBusy ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Create README'
          )}
        </button>
      </div>
    </div>
  );
};

export default RepoInput;