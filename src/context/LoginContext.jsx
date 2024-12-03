import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";
export const ContextLogin = createContext();

export const LoginContext = ({ children }) => {
    const [login, setLogin] = useState([]);
    useEffect(() => {
      // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
      const unsubscribe = fetchDocumentsRealtime("Customers", (categoriesList) => {
        setLogin(categoriesList);
      });
  
      // Hủy lắng nghe khi component bị unmount
      return () => unsubscribe();
    }, []);
    return (
      <ContextLogin.Provider value={login}>
        {children}
      </ContextLogin.Provider>
    );
  };