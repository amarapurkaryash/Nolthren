import React, { useState, useEffect } from 'react';

// Icons are defined here locally as they are no longer separate components
const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


interface ApiKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'github' | 'gemini';
}

type Tab = 'github' | 'gemini';

const ApiKeysModal: React.FC<ApiKeysModalProps> = ({ isOpen, onClose, initialTab = 'github' }) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  
  const [githubToken, setGithubToken] = useState('');
  const [geminiKey, setGeminiKey] = useState('');

  const [githubSaveStatus, setGithubSaveStatus] = useState<'idle' | 'saved'>('idle');
  const [geminiSaveStatus, setGeminiSaveStatus] = useState<'idle' | 'saved'>('idle');
  
  const hasGithubToken = githubToken.trim() !== '';
  const hasGeminiKey = geminiKey.trim() !== '';

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      try {
        setGithubToken(localStorage.getItem('github_pat') || '');
        setGeminiKey(localStorage.getItem('gemini_api_key') || '');
      } catch (e) {
          console.warn('Could not access localStorage for API keys.');
      }
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleSaveGithub = () => {
    try {
      if (githubToken.trim()) {
        localStorage.setItem('github_pat', githubToken.trim());
      } else {
        localStorage.removeItem('github_pat');
      }
    } catch(e) { console.error('Failed to save GitHub token to localStorage.', e); }
    setGithubSaveStatus('saved');
    setTimeout(() => setGithubSaveStatus('idle'), 1500);
  };
  
  const handleSaveGemini = () => {
    try {
      if (geminiKey.trim()) {
        localStorage.setItem('gemini_api_key', geminiKey.trim());
      } else {
        localStorage.removeItem('gemini_api_key');
      }
    } catch(e) { console.error('Failed to save Gemini key to localStorage.', e); }
    setGeminiSaveStatus('saved');
    setTimeout(() => setGeminiSaveStatus('idle'), 1500);
  };

  const handleClearGithub = () => {
    try {
      localStorage.removeItem('github_pat');
    } catch(e) { console.error('Failed to clear GitHub token from localStorage.', e); }
    setGithubToken('');
  };

  const handleClearGemini = () => {
    try {
      localStorage.removeItem('gemini_api_key');
    } catch(e) { console.error('Failed to clear Gemini key from localStorage.', e); }
    setGeminiKey('');
  };

  const tabButtonClasses = (tabName: Tab) => 
    `w-1/2 py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors focus:outline-none ${
      activeTab === tabName
        ? 'border-gray-700 text-gray-800 dark:border-violet-400 dark:text-gray-100'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-neutral-700'
    }`;
  
  const saveButtonClasses = (status: 'idle' | 'saved') => 
    `px-6 py-2 text-sm font-semibold rounded-lg transition-colors w-32 ${status === 'saved' ? 'bg-green-500 text-white' : 'bg-gray-700 hover:bg-gray-800 text-white dark:bg-violet-600 dark:text-white dark:hover:bg-violet-500'}`;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 dark:bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-lg transform transition-all overflow-hidden">
        <div className="p-6 md:p-8 flex justify-between items-start border-b border-gray-200 dark:border-neutral-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">API Keys</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Close modal">
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>

        <div className="flex border-b border-gray-200 dark:border-neutral-800">
          <button onClick={() => setActiveTab('github')} className={tabButtonClasses('github')}>
              GitHub Token
          </button>
          <button onClick={() => setActiveTab('gemini')} className={tabButtonClasses('gemini')}>
              Gemini API Key
          </button>
        </div>

        <div className="p-6 md:p-8">
            {activeTab === 'github' && (
                <div>
                    <div className="text-gray-600 dark:text-gray-300 space-y-4">
                        <p>
                            To avoid GitHub's public rate limit (~60 requests/hour), you can provide a Personal Access Token (PAT). This increases your limit to 5,000 requests/hour.
                        </p>
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-500/50 text-yellow-800 dark:text-yellow-300 p-4 rounded-md text-sm">
                            <p className="font-semibold">Your token is stored securely in your browser's local storage.</p>
                        </div>
                        <p>
                            <a href="https://github.com/settings/tokens/new?scopes=public_repo&description=Nolthren" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300">Create a new token</a> with the <code className="bg-gray-200 dark:bg-neutral-700 p-1 rounded text-sm">public_repo</code> scope, then paste it below.
                        </p>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="github-token" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Personal Access Token (PAT)</label>
                        <input
                            id="github-token"
                            type="password"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="ghp_..."
                            value={githubToken}
                            onChange={(e) => setGithubToken(e.target.value)}
                        />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Status:{' '}
                            {hasGithubToken ? (
                                <span className="text-gray-800 dark:text-violet-400">
                                    Using <strong>your personal token</strong>.
                                </span>
                            ) : (
                                <strong className="text-red-600 dark:text-red-400">No token provided</strong>
                            )}.
                        </p>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={handleClearGithub}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-neutral-700 dark:text-gray-200 dark:border-neutral-600 dark:hover:bg-neutral-600"
                        >
                            Clear Token
                        </button>
                        <button onClick={handleSaveGithub} className={saveButtonClasses(githubSaveStatus)}>
                           {githubSaveStatus === 'saved' ? 'Saved!' : 'Save Token'}
                        </button>
                    </div>
                </div>
            )}
            {activeTab === 'gemini' && (
                <div>
                     <div className="text-gray-600 dark:text-gray-300 space-y-4">
                        <p>
                           Please provide your own Gemini API key to generate content. This application does not ship with a default key.
                        </p>
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-500/50 text-yellow-800 dark:text-yellow-300 p-4 rounded-md text-sm">
                             <p className="font-semibold">Your key is stored securely in your browser's local storage.</p>
                        </div>
                        <p>
                            <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300">Create a free API key</a> from Google AI, then paste it below.
                        </p>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="gemini-key" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Your Gemini API Key</label>
                        <input
                            id="gemini-key"
                            type="password"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Enter your API key"
                            value={geminiKey}
                            onChange={(e) => setGeminiKey(e.target.value)}
                        />
                         <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Status:{' '}
                            {hasGeminiKey ? (
                                <span className="text-gray-800 dark:text-violet-400">
                                    Using <strong >your personal key</strong>.
                                </span>
                            ) : (
                                <strong className="text-red-600 dark:text-red-400">No key provided</strong>
                            )}.
                        </p>
                    </div>
                     <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={handleClearGemini}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-neutral-700 dark:text-gray-200 dark:border-neutral-600 dark:hover:bg-neutral-600"
                        >
                            Clear Key
                        </button>
                        <button onClick={handleSaveGemini} className={saveButtonClasses(geminiSaveStatus)}>
                            {geminiSaveStatus === 'saved' ? 'Saved!' : 'Save Key'}
                        </button>
                    </div>
                </div>
            )}
        </div>
        
        <div className="px-6 md:px-8 py-4 bg-gray-50 dark:bg-neutral-900/50 border-t border-gray-200 dark:border-neutral-800 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-neutral-700 dark:text-gray-200 dark:border-neutral-600 dark:hover:bg-neutral-600">
                Close
            </button>
        </div>

      </div>
    </div>
  );
};

export default ApiKeysModal;