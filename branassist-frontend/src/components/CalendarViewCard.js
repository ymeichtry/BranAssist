import React, { useState } from 'react';

const CalendarViewCard = () => {
    const [view, setView] = useState('week'); // 'week' or 'month'
    const [currentDate, setCurrentDate] = useState(new Date());

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

    const switchView = (newView) => {
        setView(newView);
    };

    return (
        <div className="card" style={{ width: '100%', padding: '20px' }}>
            <h5 className="card-title">Kalenderansicht</h5>
            <div className="d-flex justify-content-between">
                <div>
                    <button className="btn btn-link" onClick={() => switchView('week')}>
                        Wöchentlich
                    </button>
                    <button className="btn btn-link" onClick={() => switchView('month')}>
                        Monatlich
                    </button>
                </div>
                <div>
                    <button className="btn btn-secondary" onClick={handlePrevious}>
                        Vorheriger
                    </button>
                    <button className="btn btn-secondary" onClick={handleNext}>
                        Nächster
                    </button>
                </div>
            </div>
            <div className="calendar-view mt-4">
                {view === 'week' ? (
                    <p>Wöchentliche Ansicht: {currentDate.toDateString()}</p>
                ) : (
                    <p>Monatliche Ansicht: {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                )}
            </div>
        </div>
    );
};

export default CalendarViewCard;
