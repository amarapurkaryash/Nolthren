import React from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import DesktopIcon from './icons/DesktopIcon';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const themes: Theme[] = ['light', 'dark', 'system'];
  
  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };
  
  const getIcon = () => {
    switch(theme) {
      case 'light':
        return <SunIcon className="w-5 h-5" />;
      case 'dark':
        return <MoonIcon className="w-5 h-5" />;
      case 'system':
      default:
        return <DesktopIcon className="w-5 h-5" />;
    }
  };

  const getTitle = () => {
    switch(theme) {
      case 'light':
        return 'Switch to Dark Mode';
      case 'dark':
        return 'Switch to System Preference';
      case 'system':
      default:
        return 'Switch to Light Mode';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center justify-center w-12 h-12 text-gray-600 hover:text-gray-900 bg-white/50 backdrop-blur-lg rounded-full shadow-lg border border-white/20 transition-all hover:shadow-xl hover:bg-white/70 dark:text-gray-300 dark:hover:text-white dark:bg-neutral-900/50 dark:border-white/10 dark:hover:bg-neutral-800/70"
      title={getTitle()}
      aria-label={getTitle()}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;