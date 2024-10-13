import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChatBot from '../components/ChatBot';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Service from '../service/CalendarService'; // Importiere den Service

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [view, setView] = useState('week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [chatOpen, setChatOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', start: '', end: '' });
    const [events, setEvents] = useState([]);

    // Daten von der API abrufen
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await Service.getAllCalendarEntries();
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    // Neuen Event zur API hinzufügen
    const handleAddEvent = async () => {
        const newEventToAdd = {
            title: newEvent.title,
            description: newEvent.description,
            start: new Date(newEvent.start),
            end: new Date(newEvent.end),
        };

        try {
            await Service.addCalendarEntry(newEventToAdd);
            setEvents((prev) => [...prev, newEventToAdd]);
            handleCloseModal();
            resetNewEvent();
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    // Event bearbeiten
    const handleEditEvent = async () => {
        const updatedEvent = {
            ...selectedEvent,
            title: newEvent.title,
            description: newEvent.description,
            start: new Date(newEvent.start),
            end: new Date(newEvent.end),
        };

        try {
            await Service.updateCalendarEntry(selectedEvent.id, updatedEvent);
            setEvents((prev) => prev.map(event => (event.id === selectedEvent.id ? updatedEvent : event)));
            handleCloseEditModal();
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    // Event löschen
    const handleDeleteEvent = async (id) => {
        try {
            await Service.deleteCalendarEntry(id);
            setEvents((prev) => prev.filter(event => event.id !== id));
            handleCloseEditModal();
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        resetNewEvent();
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        resetNewEvent();
        setSelectedEvent(null);
    };

    const resetNewEvent = () => {
        setNewEvent({ title: '', description: '', start: '', end: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setNewEvent({
            title: event.title,
            description: event.description,
            start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
            end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
        });
        setEditModalOpen(true);
    };

    return (
        <div style={{ paddingTop: '100px' }}>
            <Navbar />
            <div className="container" style={{ marginTop: '80px', paddingBottom: '20px' }}>
                <h3>Kalender</h3>

                <div className="d-flex justify-content-between mb-4">
                    <div>
                        <button className="btn btn-secondary me-2" onClick={() => setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() - 7)))}>
                            Back
                        </button>
                        <button className="btn btn-secondary me-2" onClick={() => setCurrentDate(new Date())}>
                            Today
                        </button>
                        <button className="btn btn-secondary" onClick={() => setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() + 7)))}>
                            Next
                        </button>
                    </div>

                    <div className="d-flex align-items-center">
                        <div className="btn-group me-3" role="group">
                            <button
                                type="button"
                                className={`btn ${view === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setView('week')}>
                                Wöchentlich
                            </button>
                            <button
                                type="button"
                                className={`btn ${view === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setView('month')}>
                                Monatlich
                            </button>
                        </div>
                        <button className="btn btn-success" onClick={() => setModalOpen(true)}>
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
                        style={{ height: 600 }}
                        onSelectEvent={handleEventClick}
                        toolbar={false}
                    />
                </div>

                {/* Modal zum Hinzufügen eines neuen Events */}
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

                {/* Modal zum Bearbeiten eines Events */}
                <Modal show={editModalOpen} onHide={handleCloseEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Kalendereintrag bearbeiten</Modal.Title>
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
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                            Abbrechen
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                            Löschen
                        </Button>
                        <Button variant="primary" onClick={handleEditEvent}>
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
