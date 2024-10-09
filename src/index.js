import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AmenitiesContext } from "./context/AmenitiesContext";
import LoginForm from "./components/LoginForm";
import Nav from "./pages/clients/Nav";
import Main from "./pages/clients/Main";
import Footer from "./pages/clients/Footer";
import ClientRoutes from "./routes/ClientRoutes";
import { RoomContext } from "./context/RoomContext";
import ModalLogin from "./pages/admin/hotels page/ModalLogin";
import Location from "./pages/admin/hotels page/Location";
import Rooms from "./pages/admin/hotels page/Rooms";
import { LocationContext } from "./context/LocationContext";
import { LoginContext } from "./context/LoginContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <LocationContext>
    <RoomContext>
      <AmenitiesContext>
       <LoginContext>
       <App />
       </LoginContext>
      </AmenitiesContext>
      </RoomContext>
    </LocationContext>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
