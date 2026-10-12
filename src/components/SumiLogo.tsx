import React from 'react';
import { useLogo } from '../context/LogoContext';
import { useAdminEdit } from '../context/AdminEditContext';

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
  const { isEditMode } = useAdminEdit();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    } else if (isEditMode) {
      // Only in edit mode: clicking the logo opens editor
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

  const isClickable = Boolean(onClick || isEditMode);
  const effectiveTitle = isEditMode ? '클릭하여 로고 직접 수정 (작업자 모드)' : title;

  if (config.logoType === 'svg' && config.customSvgCode) {
    return (
      <div
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent);
          }
        }}
        title={effectiveTitle}
        style={scaleStyle}
        className={`${className} inline-flex items-center transition-transform hover:opacity-95 ${
          isClickable ? 'cursor-pointer hover:opacity-90' : ''
        } ${invertClass}`}
        dangerouslySetInnerHTML={{ __html: config.customSvgCode }}
      />
    );
  }

  return (
    <img
      src={config.logoSrc || '/sumi-logo.svg'}
      alt="SUMI BEAUTY"
      title={effectiveTitle}
      onClick={isClickable ? handleClick : undefined}
      style={scaleStyle}
      className={`${className} object-contain transition-all hover:opacity-95 ${
        isClickable ? 'cursor-pointer hover:opacity-90' : ''
      } ${invertClass}`}
      loading="eager"
    />
  );
};
