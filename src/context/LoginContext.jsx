import React, { createContext, useState, useEffect } from "react";
import { fetchDocuments } from "../services/FirebaseService";

export const ContextLogin = createContext();

export const LoginContext = ({ children }) => {
    const [login, setLogin] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const loginsData = await fetchDocuments("Customers");
        setLogin(loginsData);
      };
      fetchData();
    }, []);
  
    return (
      <ContextLogin.Provider value={login}>
        {children}
      </ContextLogin.Provider>
    );
  };