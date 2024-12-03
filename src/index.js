import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AmenitiesContext } from "./context/AmenitiesContext";
import { RoomContext } from "./context/RoomContext";
import { LocationContext } from "./context/LocationContext";
import { LoginContext } from "./context/LoginContext";
import { TypeContext } from "./context/TypeContext";
import { HotelContext } from "./context/HotelContext";
import { CustomerLoginProvider } from "./context/CustomerLoginContext";
import SearchValueContext from "./context/SearchValueContext";
import { BookingContext } from "./context/BookingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocationContext>
        <RoomContext>
          <AmenitiesContext>
            <LoginContext>
              <TypeContext>
                <HotelContext>
                  <CustomerLoginProvider>
                    <SearchValueContext>
                    <BookingContext>
                    <App />
                    </BookingContext>
                    </SearchValueContext>
                  </CustomerLoginProvider>
                </HotelContext>
              </TypeContext>
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
