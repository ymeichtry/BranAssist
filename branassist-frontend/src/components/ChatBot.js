import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = ({ onClose }) => {
    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Welcome to the chat!' }]);
    const [inputMessage, setInputMessage] = useState('');

    // Nachricht senden Funktion
    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newMessage = { sender: 'user', text: inputMessage };
        setMessages([...messages, newMessage]);
        setInputMessage('');

        try {
            const response = await sendMessageToChatBot(inputMessage);
            const botResponse = { sender: 'bot', text: response.data };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const sendMessageToChatBot = async (message) => {
        return axios.post('https://example-chatbot-api.com/sendMessage', { message });
    };

    // "Enter" Taste Funktion zum Senden
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
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
                height: 'calc(100vh - 138px)',
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
                    onKeyPress={handleKeyPress}  // "Enter"-Taste als Trigger
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
