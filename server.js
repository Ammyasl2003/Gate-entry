// server.js
const express    = require('express');
const fs         = require('fs');
const path       = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1) Student Endpoint
app.post('/save-student', (req, res) => {
    console.log("Student Received:", req.body);
    const { studentId, studentName, department, entryType, entryTime } = req.body;
    const data = `ID: ${studentId}, Name: ${studentName}, Dept: ${department}, Type: ${entryType}, Time: ${entryTime}\n`;

    fs.appendFile('students.txt', data, err => {
        if (err) {
            console.error("Student File Write Error:", err);
            return res.status(500).json({ success: false, message: "Student data save failed." });
        }
        console.log("Student Data Saved:", data.trim());
        return res.json({ success: true, message: "Student data saved successfully!" });
    });
});


// 2) Visitor Endpoint
app.post('/save-visitor', (req, res) => {
    console.log("Visitor Received:", req.body);
    const { visitorName, visitorContact, purpose, meetingWith, entryType, entryTime } = req.body;
    const data = `Name: ${visitorName}, Contact: ${visitorContact}, Purpose: ${purpose}, Meeting: ${meetingWith}, Type: ${entryType}, Time: ${entryTime}\n`;

    fs.appendFile('visitors.txt', data, err => {
        if (err) {
            console.error("Visitor File Write Error:", err);
            return res.status(500).json({ success: false, message: "Visitor data save failed." });
        }
        console.log("Visitor Data Saved:", data.trim());
        res.json({ success: true, message: "Visitor data saved!" });
    });
});


// 3) Vehicle Endpoint
app.post('/save-vehicle', (req, res) => {
    const { vehicleNumber, vehicleType, driverName, entryType, entryTime } = req.body;
    const data = `Number: ${vehicleNumber}, Type: ${vehicleType}, Driver: ${driverName}, EntryType: ${entryType}, Time: ${entryTime}\n`;
    
    fs.appendFile('vehicles.txt', data, (err) => {
        if (err) {
            console.error("FILE WRITE ERROR:", err);
            return res.status(500).json({ success: false, message: "Failed to save vehicle data" });
        }
        res.json({ success: true, message: "Vehicle data saved successfully!" });
    });
});

app.post('/save-teacher', (req, res) => {
    const { name, department, entryTime } = req.body;
    const data = `Name: ${name}, Department: ${department}, Time: ${entryTime}\n`;
    
    fs.appendFile('teachers.txt', data, (err) => {
        if (err) {
            console.error("FILE WRITE ERROR:", err);
            return res.status(500).json({ success: false, message: "Failed to save teacher data" });
        }
        res.json({ success: true, message: "Teacher data saved successfully!" });
    });
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
