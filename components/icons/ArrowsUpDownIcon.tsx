import React from 'react';

const ArrowsUpDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 20V4m0 0L3 8m4-4l4 4"></path>
        <path d="M17 4v16m0 0l4-4m-4 4l-4-4"></path>
    </svg>
);

export default ArrowsUpDownIcon;
