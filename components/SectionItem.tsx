

import React from 'react';
import { Section } from '../services/geminiService';
import RefreshIcon from './icons/RefreshIcon';
import DragHandleIcon from './icons/DragHandleIcon';
import Tooltip from './Tooltip';

interface SectionItemProps {
  section: Section;
  isRegenerating: boolean;
  onToggleVisibility: () => void;
  onRegenerate: () => void;
  // Drag and drop props
  index: number;
  isDragging: boolean;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  isRegenerating,
  onToggleVisibility,
  onRegenerate,
  index,
  isDragging,
  onDragStart,
  onDragEnter,
  onDragEnd
}) => {
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(index);
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragEnter(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow drop
  };
  
  const isToggleable = true;

  const toggleTooltipText = !isToggleable
    ? 'This section cannot be hidden.'
    : section.isPlaceholder
    ? 'This is a placeholder. Enable it to add your own content.'
    : section.hasData
    ? 'Show or hide this section in the final README.'
    : 'This section is empty. Enable it to add content manually.';

  const itemClasses = `
    section-item flex items-center justify-between p-2 rounded-lg transition-colors
    ${!section.hasData || section.isPlaceholder ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'}
    ${isDragging ? 'dragging' : 'hover:bg-gray-100 dark:hover:bg-neutral-800'}
  `;
  
  const isRegenerateDisabled = 
    section.id === 'project_title' || 
    section.id === 'table_of_contents' ||
    section.id === 'acknowledgments' ||
    isRegenerating;

  const regenerateTooltipText = isRegenerateDisabled 
    ? "This section cannot be regenerated." 
    : `Regenerate the "${section.title}" section using AI.`;

  return (
    <div
      className={itemClasses}
      draggable={!isRegenerating}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragEnd={onDragEnd}
      onDrop={onDragEnd}
    >
      <div className="flex items-center gap-2 flex-grow min-w-0">
        <Tooltip content="Drag and drop to reorder sections">
          <span className="drag-handle text-gray-400 dark:text-gray-500">
            <DragHandleIcon className="w-5 h-5" />
          </span>
        </Tooltip>
        <span className="font-medium text-sm truncate" title={section.title.replace(/<[^>]+>/g, '')}>{section.title}</span>
      </div>
      <div className="flex items-center gap-3">
        <Tooltip content={regenerateTooltipText}>
          <button 
            onClick={onRegenerate} 
            disabled={isRegenerateDisabled}
            className="text-gray-500 hover:text-gray-900 disabled:text-gray-300 dark:text-gray-400 dark:hover:text-white dark:disabled:text-gray-600 disabled:cursor-not-allowed"
            aria-label={regenerateTooltipText}
          >
            <RefreshIcon className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          </button>
        </Tooltip>
        <Tooltip content={toggleTooltipText}>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={section.isVisible}
              onChange={onToggleVisibility}
              disabled={!isToggleable}
            />
            <span className="toggle-slider"></span>
          </label>
        </Tooltip>
      </div>
    </div>
  );
};

export default SectionItem;