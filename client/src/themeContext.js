import React, { createContext, useState } from 'react';

// Define the themes
export const themes = {
    light: 'light',
    dark: 'dark',
};

// Create the theme context
export const ThemeContext = createContext();

// Create the theme provider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);

  // Function to toggle the theme
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light));
    };

  // Provide the theme context value to its children
    const themeContextValue = {
        theme,
        toggleTheme,
    };

    return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};
