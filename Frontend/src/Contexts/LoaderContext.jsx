/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const LoadContext = createContext();

export const LoadProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoadContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadContext.Provider>
  );
};