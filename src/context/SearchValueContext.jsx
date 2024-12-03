import React, { createContext, useState } from "react";
export const ContextSearchValue = createContext();
export const SearchValueContext = ({ children }) => {

  const [inputValue, setInputValue] = useState({});

  return (

    <ContextSearchValue.Provider value={{ inputValue, setInputValue }}>
      {children}
    </ContextSearchValue.Provider>
  );
};

export default SearchValueContext;
