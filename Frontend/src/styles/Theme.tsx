import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext({
  toggleTheme: () => {},
  theme: {
    "bg-layer-1": "#ffffff",
    "bg-layer-2": "#f9f9f9",
    "bg-layer-3": "#f0f0f0",
    "bg-color": "#ffffff",
    "layer-1":"bg-black-10",
    "layer-2":"bg-black-80",
    "layer-3":"bg-black-90",
    "highlight":"#16FF00",
    "text-color": "#000000",
    "border-color": "#cccccc",
    "hover-color": "#e0e0e0",
    "button-color": "#dddddd",
    "button-text-color": "#000000",
    "input-bg-color": "#ffffff",
    "input-text-color": "#000000",
    "input-border-color": "#cccccc",
    "input-hover-color": "#e0e0e0",
    "input-placeholder-color": "#888888",
    "card-bg-color": "#ffffff",
    "card-text-color": "#000000",
    "card-border-color": "#cccccc",
    "card-hover-color": "#e0e0e0",
    "card-button-color": "#dddddd",
    "card-button-text-color": "#000000",
    "priority-high": "#ff4d4f",
    "priority-medium": "#faad14",
    "priority-low": "#52c41a",
    "status-completed": "#1890ff",
    "status-open": "#13c2c2",
    "status-in-progress": "#722ed1",
    "timer-bg": "#f0f5ff",
    "timer-text": "#000000",
  },
});

// Theme provider component
export const ThemeProvider = ({ children }:{children:React.ReactNode}) => {
  // Check for saved theme preference or use system preference
  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  };

  const [theme, setTheme] = useState(getSavedTheme);

  // Define light and dark themes
  const themeValue = theme === 'dark' ? {
    "bg-layer-1": "#121212",
    "bg-layer-2": "#1e1e1e",
    "bg-layer-3": "#2a2a2a",
    "bg-color": "#1a1a1a",
    "layer-1":"bg-black-10",
    "layer-2":"bg-black-80",
    "layer-3":"bg-black-90",
    "highlight":"#16FF00",

    "text-color": "#ffffff",
    "border-color": "#333333",
    "hover-color": "#444444",
    "button-color": "#555555",
    "button-text-color": "#ffffff",
    "input-bg-color": "#222222",
    "input-text-color": "#ffffff",
    "input-border-color": "#444444",
    "input-hover-color": "#555555",
    "input-placeholder-color": "#aaaaaa",
    "card-bg-color": "#333333",
    "card-text-color": "#ffffff",
    "card-border-color": "#444444",
    "card-hover-color": "#555555",
    "card-button-color": "#666666",
    "card-button-text-color": "#ffffff",
    "priority-high": "#ff7875",
    "priority-medium": "#ffc069",
    "priority-low": "#95de64",
    "status-completed": "#69c0ff",
    "status-open": "#36cfc9",
    "status-in-progress": "#9254de",
    "timer-bg": "#1f1f1f",
    "timer-text": "#ffffff",
  } : {
    "bg-layer-1": "#ffffff",
    "bg-layer-2": "#f9f9f9",
    "bg-layer-3": "#f0f0f0",
    "bg-color": "#f0f0f0",
    "highlight":"#16FF00",

    "layer-1":"bg-black-10",
    "layer-2":"bg-black-80",
    "layer-3":"bg-black-90",
    "text-color": "#000000",
    "border-color": "#cccccc",
    "hover-color": "#e0e0e0",
    "button-color": "#1890ff",
    "button-text-color": "#ffffff",
    "input-bg-color": "#ffffff",
    "input-text-color": "#000000",
    "input-border-color": "#cccccc",
    "input-hover-color": "#e6f7ff",
    "input-placeholder-color": "#888888",
    "card-bg-color": "#ffffff",
    "card-text-color": "#000000",
    "card-border-color": "#cccccc",
    "card-hover-color": "#e6f7ff",
    "card-button-color": "#40a9ff",
    "card-button-text-color": "#ffffff",
    "priority-high": "#ff4d4f",
    "priority-medium": "#faad14",
    "priority-low": "#52c41a",
    "status-completed": "#1890ff",
    "status-open": "#13c2c2",
    "status-in-progress": "#722ed1",
    "timer-bg": "#f0f5ff",
    "timer-text": "#000000",
  };

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Apply theme to body element
  useEffect(() => {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: themeValue, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);