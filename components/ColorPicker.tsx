import React from 'react';

interface ColorPickerProps {
    currentColor: string; // Hex without '#'
    onChangeColor: (newColor: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ currentColor, onChangeColor }) => {
    return (
        <div className="relative w-6 h-6" title="Change badge color">
            {/* Visual representation of the color swatch */}
            <div
                className="w-full h-full rounded-full border-2 border-white dark:border-neutral-900 shadow-sm ring-1 ring-gray-300 dark:ring-gray-700 pointer-events-none"
                style={{ backgroundColor: `#${currentColor}` }}
            />
            {/* The actual color input, invisible but interactive */}
            <input
                type="color"
                value={`#${currentColor}`}
                // The native color picker's onChange provides the hex value with a '#' prefix.
                // The app's state management handles stripping it, so we pass the value directly.
                onChange={(e) => onChangeColor(e.target.value)}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Change badge color"
            />
        </div>
    );
};

export default ColorPicker;