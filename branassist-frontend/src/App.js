import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<DashboardComponent />} />
                    <Route path="/register" element={<RegisterComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/dashboard" element={<DashboardComponent />} />
                    <Route path="/*" element={"404"} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
