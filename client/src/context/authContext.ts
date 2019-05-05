import React from 'react';

interface ContextProps {
  token: string | null;
  userId: string | null;
  login: (token: string, userId: string, tokenExpiration: number) => void;
  logout: () => void;
}

export default React.createContext<ContextProps>({
  token: null,
  userId: null,
  login: (token: string, userId: string, tokenExpiration: number) => {},
  logout: () => {}
});
