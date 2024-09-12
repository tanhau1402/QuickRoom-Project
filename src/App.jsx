import logo from './logo.svg';
import './App.css';
import AdminDashboard from './pages/admin/AdminDashboard';
import { BrowserRouter } from 'react-router-dom';
import { AmenitiesContext } from './context/AmenitiesContext';
import Client from './pages/admin/user page/Client';

function App() {
  return (
    <BrowserRouter>
    <AmenitiesContext>
    <Client></Client>
    </AmenitiesContext>
    </BrowserRouter>      
  );
}

export default App;
