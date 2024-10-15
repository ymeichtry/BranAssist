import React, { useState } from 'react';
import axios from 'axios'; // Nutze Axios für API-Anfragen, wenn du einen externen KI-Service nutzt.

const ChatBot = ({ onClose }) => {
    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Welcome to the chat!' }]);
    const [inputMessage, setInputMessage] = useState('');

    // Funktion, um eine Nachricht zu senden
    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Nachricht des Benutzers zur Liste der Nachrichten hinzufügen
        const newMessage = { sender: 'user', text: inputMessage };
        setMessages([...messages, newMessage]);

        // Leeres Eingabefeld nach dem Senden
        setInputMessage('');

        try {
            // Hier würdest du die Nachricht an die KI senden (z.B. via API)
            const response = await sendMessageToChatBot(inputMessage); // Deine Funktion zur Kommunikation mit KI

            // Antwort der KI zur Liste der Nachrichten hinzufügen
            const botResponse = { sender: 'bot', text: response.data }; // Hier wird die Antwort simuliert
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Beispiel: Funktion, um mit einem Backend zu kommunizieren (mit KI-Integration)
    const sendMessageToChatBot = async (message) => {
        // Hier solltest du deinen Backend-API-Aufruf einfügen
        // Beispiel für OpenAI API Integration (ohne Authentifizierung)
        return axios.post('https://example-chatbot-api.com/sendMessage', { message });
    };

    // Hinzufügen der "Enter"-Taste zum Senden der Nachricht
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();  // Nachricht senden, wenn "Enter" gedrückt wird
        }
    };

    return (
        <div
            className="modal-overlay"
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000,
                width: '400px',
                maxWidth: '90%',
                height: '500px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Schließen-Button */}
            <button
                onClick={onClose}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'black',
                    fontSize: '24px',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                }}
            >
                &times;
            </button>

            <h4>Chat with Brandon</h4>

            {/* Chat Inhalt */}
            <div
                className="chat-content"
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    marginBottom: '10px',
                }}
            >
                {messages.map((msg, index) => (
                    <p
                        key={index}
                        style={{
                            textAlign: msg.sender === 'user' ? 'right' : 'left',
                            color: msg.sender === 'user' ? '#007bff' : 'black',
                        }}
                    >
                        <strong>{msg.sender === 'user' ? 'You' : 'Brandon'}: </strong>
                        {msg.text}
                    </p>
                ))}
            </div>

            {/* Chat Eingabe */}
            <div className="chat-input" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}  // Fügt die Enter-Taste als Auslöser hinzu
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                    }}
                />
                <button
                    onClick={handleSendMessage}
                    className="btn btn-primary"
                    style={{ marginLeft: '10px', padding: '10px' }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
