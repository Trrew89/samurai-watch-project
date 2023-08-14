'use client';
import { createContext, useState } from 'react';

const Tokens = createContext();
export default Tokens;
export function Providers({ children }) {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  let image='';
  return (
    <>
      <Tokens.Provider value={{accessToken, setAccessToken, refreshToken, setRefreshToken, image}}>
        {children}
      </Tokens.Provider>
    </>
  );
}