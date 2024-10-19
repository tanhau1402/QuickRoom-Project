import React from "react";
import Main from "../pages/clients/Main";
import Detail from "../pages/clients/Detail";
import { Route, Routes } from "react-router-dom";
import BookingPage from "../pages/clients/BookingPage";
import RoomInfo from "../pages/clients/RoomInfo";
function ClientRoutes(props) {

  const routes = [
    {
      id: 1,
      path: "/",
      page: Main,
    },
    {
      id: 2,
      path: "/detail/:id",
      page: Detail,
    },
    {
      id:3,
      path: "/bookingpage",
      page:BookingPage
    },
    {
      id: 4,
      path : "/roominfo/:id",
      page : RoomInfo
    }
  ];

  return (
     <Routes>
      {routes.map((a) => (
        <Route path={a.path} element={<a.page />} />
      ))}
    </Routes>
  );
}

export default ClientRoutes;
