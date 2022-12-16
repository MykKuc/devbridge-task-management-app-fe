import React, { useState } from 'react';

interface ILoginContext {
  dark: boolean;
  toggleDark?: (darkState: boolean) => void;
}
const defaultState = {
  dark: false,
};
type Props = {
  children?: JSX.Element;
};
const LoginContext = React.createContext<ILoginContext>(defaultState);

// ...

export const LoginProvider = ({ children }: Props) => {
  const [dark, setDark] = useState(defaultState.dark);

  const toggleDark = (darkState: boolean) => {
    setDark(darkState);
  };

  return (
    <LoginContext.Provider
      value={{
        dark,
        toggleDark,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
