import { useState, useEffect } from 'react';

export default function ProgressiveImage({ lowSrc, highSrc, alt, className = "" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(lowSrc);

  useEffect(() => {
    const img = new Image();
    img.src = highSrc;
    img.onload = () => {
      setCurrentSrc(highSrc);
      setIsLoaded(true);
    };
  }, [highSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`${className} transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-50 blur-sm'
      }`}
    />
  );
}