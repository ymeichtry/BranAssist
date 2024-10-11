import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ChatBot from '../components/ChatBot';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [view, setView] = useState('week'); // 'week' or 'month'
    const [currentDate, setCurrentDate] = useState(new Date());
    const [chatOpen, setChatOpen] = useState(false); // Zustand für Chatbot-Öffnung

    const events = [
        {
            title: 'Client Meeting',
            start: new Date(2024, 9, 13, 14, 0),
            end: new Date(2024, 9, 13, 15, 0),
        },
        {
            title: 'Project Deadline',
            start: new Date(2024, 9, 11, 9, 0),
            end: new Date(2024, 9, 11, 10, 0),
        },
        // Weitere Events
    ];

    // "Next" Button
    const handleNext = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            if (view === 'week') {
                newDate.setDate(newDate.getDate() + 7);
            } else {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        });
    };

    // "Back" Button
    const handlePrevious = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            if (view === 'week') {
                newDate.setDate(newDate.getDate() - 7);
            } else {
                newDate.setMonth(newDate.getMonth() - 1);
            }
            return newDate;
        });
    };

    // "Today" Button
    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const switchView = (newView) => {
        setView(newView);
    };

    return (
        <div style={{ paddingTop: '100px' }}>
            <Navbar />

            <div className="container" style={{ marginTop: '80px', paddingBottom: '20px' }}>
                <h3>Kalender</h3>

                <div className="d-flex justify-content-between">
                    {/* Links: Back, Today, Next Buttons */}
                    <div>
                        <button className="btn btn-secondary me-2" onClick={handlePrevious}>
                            Back
                        </button>
                        <button className="btn btn-secondary me-2" onClick={handleToday}>
                            Today
                        </button>
                        <button className="btn btn-secondary" onClick={handleNext}>
                            Next
                        </button>
                    </div>

                    {/* Rechts: Umschalten zwischen Wöchentlich und Monatlich */}
                    <div>
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className={`btn ${view === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => switchView('week')}>
                                Wöchentlich
                            </button>
                            <button
                                type="button"
                                className={`btn ${view === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => switchView('month')}>
                                Monatlich
                            </button>
                        </div>
                    </div>
                </div>

                <div className="calendar-view mt-4">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        defaultView={view}
                        date={currentDate}
                        view={view}
                        onNavigate={(date) => setCurrentDate(date)}
                        style={{ height: 600 }}
                        toolbar={false}  // Deaktiviert die default Toolbar mit Tabs
                    />
                </div>

                {chatOpen && (
                    <ChatBot onClose={() => setChatOpen(false)} />
                )}

                <button
                    onClick={() => setChatOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        border: 'none',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    Chat
                </button>
            </div>
        </div>
    );
};

export default CalendarPage;
