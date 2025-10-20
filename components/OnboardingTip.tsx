
import React, { useEffect } from 'react';
import ClockIcon from './icons/ClockIcon';
import SparkleIcon from './icons/SparkleIcon';

interface OnboardingTipProps {
  onDismiss: () => void;
  showSupportWarning: boolean;
  generationTime: number | null;
}

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const formatDuration = (milliseconds: number): string => {
  if (milliseconds < 1000) {
    return `${Math.round(milliseconds)} milliseconds`;
  }
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0 && seconds > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} and ${seconds} second${seconds > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''}`;
  }
};


const OnboardingTip: React.FC<OnboardingTipProps> = ({ onDismiss, showSupportWarning, generationTime }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onDismiss();
    }, 20000); // Increased time to 20s to allow for reading the new message

    return () => {
      clearTimeout(timerId); // Cleanup timer on unmount
    };
  }, [onDismiss]);

  return (
    <div className="bg-gray-100 dark:bg-neutral-900/50 border-l-4 border-gray-500 dark:border-violet-500 text-gray-800 dark:text-gray-200 p-4 rounded-lg shadow-sm flex items-start gap-3" role="alert">
      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-x-4 gap-y-1 mb-2">
          <h3 className="font-bold text-lg">Customize Your README</h3>
          {generationTime !== null && (
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 flex-shrink-0">
                  <ClockIcon className="w-4 h-4" />
                  <span>Generated in {formatDuration(generationTime)}</span>
              </div>
          )}
        </div>
        <p className="text-sm mb-2">
          <strong>Sections:</strong> We've enabled all generated sections by default. If you're not satisfied with a section's content, use the refresh icon to regenerate it. If a section is a placeholder or not needed, simply toggle its visibility off in the sidebar.
        </p>
        <p className="text-sm mb-3">
          <strong>Badges:</strong> You can also customize the visibility and color of each badge from the 'Badges' tab in the sidebar.
        </p>
        
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-neutral-800/60 text-sm">
            <p>
                <strong>A small request:</strong> The generated README includes an acknowledgment to Nolthren. Keeping this line helps spread the word and shows that your project uses modern, AI-powered documentation tools. Thank you for your support!
            </p>
        </div>

         {showSupportWarning && (
          <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-500/40 text-red-700 dark:text-red-300 rounded-md text-sm">
              <h4 className="font-bold mb-1">Please Verify Payment Links</h4>
              <p>We detected potential sponsorship information and generated a "Support Us" section. Please double-check that all payment links are correct and lead to the right destination.</p>
          </div>
        )}
      </div>
      
      {/* Close Button */}
      <div className="flex-shrink-0">
          <button 
            onClick={onDismiss} 
            className="p-1.5 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-gray-200 transition-colors"
            aria-label="Dismiss message"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
      </div>
    </div>
  );
};

export default OnboardingTip;