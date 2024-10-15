import React, { useEffect, useState } from 'react';
import CalendarService from '../service/CalendarService';

const NextAppointmentsCard = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const appointmentsPerPage = 5;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await CalendarService.getAllCalendarEntries();
                const data = response.data;

                const formattedAppointments = data.map(event => ({
                    label: event.title,
                    date: new Date(event.start).toLocaleDateString(),
                    startTime: new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    endTime: new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }));

                setAppointments(formattedAppointments);
            } catch (error) {
                console.error('Fehler beim Abrufen der Termine:', error);
            }
        };

        fetchAppointments();
    }, []);

    const currentAppointments = appointments.slice(
        currentPage * appointmentsPerPage,
        (currentPage + 1) * appointmentsPerPage
    );

    const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    return (
        <div className="card" style={{ width: '500px', height: '500px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <h5 className="card-title">Next appointments</h5>
            <div style={{ flex: 1 }}>
                {currentAppointments.length > 0 ? (
                    currentAppointments.map((appointment, index) => (
                        <div key={index}>
                            <p className="card-text">
                                <strong>{appointment.label}</strong>
                                <br />
                                <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{appointment.date}</span>
                                    <span>{appointment.startTime} - {appointment.endTime}</span>
                                </span>
                            </p>
                            {index < currentAppointments.length -1 && <hr />}
                        </div>
                    ))
                ) : (
                    <p>No appointments found</p>
                )}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentPage === 0}>
                    &lt; {/* Left arrow */}
                </button>
                <div className="d-flex align-items-center">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={`btn btn-outline-secondary me-1 ${currentPage === index ? 'active' : ''}`}
                            onClick={() => setCurrentPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button className="btn btn-secondary" onClick={handleNext} disabled={currentPage >= totalPages - 1}>
                    &gt; {/* Right arrow */}
                </button>
            </div>
        </div>
    );
};

export default NextAppointmentsCard;
