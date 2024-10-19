import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments } from "../services/FirebaseService";
export const ContextTypeBusiness = createContext();

export const TypeContext = ({ children }) => {
    const [types, setType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const typeData = await fetchDocuments('listTypeBusiness');
            setType(typeData);
        };
        fetchData();
    }, []);

    return (
        <ContextTypeBusiness.Provider value={types}>
            {children}
        </ContextTypeBusiness.Provider>
    );
};
