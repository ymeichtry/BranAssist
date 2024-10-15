import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import Service from '../service/CalendarService';

const localizer = momentLocalizer(moment);

const CalendarViewCard = () => {
    const [view, setView] = useState('week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await Service.getAllCalendarEntries();
                const formattedEvents = response.data.map(event => ({
                    ...event,
                    start: moment.utc(event.start).local().toDate(),
                    end: moment.utc(event.end).local().toDate(),
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Fehler beim Abrufen der Events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleNext = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            if (view === 'week') {
                newDate.setDate(newDate.getDate() + 7);
            } else if (view === 'month') {
                newDate.setMonth(newDate.getMonth() + 1);
            } else if (view === 'day') {
                newDate.setDate(newDate.getDate() + 1);
            }
            return newDate;
        });
    };

    const handlePrevious = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            if (view === 'week') {
                newDate.setDate(newDate.getDate() - 7);
            } else if (view === 'month') {
                newDate.setMonth(newDate.getMonth() - 1);
            } else if (view === 'day') {
                newDate.setDate(newDate.getDate() - 1);
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

    const handleNavigateToCalendar = () => {
        navigate('/calendar');
    };

    return (
        <div className="card" style={{ width: '100%', padding: '20px' }}>
            <h5 className="card-title">Calendar</h5>
            <div className="d-flex justify-content-between">
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

                <div>
                    <div className="btn-group" role="group">
                        <button
                            type="button"
                            className={`btn ${view === 'day' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => switchView('day')}>
                            Day
                        </button>
                        <button
                            type="button"
                            className={`btn ${view === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => switchView('week')}>
                            Week
                        </button>
                        <button
                            type="button"
                            className={`btn ${view === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => switchView('month')}>
                            Month
                        </button>
                    </div>
                    <button
                        className="btn btn-success ms-2"
                        onClick={handleNavigateToCalendar}>
                        Extend
                    </button>
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
                    toolbar={false}
                />
            </div>
        </div>
    );
};

export default CalendarViewCard;
