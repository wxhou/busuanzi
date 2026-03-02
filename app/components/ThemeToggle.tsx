'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-md bg-[#f0ede8] dark:bg-[#1f1f1f] hover:bg-[#e5e0d8] dark:hover:bg-[#2a2a2a] transition-colors border border-[#e0dbd2] dark:border-[#333]"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 text-[#666]" />
      ) : (
        <Sun className="w-4 h-4 text-[#c9a959]" />
      )}
    </button>
  );
}
