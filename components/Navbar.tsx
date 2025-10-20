import React from 'react';
import KeyIcon from './icons/KeyIcon';
import GithubIcon from './icons/GithubIcon';
import { View } from '../App';
import ThemeToggle, { Theme } from './ThemeToggle';

interface NavbarProps {
    onOpenApiKeysModal: () => void;
    currentView: View;
    onNavigate: (view: View) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenApiKeysModal, currentView, onNavigate, theme, setTheme }) => {

  const navLinkClasses = (isActive: boolean) => 
    `px-4 py-2 text-sm font-semibold bg-white/50 backdrop-blur-lg rounded-full shadow-lg border border-white/20 transition-all hover:shadow-xl hover:bg-white/70 dark:bg-neutral-900/50 dark:border-white/10 dark:hover:bg-neutral-800/70 ${
      isActive
        ? 'text-gray-900 dark:text-violet-400'
        : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
    }`;
    
  const iconButtonClasses = "flex items-center justify-center w-12 h-12 text-gray-600 hover:text-gray-900 bg-white/50 backdrop-blur-lg rounded-full shadow-lg border border-white/20 transition-all hover:shadow-xl hover:bg-white/70 dark:text-gray-300 dark:hover:text-white dark:bg-neutral-900/50 dark:border-white/10 dark:hover:bg-neutral-800/70";

  return (
    <nav className="fixed top-4 left-0 right-0 z-40 px-6 flex justify-between items-center w-full">
      {/* Logo on the left */}
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center justify-center text-gray-800 hover:text-gray-900 bg-white/50 backdrop-blur-lg rounded-full shadow-lg border border-white/20 px-4 py-2 transition-all hover:shadow-xl hover:bg-white/70 dark:text-white dark:hover:text-gray-200 dark:bg-neutral-900/50 dark:border-white/10 dark:hover:bg-neutral-800/70"
        title="Go to Nolthren Home"
        aria-label="Go to Nolthren Home"
      >
        <span className="font-bold text-xl tracking-tight">
          Nolthren
        </span>
      </button>

      {/* Centered navigation links */}
      <div className="hidden md:flex items-center gap-2">
        <button onClick={() => onNavigate('generator')} className={navLinkClasses(currentView === 'generator')}>
            Create README
        </button>
        <button onClick={() => onNavigate('sampleReadme')} className={navLinkClasses(currentView === 'sampleReadme')}>Sample README</button>
        <button onClick={() => onNavigate('about')} className={navLinkClasses(currentView === 'about')}>About</button>
        <button onClick={() => onNavigate('faq')} className={navLinkClasses(currentView === 'faq')}>FAQ</button>
        <button onClick={() => onNavigate('apiKeysGuide')} className={navLinkClasses(currentView === 'apiKeysGuide')}>API Keys</button>
        <button onClick={() => onNavigate('privacy')} className={navLinkClasses(currentView === 'privacy')}>Privacy Policy</button>
      </div>

      {/* Icons on the right */}
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/amarapurkaryash/Nolthren"
          target="_blank"
          rel="noopener noreferrer"
          className={iconButtonClasses}
          title="View Source Code on GitHub"
          aria-label="View Source Code on GitHub"
        >
          <GithubIcon className="w-6 h-6" />
        </a>
        <button
          onClick={onOpenApiKeysModal}
          className={iconButtonClasses}
          title="Set API Keys"
          aria-label="Set API Keys"
        >
          <KeyIcon className="w-5 h-5" />
        </button>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </nav>
  );
};

export default Navbar;