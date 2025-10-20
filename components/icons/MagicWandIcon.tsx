import React from 'react';

const MagicWandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M8 20L4 12L8 4" />
        <path d="M16 4L20 12L16 20" />
        <path d="M15 5L9 19" />
    </svg>
);

export default MagicWandIcon;