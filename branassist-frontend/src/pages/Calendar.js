import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ChatBot from '../components/ChatBot';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, Form } from 'react-bootstrap';  // Import für Modal und Form

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [view, setView] = useState('week'); // 'week' or 'month'
    const [currentDate, setCurrentDate] = useState(new Date());
    const [chatOpen, setChatOpen] = useState(false); // Zustand für Chatbot-Öffnung
    const [modalOpen, setModalOpen] = useState(false); // Zustand für den Modal
    const [newEvent, setNewEvent] = useState({ title: '', description: '', start: '', end: '' }); // Event state mit Description
    const [events, setEvents] = useState([
        {
            title: 'Client Meeting',
            description: 'Meeting to discuss project updates',
            start: new Date(2024, 9, 13, 14, 0),
            end: new Date(2024, 9, 13, 15, 0),
        },
        {
            title: 'Project Deadline',
            description: 'Final deadline for project submission',
            start: new Date(2024, 9, 11, 9, 0),
            end: new Date(2024, 9, 11, 10, 0),
        },
        // Weitere Events
    ]);

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

    // Öffnen des Modals für einen neuen Event
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    // Schließen des Modals
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Neuen Event hinzufügen
    const handleAddEvent = () => {
        const newEventToAdd = {
            title: newEvent.title,
            description: newEvent.description,  // Beschreibung hinzufügen
            start: new Date(newEvent.start),
            end: new Date(newEvent.end),
        };
        setEvents([...events, newEventToAdd]);
        handleCloseModal(); // Modal schließen nach dem Hinzufügen
    };

    // Handhabung der Eingaben
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
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

                    {/* Rechts: Umschalten zwischen Wöchentlich, Monatlich, und "New Entry" Button */}
                    <div className="d-flex align-items-center">
                        <div className="btn-group me-3" role="group">
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

                        {/* "New Entry" Button */}
                        <button className="btn btn-success" onClick={handleOpenModal}>
                            New Entry
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
                        toolbar={false}  // Deaktiviert die default Toolbar mit Tabs
                    />
                </div>

                {/* Modal für das Erstellen eines neuen Events */}
                <Modal show={modalOpen} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Neuen Kalendereintrag erstellen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formEventTitle">
                                <Form.Label>Titel</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleChange}
                                    placeholder="Event Titel"
                                />
                            </Form.Group>
                            <Form.Group controlId="formEventDescription" className="mt-3">
                                <Form.Label>Beschreibung</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={newEvent.description}
                                    onChange={handleChange}
                                    placeholder="Beschreibung des Events"
                                />
                            </Form.Group>
                            <Form.Group controlId="formEventStart" className="mt-3">
                                <Form.Label>Startdatum und Zeit</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="start"
                                    value={newEvent.start}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEventEnd" className="mt-3">
                                <Form.Label>Enddatum und Zeit</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="end"
                                    value={newEvent.end}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Abbrechen
                        </Button>
                        <Button variant="primary" onClick={handleAddEvent}>
                            Speichern
                        </Button>
                    </Modal.Footer>
                </Modal>

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
