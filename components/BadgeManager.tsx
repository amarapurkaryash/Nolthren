import React, { useState, useRef } from 'react';
import { Badge } from '../services/geminiService';
import BadgeItem from './BadgeItem';

interface BadgeManagerProps {
    badges: Badge[];
    onToggleVisibility: (badgeId: string) => void;
    onChangeColor: (badgeId: string, newColor: string) => void;
    onReorder: (reorderedBadges: Badge[]) => void;
}

const BadgeManager: React.FC<BadgeManagerProps> = ({ badges, onToggleVisibility, onChangeColor, onReorder }) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const dragOverIndex = useRef<number | null>(null);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragEnter = (index: number) => {
        dragOverIndex.current = index;
    };

    const handleDragEnd = () => {
        if (draggedIndex !== null && dragOverIndex.current !== null && draggedIndex !== dragOverIndex.current) {
            const reorderedBadges = [...badges];
            const [draggedItem] = reorderedBadges.splice(draggedIndex, 1);
            reorderedBadges.splice(dragOverIndex.current, 0, draggedItem);
            onReorder(reorderedBadges);
        }
        setDraggedIndex(null);
        dragOverIndex.current = null;
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 px-2">Customize Badges</h3>
            {badges.length > 0 ? (
                <div className="space-y-1">
                    {badges.map((badge, index) => (
                        <BadgeItem 
                            key={badge.id}
                            badge={badge}
                            onToggleVisibility={() => onToggleVisibility(badge.id)}
                            onChangeColor={(newColor) => onChangeColor(badge.id, newColor)}
                            index={index}
                            isDragging={draggedIndex === index}
                            onDragStart={handleDragStart}
                            onDragEnter={handleDragEnter}
                            onDragEnd={handleDragEnd}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 px-2">Generate a README to see badge options.</p>
            )}
        </div>
    );
};

export default BadgeManager;