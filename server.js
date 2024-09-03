// Importing modules (Importing my modules' data as in a compatible way to the server.js file)
const { students } = require('./modules/students.js');
const { courses } = require('./modules/courses.js'); // Ensure these files are similarly set up
const { studentMarks } = require('./modules/marks.js'); // Ensure these files are similarly set up

// Importing Express framework
const express = require('express');
const app = express(); // Making an instance of express. Now we can use all express capabilities in the app. 
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get ('/students', (req,res) => {
    res.send (students);
})