import React from 'react';

const ChatBot = ({ onClose }) => {
    return (
        <div
            className="modal-overlay"
            style={{
                position: 'fixed',
                bottom: '20px',  // Abstand vom unteren Rand
                right: '20px',   // Abstand vom rechten Rand
                zIndex: 1000,
                width: '400px',  // Fixierte Breite des Chatbot-Fensters
                maxWidth: '90%', // Passt sich an kleinere Bildschirme an
                height: '500px', // Fixierte Höhe
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
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
                    height: '85%',
                    overflowY: 'auto',
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                }}
            >
                <p>Welcome to the chat!</p>
                <p>This is where your messages will go...</p>
            </div>

            {/* Input Feld für Nachrichten */}
            <div
                className="chat-input"
                style={{
                    marginTop: '10px',
                }}
            >
                <input
                    type="text"
                    placeholder="Type a message..."
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                    }}
                />
            </div>
        </div>
    );
};

export default ChatBot;
