import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments  } from "../services/FirebaseService";
export const  ContextRooms = createContext();

export const RoomContext = ({ children}) => {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const roomData = await fetchDocuments('listRooms');
           setRooms(roomData);
        };
        fetchData();
    }, []);

    return (
        <ContextRooms.Provider value={rooms}>
            { children}
        </ContextRooms.Provider>
    );
};