import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface CatAnimationProps {
  animationUrl: string;
  className?: string;
  loop?: boolean;
}

const CatAnimation: React.FC<CatAnimationProps> = ({ animationUrl, className, loop = true }) => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(animationUrl)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error fetching animation:', error));
  }, [animationUrl]);

  if (!animationData) {
    return <div className={className} />; // Return a placeholder to prevent layout shifts
  }

  return (
    <Lottie 
      animationData={animationData}
      loop={loop}
      className={className}
    />
  );
};

export default CatAnimation;
