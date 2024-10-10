import React, { useState } from 'react';

const appointments = [
    { label: 'Meeting with team', date: '2024-10-12' },
    { label: 'Client call', date: '2024-10-13' },
    { label: 'Project deadline', date: '2024-10-15' },
    { label: 'Workshop', date: '2024-10-18' },
];

const NextAppointmentsCard = () => {
    const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0);

    const handleNext = () => {
        setCurrentAppointmentIndex((prevIndex) => (prevIndex + 1) % appointments.length);
    };

    const handlePrevious = () => {
        setCurrentAppointmentIndex((prevIndex) =>
            prevIndex === 0 ? appointments.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="card" style={{ width: '500px', height: '500px', padding: '20px' }}>
            <h5 className="card-title">Nächste Termine</h5>
            <p className="card-text">
                <strong>{appointments[currentAppointmentIndex].label}</strong>
                <br />
                <em>{appointments[currentAppointmentIndex].date}</em>
            </p>
            <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-primary" onClick={handlePrevious}>
                    Vorheriger
                </button>
                <button className="btn btn-primary" onClick={handleNext}>
                    Nächster
                </button>
            </div>
        </div>
    );
};

export default NextAppointmentsCard;
