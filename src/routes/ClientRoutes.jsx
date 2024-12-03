import React from "react";
import Main from "../pages/clients/Main";
import Detail from "../pages/clients/Detail";
import { Route, Routes } from "react-router-dom";
import BookingPage from "../pages/clients/BookingPage";
import RoomInfo from "../pages/clients/RoomInfo";
import ListRoom from "../pages/clients/ListRoom";
import Account from "../pages/clients/Account";
import ListCustomerBooking from "../pages/clients/ListCustomerBooking";
import ListUserBooking from "../pages/clients/ListUserBooking";
import Information from "../pages/clients/Information";
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
    },
    {
      id: 5,
      path : "/listroom",
      page : ListRoom
    },
    {
      id: 6,
      path : "/account",
      page : Account
    },
    {
      id: 7,
      path : "/account/listcustomerbooking",
      page : ListCustomerBooking
    },
    ,
    {
      id: 8,
      path : "/account/listuserbooking",
      page : ListUserBooking
    },
    {
      id: 9,
      path : "/account/information",
      page : Information
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
