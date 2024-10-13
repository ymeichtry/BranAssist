import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar'
import Profile from "./pages/Profile";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/*" element={"404"} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
