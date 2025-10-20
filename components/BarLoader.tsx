import React from 'react';

const BarLoader: React.FC = () => {
  return (
    <div className="bar-loader" aria-label="Loading animation" role="status">
      <div className="bar-loader-bar"></div>
      <div className="bar-loader-bar"></div>
      <div className="bar-loader-bar"></div>
      <div className="bar-loader-bar"></div>
      <div className="bar-loader-bar"></div>
    </div>
  );
};

export default BarLoader;