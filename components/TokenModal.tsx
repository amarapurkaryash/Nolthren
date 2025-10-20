import React, { useState, useEffect } from 'react';
import KeyIcon from './icons/KeyIcon';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('github_pat');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (token.trim()) {
      localStorage.setItem('github_pat', token.trim());
    } else {
      localStorage.removeItem('github_pat');
    }
    setIsSaved(true);
    setTimeout(() => {
        setIsSaved(false);
        onClose();
    }, 1500);
  };

  const handleClear = () => {
    localStorage.removeItem('github_pat');
    setToken('');
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 transform transition-all">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
                <KeyIcon className="w-6 h-6 text-sky-600" />
                <h2 className="text-2xl font-bold text-gray-800">GitHub API Token</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>
        
        <div className="mt-6 text-gray-600 space-y-4">
            <p>
                You've hit the GitHub API rate limit for unauthenticated requests. Providing a Personal Access Token (PAT) increases your limit from ~60 to 5,000 requests per hour.
            </p>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md">
                <p className="font-semibold">Your token is safe.</p>
                <p className="text-sm">It's stored <strong className="font-semibold">only in your browser's local storage</strong> and is never sent anywhere except to GitHub's API.</p>
            </div>
             <p>
                1. <a href="https://github.com/settings/tokens/new?scopes=public_repo&description=Nolthren" target="_blank" rel="noopener noreferrer" className="text-sky-700 font-semibold hover:underline">Create a new token</a> with the <code className="bg-gray-200 p-1 rounded text-sm">public_repo</code> scope.
            </p>
             <p>2. Paste the token below and click save. Then, try your last action again.</p>
        </div>

        <div className="mt-6">
            <label htmlFor="github-token" className="block text-sm font-medium text-gray-700 mb-1">Personal Access Token (PAT)</label>
            <div className="flex items-center gap-2">
                <input
                    id="github-token"
                    type="password"
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
                    placeholder="ghp_..."
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                {token && (
                    <button onClick={handleClear} className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Clear</button>
                )}
            </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Continue without Token
            </button>
            <button 
                onClick={handleSave} 
                className={`px-6 py-2 text-sm font-semibold text-white rounded-lg transition-colors w-32 ${isSaved ? 'bg-green-500' : 'bg-sky-600 hover:bg-sky-700'}`}
            >
                {isSaved ? 'Saved!' : 'Save Token'}
            </button>
        </div>

      </div>
    </div>
  );
};

export default TokenModal;