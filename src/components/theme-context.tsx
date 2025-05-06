"use client"
import { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';


export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

function getLocalStoredTheme():Theme {
  let storedTheme:Theme = 'light';
  if (typeof window !== 'undefined') {
      storedTheme = localStorage.getItem('color-theme') as Theme;
  }
  return storedTheme??'light';
}


const ThemeContext = createContext<ThemeContextType>({
  theme: getLocalStoredTheme(),
  setTheme: () => {},
});

export const ThemeProvider = ({ children,storedTheme}:{ children: React.ReactNode,storedTheme:string}) => {
 
  const [theme, setTheme] = useState<Theme>(storedTheme as Theme);

  useEffect(() => {
    const storedTheme = getLocalStoredTheme();
    setTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;