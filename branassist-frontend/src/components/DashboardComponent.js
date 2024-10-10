import React, { useState } from 'react';
import Navbar from './Navbar';
import ChatBot from './ChatBot';
import NextAppointmentsCard from './NextAppointmentsCard';
import CalendarViewCard from './CalendarViewCard';

const DashboardComponent = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div>
            <Navbar/>

            <div className="container mt-5" style={{paddingTop: '100px'}}>
                <h2>Dashboard</h2>
                <p>Welcome to the dashboard!</p>
                <div style={{display: 'flex', gap: '20px'}}>
                    <NextAppointmentsCard/>
                    <CalendarViewCard/>
                </div>
            </div>

            <div
                className="rounded-circle"
                onClick={toggleChat}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#007bff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderRadius: '50%',
                }}
            >
                <img
                    src="https://via.placeholder.com/60"
                    alt="Brandon"
                    className="rounded-circle"
                    style={{width: '100%', height: '100%'}}
                />
            </div>

            {isChatOpen && <ChatBot onClose={toggleChat}/>}
        </div>
    );
};

export default DashboardComponent;
