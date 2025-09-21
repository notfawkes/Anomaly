import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    // I'll rename the state variables for clarity to match what the backend expects
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Sending 'name' and 'password' to be consistent
                body: JSON.stringify({ name, password }),
            });

            const result = await response.json();
            console.log("Login Success Response:", result);

            if (result.success && result.gameSessionId) {
                // --- THIS IS THE FIX ---
                // Save user data and the unique session ID to localStorage
                localStorage.setItem('userName', name);
                localStorage.setItem('userPassword', password);
                localStorage.setItem('gameSessionId', result.gameSessionId);

                // Navigate to the quiz, not the home page
                navigate('/Home');
            } else {
                alert("Invalid NAME or PASSCODE. Please try again.");
            }

        } catch (error) {
            console.error("Login request failed:", error);
            alert("An error occurred during login. Please check the console.");
        }
    };

    // The rest of your JSX remains the same, just updated to use the new state variables
    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="title">ANOMALY</h1>
                <h2 className="subtitle">Restore the Broken Timeline</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="userId">NAME:</label>
                        {/* Updated to use 'name' state */}
                        <input type="text" id="userId" value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="passcode">PASSCODE:</label>
                        {/* Updated to use 'password' state */}
                        <input type="password" id="passcode" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="login-button">{'> PLAY NOW'}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;