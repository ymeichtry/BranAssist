import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/calendar";

class CalendarService {
    // Add a new Calendar Entry
    addCalendarEntry(entry) {
        console.log(entry)
        return axios.post(`${API_BASE_URL}/add`, entry);
    }

    // Get all Calendar Entries
    getAllCalendarEntries() {
        return axios.get(`${API_BASE_URL}/entries`);
    }

    // Get Calendar Entry by ID
    getCalendarEntryById(id) {
        return axios.get(`${API_BASE_URL}/entry/${id}`);
    }

    // Update Calendar Entry by ID
    updateCalendarEntry(id, entry) {
        return axios.put(`${API_BASE_URL}/entry/${id}`, entry);
    }

    // Delete Calendar Entry by ID
    deleteCalendarEntry(id) {
        return axios.delete(`${API_BASE_URL}/entry/${id}`);
    }
}

export default new CalendarService();
