import React from 'react';

const CatPawIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    {...props}
  >
    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-48 64c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96zm144-64c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96zm144-64c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96z"/>
  </svg>
);

export default CatPawIcon;
