// src/pages/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [passcode, setPasscode] = useState('');
    const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, passcode }),
    });

    const result = await response.json();
    console.log("Success:", result);

    if (result.success) {
        navigate('/home');
    }
    else {
        alert("Invalid USER_ID or PASSCODE. Please try again.");
    }

  } catch (error) {
    console.error("Request failed:", error);
  }
};
    // The rest of your JSX remains the same
    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="title">ANOMALY</h1>
                <h2 className="subtitle">Restore the Broken Timeline</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="userId">NAME:</label>
                        <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} autoFocus required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="passcode">PASSCODE:</label>
                        <input type="password" id="passcode" value={passcode} onChange={(e) => setPasscode(e.target.value)} required />
                    </div>
                    <button type="submit" className="login-button">{'> PLAY NOW'}</button>
                </form>
            </div>
        </div>
    );
};

 export default Login;