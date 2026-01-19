"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { 
  atomDark, 
  cb, 
  coy, 
  darcula, 
  dark, 
  dracula, 
  duotoneDark, 
  duotoneLight, 
  funky, 
  ghcolors, 
  hopscotch, 
  okaidia, 
  oneDark, 
  oneLight, 
  solarizedlight, 
  tomorrow, 
  twilight, 
  vscDarkPlus, 
  xonokai 
} from 'react-syntax-highlighter/dist/esm/styles/prism';

type Theme = 'light' | 'dark';

export const SYNTAX_THEMES = {
  'Atom Dark': atomDark,
  'CB': cb,
  'Coy': coy,
  'Darcula': darcula,
  'Dark': dark,
  'Dracula': dracula,
  'Duotone Dark': duotoneDark,
  'Duotone Light': duotoneLight,
  'Funky': funky,
  'GitHub': ghcolors,
  'Hopscotch': hopscotch,
  'Okaidia': okaidia,
  'One Dark': oneDark,
  'One Light': oneLight,
  'Solarized Light': solarizedlight,
  'Tomorrow': tomorrow,
  'Twilight': twilight,
  'VS Code Dark+': vscDarkPlus,
  'Xonokai': xonokai,
} as const;

export type SyntaxThemeName = keyof typeof SYNTAX_THEMES;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  syntaxTheme: SyntaxThemeName;
  setSyntaxTheme: (theme: SyntaxThemeName) => void;
  syntaxThemeStyle: any;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
  baseFontSize: number;
  setBaseFontSize: (size: number) => void;
  // Advanced Theme Props
  lightBackground: string;
  setLightBackground: (color: string) => void;
  lightForeground: string;
  setLightForeground: (color: string) => void;
  darkBackground: string;
  setDarkBackground: (color: string) => void;
  darkForeground: string;
  setDarkForeground: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [syntaxTheme, setSyntaxThemeState] = useState<SyntaxThemeName>('One Dark');
  
  // New customization state with defaults matching main.css
  const [primaryColor, setPrimaryColorState] = useState<string>('#2563eb');
  const [borderRadius, setBorderRadiusState] = useState<number>(0.3);
  const [baseFontSize, setBaseFontSizeState] = useState<number>(16);

  // Advanced Theming Defaults
  const [lightBackground, setLightBackground] = useState<string>('#ffffff');
  const [lightForeground, setLightForeground] = useState<string>('#111827');
  const [darkBackground, setDarkBackground] = useState<string>('#030712');
  const [darkForeground, setDarkForeground] = useState<string>('#f9fafb');
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Check local storage for main theme
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      // 2. Check system preference
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setThemeState(systemPreference);
    }

    // Check local storage for syntax theme
    const storedSyntaxTheme = localStorage.getItem('syntaxTheme') as SyntaxThemeName | null;
    if (storedSyntaxTheme && SYNTAX_THEMES[storedSyntaxTheme]) {
      setSyntaxThemeState(storedSyntaxTheme);
    }

    // Restore custom theme settings
    const storedPrimary = localStorage.getItem('primaryColor');
    if (storedPrimary) setPrimaryColorState(storedPrimary);

    const storedRadius = localStorage.getItem('borderRadius');
    if (storedRadius) setBorderRadiusState(parseFloat(storedRadius));

    const storedFontSize = localStorage.getItem('baseFontSize');
    if (storedFontSize) setBaseFontSizeState(parseFloat(storedFontSize));

    // Restore Advanced Defaults
    const sLightBg = localStorage.getItem('lightBackground');
    if (sLightBg) setLightBackground(sLightBg);
    const sLightFg = localStorage.getItem('lightForeground');
    if (sLightFg) setLightForeground(sLightFg);
    const sDarkBg = localStorage.getItem('darkBackground');
    if (sDarkBg) setDarkBackground(sDarkBg);
    const sDarkFg = localStorage.getItem('darkForeground');
    if (sDarkFg) setDarkForeground(sDarkFg);

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Effect to apply custom theme variables
  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    
    // Set CSS variables
    root.style.setProperty('--primary', primaryColor);
    root.style.setProperty('--radius', `${borderRadius}rem`);
    
    // To properly scale the entire UI (which uses rems), we must set the root font-size.
    // Default browser font-size is 16px.
    root.style.fontSize = `${baseFontSize}px`;

    // Advanced overrides based on current theme
    if (theme === 'light') {
       root.style.setProperty('--background', lightBackground);
       root.style.setProperty('--foreground', lightForeground);
    } else {
       root.style.setProperty('--background', darkBackground);
       root.style.setProperty('--foreground', darkForeground);
    }

    // Persist
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('borderRadius', borderRadius.toString());
    localStorage.setItem('baseFontSize', baseFontSize.toString());

    // Persist Advanced
    localStorage.setItem('lightBackground', lightBackground);
    localStorage.setItem('lightForeground', lightForeground);
    localStorage.setItem('darkBackground', darkBackground);
    localStorage.setItem('darkForeground', darkForeground);
    
  }, [
    primaryColor, 
    borderRadius, 
    baseFontSize, 
    mounted, 
    theme, 
    lightBackground, 
    lightForeground, 
    darkBackground, 
    darkForeground
  ]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setSyntaxTheme = (newTheme: SyntaxThemeName) => {
    setSyntaxThemeState(newTheme);
    localStorage.setItem('syntaxTheme', newTheme);
  };

  const setPrimaryColor = (color: string) => {
    setPrimaryColorState(color);
  };

  const setBorderRadius = (radius: number) => {
    setBorderRadiusState(radius);
  };

  const setBaseFontSize = (size: number) => {
    setBaseFontSizeState(size);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      setTheme, 
      syntaxTheme, 
      setSyntaxTheme,
      syntaxThemeStyle: SYNTAX_THEMES[syntaxTheme],
      primaryColor,
      setPrimaryColor,
      borderRadius,
      setBorderRadius,
      baseFontSize,
      setBaseFontSize,
      lightBackground, setLightBackground,
      lightForeground, setLightForeground,
      darkBackground, setDarkBackground,
      darkForeground, setDarkForeground
    }}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
