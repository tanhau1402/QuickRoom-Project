import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments } from "../services/FirebaseService";
export const ContextHotel = createContext();

export const HotelContext = ({ children }) => {
    const [hotel, setListHotel] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const hotelData = await fetchDocuments('listHotels');
            setListHotel(hotelData);
        };
        fetchData();
    }, []);

    return (
        <ContextHotel.Provider value={hotel}>
            {children}
        </ContextHotel.Provider>
    );
};