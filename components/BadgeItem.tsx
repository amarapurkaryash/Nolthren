import React from 'react';
import { Badge } from '../services/geminiService';
import ColorPicker from './ColorPicker';
import DragHandleIcon from './icons/DragHandleIcon';

interface BadgeItemProps {
    badge: Badge;
    onToggleVisibility: () => void;
    onChangeColor: (newColor: string) => void;
    index: number;
    isDragging: boolean;
    onDragStart: (index: number) => void;
    onDragEnter: (index: number) => void;
    onDragEnd: () => void;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ 
    badge, 
    onToggleVisibility, 
    onChangeColor,
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

    const itemClasses = `
      section-item flex items-center justify-between p-2 rounded-lg transition-colors
      ${isDragging ? 'dragging' : 'hover:bg-gray-100 dark:hover:bg-neutral-800'}
    `;

    return (
        <div
            className={itemClasses}
            draggable
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragEnd={onDragEnd}
            onDrop={onDragEnd}
        >
            <div className="flex items-center gap-2 flex-grow min-w-0">
                <span className="drag-handle text-gray-400 dark:text-gray-500" title="Drag to reorder">
                    <DragHandleIcon className="w-5 h-5" />
                </span>
                <span className="font-medium text-sm text-gray-700 dark:text-gray-200 truncate" title={badge.label}>
                    {badge.label}
                </span>
            </div>
            <div className="flex items-center gap-4">
                <ColorPicker
                    currentColor={badge.color}
                    onChangeColor={onChangeColor}
                />
                <label className="toggle-switch" title="Toggle visibility">
                    <input
                        type="checkbox"
                        checked={badge.isVisible}
                        onChange={onToggleVisibility}
                    />
                    <span className="toggle-slider"></span>
                </label>
            </div>
        </div>
    );
};

export default BadgeItem;