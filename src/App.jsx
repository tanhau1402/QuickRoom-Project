import logo from "./logo.svg";
import "./App.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientRoutes from "./routes/ClientRoutes";
import Home from "./pages/clients/Home";

function App() {
  return (
    <>
      <AdminDashboard></AdminDashboard>
      {/* <Home/> */}
    </>
  );
}

export default App;
