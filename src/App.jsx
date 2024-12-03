import logo from "./logo.svg";
import "./App.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientRoutes from "./routes/ClientRoutes";
import Home from "./pages/clients/Home";
import {CustomerLoginContext} from "./context/CustomerLoginContext";
import { useContext,useState } from "react";
function App() {
  const { isLogin } = useContext(CustomerLoginContext);
  return ( 
    <>
      {isLogin?.role =="admin" || isLogin?.role == "moderator" ? 
      <AdminDashboard></AdminDashboard> : <Home ></Home>}
    </>
  );
}

export default App;
