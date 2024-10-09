import React, { createContext, useState, useEffect } from "react";
import { fetchDocuments } from "../services/FirebaseService";
export const ContextLocation = createContext();

export const LocationContext = ({ children }) => {
  const [location, setLocations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const locationsData = await fetchDocuments("listLocations");
      setLocations(locationsData);
    };
    fetchData();
  }, []);

  return (
    <ContextLocation.Provider value={location}>
      {children}
    </ContextLocation.Provider>
  );
};
