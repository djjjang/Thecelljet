import React from 'react';
import { useLogo } from '../context/LogoContext';

interface SumiLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  onClick?: () => void;
  title?: string;
}

export const SumiLogo: React.FC<SumiLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'dark',
  onClick,
  title = 'SUMI BEAUTY 공식 로고',
}) => {
  const { config, openEditor } = useLogo();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    } else {
      // Default: clicking the logo lets the user edit it if desired
      openEditor();
    }
  };

  const scaleStyle: React.CSSProperties = {
    transform: config.logoScale !== 100 ? `scale(${config.logoScale / 100})` : undefined,
    transformOrigin: 'left center',
  };

  // Dark background inversion
  const isDarkVariant = variant === 'light'; // variant === 'light' means it is displayed on a dark background
  const invertClass = isDarkVariant && config.autoInvertOnDark ? 'brightness-0 invert' : '';

  if (config.logoType === 'svg' && config.customSvgCode) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent);
          }
        }}
        title="클릭하여 로고 직접 수정"
        style={scaleStyle}
        className={`${className} inline-flex items-center cursor-pointer transition-transform hover:opacity-90 ${invertClass}`}
        dangerouslySetInnerHTML={{ __html: config.customSvgCode }}
      />
    );
  }

  return (
    <img
      src={config.logoSrc || '/sumi-logo.svg'}
      alt="SUMI BEAUTY"
      title={title || '클릭하여 로고 직접 수정'}
      onClick={handleClick}
      style={scaleStyle}
      className={`${className} object-contain cursor-pointer transition-all hover:opacity-90 ${invertClass}`}
      loading="eager"
    />
  );
};
