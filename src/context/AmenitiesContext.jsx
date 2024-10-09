import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments  } from "../services/FirebaseService";
export const  ContextAmenities = createContext();

export const AmenitiesContext = ({ children}) => {
    const [amenities, setAmenities] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const amenitiesData = await fetchDocuments('amenities');
           setAmenities(amenitiesData);
        };
        fetchData();
    }, []);

    return (
        <ContextAmenities.Provider value={amenities}>
            { children}
        </ContextAmenities.Provider>
    );
};
