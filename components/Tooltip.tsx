import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-flex items-center group">
      {children}
      <div 
        role="tooltip"
        className={`tooltip-content absolute z-20 w-max max-w-xs px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-sm dark:bg-neutral-800 ${positionClasses[position]} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
