import React, { useState, useEffect } from 'react';
import BarLoader from './BarLoader';

interface ProgressStep {
  id: string;
  text: string;
}

interface ProgressState {
  currentStepId: string | null;
  completedStepIds: string[];
}

interface ProgressLoaderProps {
  steps: ProgressStep[];
  progress: ProgressState;
}

const ProgressLoader: React.FC<ProgressLoaderProps> = ({ steps, progress }) => {
  const currentStep = steps.find(step => step.id === progress.currentStepId);
  const currentStepText = currentStep?.text || 'Preparing...';
  
  const [githubStatus, setGithubStatus] = useState<'Personal Token' | 'None'>('None');
  const [geminiStatus, setGeminiStatus] = useState<'Personal Key' | 'None'>('None');

  useEffect(() => {
    // This effect runs when the loader becomes visible to check which keys are active.
    try {
      const storedGithubToken = localStorage.getItem('github_pat');
      setGithubStatus(storedGithubToken ? 'Personal Token' : 'None');

      const storedGeminiKey = localStorage.getItem('gemini_api_key');
      setGeminiStatus(storedGeminiKey ? 'Personal Key' : 'None');
    } catch (e) {
      console.warn('Could not access localStorage to determine key status.');
    }
  }, []); // Empty dependency array means this runs once on mount.


  return (
    <div className="my-12 w-full max-w-2xl mx-auto flex flex-col items-center" aria-live="polite">
      <div className="mb-8">
        <BarLoader />
      </div>
      
      <p className="text-center text-lg text-gray-700 dark:text-gray-200 font-semibold">
        {currentStepText}
      </p>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
        Please be patient. Generation time varies depending on the repository's size.
      </p>
      
      {/* API Key Status Display */}
      <div className="mt-6 w-full bg-gray-100 dark:bg-neutral-900/50 p-4 rounded-lg border border-gray-200 dark:border-neutral-800">
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
                <span>GitHub:</span>
                <span className={`font-semibold ${githubStatus === 'Personal Token' ? 'text-gray-800 dark:text-violet-400' : 'text-red-600 dark:text-red-400'}`}>
                    {githubStatus}
                </span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-neutral-700"></div>
            <div className="flex items-center gap-2">
                <span>Gemini:</span>
                <span className={`font-semibold ${geminiStatus === 'Personal Key' ? 'text-gray-800 dark:text-violet-400' : 'text-red-600 dark:text-red-400'}`}>
                    {geminiStatus}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressLoader;