import { useState, useEffect } from 'react';

export function useEditorSettings() {
  const [fontSize, setFontSize] = useState<number>(16);
  const [accentColor, setAccentColor] = useState<string>('#ff0055');
  const [fontFamily, setFontFamily] = useState<string>("'Space Mono', monospace");
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accentColor);
    document.documentElement.style.setProperty('--font-mono', fontFamily);
    document.documentElement.setAttribute('data-theme', theme);
  }, [accentColor, fontFamily, theme]);

  return {
    fontSize,
    setFontSize,
    accentColor,
    setAccentColor,
    fontFamily,
    setFontFamily,
    theme,
    setTheme
  };
}
