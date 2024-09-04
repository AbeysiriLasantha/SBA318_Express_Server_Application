// Importing modules (Importing my modules' data as in a compatible way to the server.js file)
const { students } = require('./modules/students.js');
const { courses } = require('./modules/courses.js'); // Ensure these files are similarly set up
const { studentMarks } = require('./modules/marks.js'); // Ensure these files are similarly set up
const path = require ('path');

// Importing Express framework
//require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors'); // Import the CORS package
const app = express(); // Making an instance of express. Now we can use all express capabilities in the app. 
const port = process.env.PORT||8000;
const originPath = process.env.ORIGIN; 

// Use the CORS middleware
// app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Use the CORS middleware before defining routes
app.use(cors({
    origin: originPath // Replace with the URL of your client-side application
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
//Display a server status
app.listen(port, () => console.log(`Server is running on port ${port}`));

//This api fetch all the students 
app.get ('/api/students', (req,res) => {
    res.send (students);
})

//This api fetch a student for a given student ID
app.get ('/api/students/:id', (req,res) => {
    //console.log(req.params.id)
    // res.json (posts);

    const id = parseInt(req.params.id);
    //console.log (id);
    res.json(students.filter((student) => student.student_id === id));
})


// This api is use for adding or updating a student
app.post('/api/students/add', (req, res) => {
    const {student_id, fname, lname, academic_year, registered_year} = req.body;

    // Simple validation (you can expand this as needed)
    if (!student_id || !fname || !lname || !academic_year || !registered_year) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find the student by ID
    const studentIndex = students.findIndex(student => student.student_id === student_id);

    if (studentIndex !== -1) {
        // Student exists, update their details
        students[studentIndex] = { student_id, fname, lname, academic_year, registered_year };
        return res.status(200).json({ message: 'Student updated successfully.', student: students[studentIndex] });
    } else {
        // Student does not exist, add new student
        const newStudent = { student_id, fname, lname, academic_year, registered_year };
        students.push(newStudent);
        return res.status(201).json({ message: 'Student added successfully.', student: newStudent });
    }
});

// Deleting a student
app.delete('/api/students/delete/:id', (req, res) => {
    //const { student_id } = req.body;
    const student_id = parseInt(req.params.id);

    // Simple validation
    if (!student_id) {
        return res.status(400).json({ message: 'Student ID is required.' });
    }

    // Find the student by ID
    const studentIndex = students.findIndex(student => student.student_id === student_id);

    if (studentIndex !== -1) {
        // Student exists, delete the student
        const deletedStudent = students.splice(studentIndex, 1); // Remove the student from the array
        return res.status(200).json({ message: 'Student deleted successfully.', student: deletedStudent[0] });
    } else {
        // Student does not exist
        return res.status(404).json({ message: 'Student not found.' });
    }
});
