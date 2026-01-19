"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FontOption {
  name: string;
  value: string;
  category: 'sans-serif' | 'serif' | 'monospace';
}

export const FONT_OPTIONS: FontOption[] = [
  { name: 'Inter', value: 'Inter', category: 'sans-serif' },
  { name: 'Urbanist', value: 'Urbanist', category: 'sans-serif' },
  { name: 'Roboto', value: 'Roboto', category: 'sans-serif' },
  { name: 'Open Sans', value: 'Open Sans', category: 'sans-serif' },
  { name: 'Lato', value: 'Lato', category: 'sans-serif' },
  { name: 'Montserrat', value: 'Montserrat', category: 'sans-serif' },
  { name: 'Poppins', value: 'Poppins', category: 'sans-serif' },
  { name: 'Playfair Display', value: 'Playfair Display', category: 'serif' },
  { name: 'Merriweather', value: 'Merriweather', category: 'serif' },
  { name: 'Lora', value: 'Lora', category: 'serif' },
  { name: 'Roboto Mono', value: 'Roboto Mono', category: 'monospace' },
  { name: 'Space Mono', value: 'Space Mono', category: 'monospace' },
];

interface FontContextType {
  headingFont: string;
  setHeadingFont: (font: string) => void;
  bodyFont: string;
  setBodyFont: (font: string) => void;
  availableFonts: FontOption[];
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to Urbanist as per plan
  const [headingFont, setHeadingFontState] = useState<string>('Urbanist');
  const [bodyFont, setBodyFontState] = useState<string>('Urbanist');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedHeading = localStorage.getItem('headingFont');
    const storedBody = localStorage.getItem('bodyFont');
    
    if (storedHeading) setHeadingFontState(storedHeading);
    if (storedBody) setBodyFontState(storedBody);
    
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Load fonts from Google Fonts
    // Exclude Urbanist since it's loaded via next/font (locally)
    const fontsToLoad = new Set<string>();
    if (headingFont !== 'Urbanist') fontsToLoad.add(headingFont);
    if (bodyFont !== 'Urbanist') fontsToLoad.add(bodyFont);
    
    const fontFamilies = Array.from(fontsToLoad).map(font => font.replace(/ /g, '+'));
    
    if (fontFamilies.length > 0) {
      // Create link for Google Fonts
      const linkId = 'dynamic-google-fonts';
      let link = document.getElementById(linkId) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }

      // Request weights 400, 500, 600, 700 to cover most use cases
      const query = fontFamilies.map(f => `family=${f}:wght@400;500;600;700`).join('&');
      link.href = `https://fonts.googleapis.com/css2?${query}&display=swap`;
    }

    // Set CSS variables
    const root = document.documentElement;
    
    if (headingFont === 'Urbanist') {
      root.style.setProperty('--font-heading', 'var(--font-urbanist)');
    } else {
      root.style.setProperty('--font-heading', `"${headingFont}", sans-serif`);
    }

    if (bodyFont === 'Urbanist') {
      root.style.setProperty('--font-body', 'var(--font-urbanist)');
    } else {
      root.style.setProperty('--font-body', `"${bodyFont}", sans-serif`);
    }

    // Persist
    localStorage.setItem('headingFont', headingFont);
    localStorage.setItem('bodyFont', bodyFont);

  }, [headingFont, bodyFont, mounted]);

  const setHeadingFont = (font: string) => setHeadingFontState(font);
  const setBodyFont = (font: string) => setBodyFontState(font);

  return (
    <FontContext.Provider value={{
      headingFont,
      setHeadingFont,
      bodyFont,
      setBodyFont,
      availableFonts: FONT_OPTIONS
    }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
