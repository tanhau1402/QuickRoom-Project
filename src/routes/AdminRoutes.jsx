import React from 'react';
import Hotels from '../pages/admin/Hotels';
import DashBoard from "../pages/admin/DashBoard"
import Info from '../pages/admin/Info';
import Users from '../pages/admin/user page/Users';
import Reviews from '../pages/admin/user page/Reviews';
import RoomsImages from '../pages/admin/hotels page/RoomsImages';
import Rooms from '../pages/admin/hotels page/Rooms';
import Amenities from '../pages/admin/hotels page/Amenities';
import Bookings from '../pages/admin/booking page/Bookings';
import Payments from '../pages/admin/booking page/Payments';
import { Route, Routes } from 'react-router-dom';

function AdminRoutes(props) {
     
   const routes = [
      {
        id : 1,
        path : "/",
        page : DashBoard
      },
      {
        id : 2,
        path : "/hotels",
        page : Hotels
      },
      {
        id : 3,
        path : "/infos",
        page : Info
      },
      {
        id : 4,
        path : "/users",
        page : Users
      },
      {
        id : 5,
        path : "/reviews",
        page : Reviews
      },
      {
        id : 6,
        path : "/roomsimages",
        page : RoomsImages
      },
      {
        id : 7,
        path : "/rooms",
        page : Rooms
      },
      {
        id : 8,
        path : "/amenities",
        page : Amenities
      },
      {
        id : 9,
        path : "/bookings",
        page : Bookings
      },
      {
        id : 10,
        path : "/payments",
        page : Payments
      },


   ]
    return (
       <Routes>
        {
            routes.map(a => (
                <Route path={a.path} element={<a.page/>}/>
            ))
        }
       </Routes>
    );
}

export default AdminRoutes;