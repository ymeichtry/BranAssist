import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarViewCard = () => {
    const [view, setView] = useState('week'); // 'week' or 'month'
    const [currentDate, setCurrentDate] = useState(new Date());
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
        // Weitere Events können hier hinzugefügt werden
    ];

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

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const switchView = (newView) => {
        setView(newView);
    };

    return (
        <div className="card" style={{width: '100%', padding: '20px'}}>
            <h5 className="card-title">Kalenderansicht</h5>
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
                    style={{height: 600}}
                    toolbar={false}  // Deaktiviert die default Toolbar mit Tabs
                />
            </div>
        </div>
    );
};

export default CalendarViewCard;
