import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import AllUsers from './Components/Users/AllUsers';
import NewUserForm from './Components/Users/NewUserForm';
import Navbar from './Components/General/Navbar/Navbar';
import HomePage from './Components/Homepage/HomePage';
import Login from './Components/Users/Login';
import ProfilePage from './Components/Users/ProfilePage';

function App() {
    return (
        <Router>
            <div className="App">
            <Navbar />
                <Routes> 
                    <Route path="/" element={<HomePage />} /> 
                    <Route path="/user/all" element={<AllUsers />} /> 
                    <Route path="/user/new" element={<NewUserForm />} /> 
                    <Route path="/user/login" element={<Login />} />
                    <Route path="/user/profile" element={<ProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
