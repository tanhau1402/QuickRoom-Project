import React, { createContext, useEffect, useState } from "react";
export const CustomerLoginContext = createContext();
export const CustomerLoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem("customerLogin", JSON.stringify(isLogin));
    } else {
      const loggedInStatus = localStorage.getItem("customerLogin");  
        setIsLogin(JSON.parse(loggedInStatus));
    }
  }, [isLogin]);

  return (
    <CustomerLoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </CustomerLoginContext.Provider>
  );
};

export default CustomerLoginContext;
