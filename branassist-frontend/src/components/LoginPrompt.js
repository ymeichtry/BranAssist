import React from 'react';
import { Modal, Button } from 'react-bootstrap'; // Nutze Bootstrap für das Modal

const LoginPrompt = ({ show }) => {
    const redirectToLogin = () => {
        window.location.href = '/login'; // Redirekt zur Login-Seite
    };

    return (
        <Modal show={show} backdrop="static" keyboard={false} centered>
            <Modal.Header>
                <Modal.Title>Please Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are not logged in. Please login to access this page.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={redirectToLogin}>
                    Go to Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginPrompt;
