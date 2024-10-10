import React from 'react';

const ChatBot = ({ onClose }) => {
    return (
        <div
            className="modal-overlay"
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Halbtransparenter Hintergrund
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <div
                className="chat-dialog"
                style={{
                    backgroundColor: 'white',
                    color: 'black',
                    width: '400px',
                    maxWidth: '90%',
                    height: '500px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    position: 'relative',
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
        </div>
    );
};

export default ChatBot;
