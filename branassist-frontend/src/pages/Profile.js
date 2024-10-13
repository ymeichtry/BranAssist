import React, { useEffect, useState } from 'react';
import UserService from '../service/UserService';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await UserService.getCurrentUser();
                // Benutzerdaten aus der Antwort extrahieren
                const { username, email, firstName, lastName } = response.data;
                setUserData({ username, email, firstName, lastName });
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Profile</h2>
            <div className="card p-4">
                <h4 className="mb-3">Benutzername: @{userData.username}</h4>
                <h5>Email: {userData.email}</h5>
                <h5>Vorname: {userData.firstName}</h5>
                <h5>Nachname: {userData.lastName}</h5>
            </div>
        </div>
    );
};

export default Profile;
