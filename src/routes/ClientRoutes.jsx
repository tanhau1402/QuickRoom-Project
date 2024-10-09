import React from "react";
import Main from "../pages/clients/Main";
import Detail from "../pages/clients/Detail";
import { Route, Routes } from "react-router-dom";
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
