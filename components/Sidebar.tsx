import React, { useState, useRef } from 'react';
import { Section, Badge } from '../services/geminiService';
import SectionItem from './SectionItem';
import BadgeManager from './BadgeManager';
import PlusIcon from './icons/PlusIcon';

interface SidebarProps {
  sections: Section[];
  onToggleVisibility: (sectionId: string) => void;
  onRegenerate: (sectionId: string) => void;
  onReorder: (reorderedSections: Section[]) => void;
  regeneratingSectionId: string | null;
  badges: Badge[];
  onToggleBadgeVisibility: (badgeId: string) => void;
  onChangeBadgeColor: (badgeId: string, newColor: string) => void;
  onReorderBadges: (reorderedBadges: Badge[]) => void;
  onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  sections, 
  onToggleVisibility, 
  onRegenerate, 
  onReorder,
  regeneratingSectionId,
  badges,
  onToggleBadgeVisibility,
  onChangeBadgeColor,
  onReorderBadges,
  onReset,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);
  const [activeTab, setActiveTab] = useState<'sections' | 'badges'>('sections');

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    dragOverIndex.current = index;
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex.current !== null && draggedIndex !== dragOverIndex.current) {
      const reorderedSections = [...sections];
      const [draggedItem] = reorderedSections.splice(draggedIndex, 1);
      reorderedSections.splice(dragOverIndex.current, 0, draggedItem);
      onReorder(reorderedSections);
    }
    setDraggedIndex(null);
    dragOverIndex.current = null;
  };

  const tabButtonClasses = (isActive: boolean) => 
    `w-1/2 py-2 text-sm font-semibold border-b-2 transition-colors focus:outline-none ${
      isActive
        ? 'border-gray-700 text-gray-800 dark:border-violet-400 dark:text-gray-100'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-neutral-700'
    }`;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800">
      <div className="p-4 border-b border-gray-200 dark:border-neutral-800">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center px-4 py-2.5 font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-violet-600 dark:text-white dark:hover:bg-violet-500 transition-all duration-200"
        >
          Create New README
        </button>
      </div>
      <div className="flex border-b border-gray-200 dark:border-neutral-800">
          <button onClick={() => setActiveTab('sections')} className={tabButtonClasses(activeTab === 'sections')}>
              Sections
          </button>
          <button onClick={() => setActiveTab('badges')} className={tabButtonClasses(activeTab === 'badges')}>
              Badges
          </button>
      </div>
      <div className="p-4">
        {activeTab === 'sections' ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 px-2">Customize Sections</h3>
              <div className="space-y-1">
                {sections.map((section, index) => (
                  <SectionItem
                    key={section.id}
                    section={section}
                    isRegenerating={regeneratingSectionId === section.id}
                    onToggleVisibility={() => onToggleVisibility(section.id)}
                    onRegenerate={() => onRegenerate(section.id)}
                    index={index}
                    isDragging={draggedIndex === index}
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            </div>
        ) : (
            <BadgeManager 
                badges={badges}
                onToggleVisibility={onToggleBadgeVisibility}
                onChangeColor={onChangeBadgeColor}
                onReorder={onReorderBadges}
            />
        )}
      </div>
    </div>
  );
};

export default Sidebar;