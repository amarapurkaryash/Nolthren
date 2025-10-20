import React, { useState } from 'react';
import { UserRepo } from '../services/githubService';

interface RepoGridProps {
  repos: UserRepo[];
  onSelectRepo: (url: string) => void;
  isGenerating: boolean;
  selectedRepoUrl: string;
}

const RepoGrid: React.FC<RepoGridProps> = ({ repos, onSelectRepo, isGenerating, selectedRepoUrl }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Select a Repository</h2>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200 dark:bg-neutral-800 dark:border-neutral-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
          aria-label="Search repositories"
        />
      </div>

      {filteredRepos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepos.map(repo => {
            const isSelected = selectedRepoUrl === repo.html_url;
            const isBusy = isGenerating && isSelected;
            return (
              <button
                key={repo.html_url}
                onClick={() => onSelectRepo(repo.html_url)}
                disabled={isGenerating}
                className="flex flex-col text-left h-full p-4 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg hover:border-gray-400 dark:hover:border-violet-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 disabled:opacity-50 disabled:hover:border-gray-200 dark:disabled:hover:border-neutral-700 disabled:hover:shadow-none disabled:cursor-not-allowed"
              >
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 truncate">{repo.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{repo.description || 'No description available.'}</p>
                </div>
                <div className="mt-3 h-12 flex items-center justify-center">
                    {isBusy && (
                        <svg className="animate-spin h-8 w-8 text-gray-700 dark:text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                </div>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No repositories found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default RepoGrid;