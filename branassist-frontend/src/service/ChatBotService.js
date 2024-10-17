// src/service/ChatBotService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/chatbot'; // URL zum Backend

class ChatBotService {
    sendMessage(message) {
        return axios.post(`${API_BASE_URL}/message`, { message });
    }
}

export default new ChatBotService();
