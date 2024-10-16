import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/user";

class UserService {
    register(user) {
        return axios.post(`${API_BASE_URL}/register`, user);
    }

    login(credentials) {
        return axios.post(`${API_BASE_URL}/login`, credentials)
            .then(response => {
                console.log("Login successful! Response data:", response.data); // Log the response data

                // Hier sollte der Token gespeichert werden
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    console.log("Token saved to localStorage:", response.data.token); // Log the token
                }

                return response; // Rückgabe der Antwort
            })
            .catch(error => {
                console.error('Login failed', error);
                throw error; // Fehler weiterwerfen
            });
    }

    getCurrentUser() {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return Promise.reject(new Error('No token available'));
        }

        return axios.get(`${API_BASE_URL}/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log('Error fetching die super duper user data', error);
                throw error;
            });
    }
}

export default new UserService();
