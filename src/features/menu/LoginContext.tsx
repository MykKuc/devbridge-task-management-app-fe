import React, { useState, useEffect, createContext, FC, ReactNode, PropsWithChildren } from 'react';

interface IThemeContext {
  dark: boolean;
  toggleDark?: (darkState: boolean) => void;
}
const defaultState = {
  dark: false,
};
type Props = {
  children?: JSX.Element;
};
const ThemeContext = React.createContext<IThemeContext>(defaultState);

// ...

export const ThemeProvider = ({ children }: Props) => {
  const [dark, setDark] = useState(defaultState.dark);

  const toggleDark = (darkState: boolean) => {
    setDark(darkState);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggleDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
