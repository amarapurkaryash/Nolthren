import React, { useState, useEffect } from 'react';

interface GeminiTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const GeminiTokenModal: React.FC<GeminiTokenModalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
        try {
            const storedToken = localStorage.getItem('gemini_api_key');
            if (storedToken) {
                setToken(storedToken);
            }
        } catch (e) {
            console.warn('Could not access localStorage for Gemini key.');
        }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    try {
        if (token.trim()) {
            localStorage.setItem('gemini_api_key', token.trim());
        } else {
            localStorage.removeItem('gemini_api_key');
        }
    } catch (e) {
        console.error('Failed to save Gemini key to localStorage.', e);
    }
    setIsSaved(true);
    setTimeout(() => {
        setIsSaved(false);
        onClose();
    }, 1500);
  };

  const handleClear = () => {
    try {
        localStorage.removeItem('gemini_api_key');
    } catch (e) {
        console.error('Failed to remove Gemini key from localStorage.', e);
    }
    setToken('');
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 transform transition-all">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-800">Gemini API Key</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>
        
        <div className="mt-6 text-gray-600 space-y-4">
            <p>
                An issue occurred with the default Gemini API key. Please provide your own key to continue generating content.
            </p>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md">
                <p className="font-semibold">Your key is safe.</p>
                <p className="text-sm">It's stored <strong className="font-semibold">only in your browser's local storage</strong> and is never sent anywhere except to Google's API.</p>
            </div>
             <p>
                1. <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank" rel="noopener noreferrer" className="text-sky-700 font-semibold hover:underline">Create an API key</a> from Google AI.
            </p>
             <p>2. Paste the key below and click save. Then, try your last action again.</p>
        </div>

        <div className="mt-6">
            <label htmlFor="gemini-key" className="block text-sm font-medium text-gray-700 mb-1">Your Gemini API Key</label>
            <div className="flex items-center gap-2">
                <input
                    id="gemini-key"
                    type="password"
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
                    placeholder="Enter your API key"
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
                Cancel
            </button>
            <button 
                onClick={handleSave} 
                className={`px-6 py-2 text-sm font-semibold text-white rounded-lg transition-colors w-32 ${isSaved ? 'bg-green-500' : 'bg-sky-600 hover:bg-sky-700'}`}
            >
                {isSaved ? 'Saved!' : 'Save Key'}
            </button>
        </div>

      </div>
    </div>
  );
};

export default GeminiTokenModal;