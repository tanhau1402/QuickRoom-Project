import logo from "./logo.svg";
import "./App.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { BrowserRouter } from "react-router-dom";
import { AmenitiesContext } from "./context/AmenitiesContext";
import LoginForm from "./components/LoginForm";
import Nav from "./pages/clients/Nav";
import Main from "./pages/clients/Main";
import Footer from "./pages/clients/Footer";

function App() {
  return (
    <BrowserRouter>
      <AmenitiesContext>
        <AdminDashboard></AdminDashboard>
        {/* <LoginForm></LoginForm> */}
        {/* <Nav></Nav>
        <Main></Main>
        <Footer></Footer> */}
      </AmenitiesContext>
    </BrowserRouter>
  );
}

export default App;
