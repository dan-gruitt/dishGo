import React, { createContext, useState } from 'react';

export const CurrentPageContext = createContext();

export const CurrentPageProvider = ({children}) => {
    const [CurrentPage, setCurrentPage] = useState("");

  return (
    <CurrentPageContext.Provider value={{ CurrentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
};
