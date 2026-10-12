import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LogoConfig {
  logoType: 'default' | 'image' | 'svg';
  logoSrc: string; // url or data URL
  customSvgCode: string; // raw svg code
  logoScale: number; // percentage (70 to 150)
  autoInvertOnDark: boolean; // whether to invert to white on dark background
}

const DEFAULT_LOGO_CONFIG: LogoConfig = {
  logoType: 'default',
  logoSrc: '/sumi-logo.svg',
  customSvgCode: '',
  logoScale: 100,
  autoInvertOnDark: true,
};

const STORAGE_KEY = 'sumi_custom_logo_v1';

interface LogoContextType {
  config: LogoConfig;
  isEditorOpen: boolean;
  openEditor: () => void;
  closeEditor: () => void;
  saveConfig: (newConfig: Partial<LogoConfig>) => void;
  resetConfig: () => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<LogoConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return { ...DEFAULT_LOGO_CONFIG, ...JSON.parse(saved) };
        }
      } catch (err) {
        console.error('Failed to parse saved logo config:', err);
      }
    }
    return DEFAULT_LOGO_CONFIG;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (err) {
      console.error('Failed to persist logo config:', err);
    }
  }, [config]);

  const openEditor = () => setIsEditorOpen(true);
  const closeEditor = () => setIsEditorOpen(false);

  const saveConfig = (newConfig: Partial<LogoConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...newConfig,
    }));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_LOGO_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LogoContext.Provider
      value={{
        config,
        isEditorOpen,
        openEditor,
        closeEditor,
        saveConfig,
        resetConfig,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => {
  const ctx = useContext(LogoContext);
  if (!ctx) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return ctx;
};
