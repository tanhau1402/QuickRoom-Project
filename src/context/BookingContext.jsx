import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments  } from "../services/FirebaseService";
export const  ContextBooking = createContext();

export const BookingContext = ({ children}) => { 
    const [booking, setBooking] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const bookingData = await fetchDocuments('listBooking');
           setBooking(bookingData);
        };
        fetchData();
    }, []);
    
    return (
        <ContextBooking.Provider value={booking}>
            { children}
        </ContextBooking.Provider>
    );
};

