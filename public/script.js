const studentsBtn = document.getElementById('students-btn');
const studentInfoDiv = document.getElementById('student-info');
const testAddBtn = document.getElementById('test-btn');

//call to '/api/students'api and fetch data
studentsBtn.addEventListener('click', () => {
    fetch('/api/students') // 
        .then(response => response.json())
        .then(data => {
            studentInfoDiv.innerHTML = ''; // Clear previous content
            data.forEach(student => {
                const studentCard = document.createElement('div');
                studentCard.className = 'student-card';
                studentCard.innerHTML = `
                    <input type="checkbox" value="${student.student_id}">
                    <p>ID: ${student.student_id}</p>
                    <p>Name: ${student.fname} ${student.lname}</p>
                    <p>Academic Year: ${student.academic_year}</p>
                    <p>Registered Year: ${student.registered_year}</p>
                `;
                      
                studentInfoDiv.appendChild(studentCard);
            });
        });
});

// Add button event listener
testAddBtn.addEventListener('click', function() {
//need to capture the dat from the form
const studentData = {
    student_id: 21,
    fname: "Albert",
    lname: "Silva",
    academic_year: "Junior",
    registered_year: 2024
};

// Make the POST request using fetch
fetch('/api/students/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentData)
})
.then(response => {
    if (!response.ok) {
        // If the response is not ok (e.g., 404, 400, etc.), throw an error
        return response.json().then(errData => {
            throw new Error(errData.message || 'Something went wrong!');
        });
    }
    // If the response is ok, return the parsed JSON data
    return response.json();
})
.then(data => {
    // Display success message or log data
    //console.log('Student added:', data);
    //document.getElementById('message').innerText = 'Student added/Updated successfully!';
    alert('Student added/Updated successfully!');
})
.catch(error => {
    // Handle the error, display an appropriate message
    //console.error('Error:', error.message);
    //document.getElementById('message').innerText = `Failed to add student: ${error.message}`;
    alert(`Failed to add student: ${error.message}`);
});
}); 



document.getElementById('add-btn').addEventListener('click', () => {
    window.open('/add-student', '_blank', 'width=600,height=400');
});

document.getElementById('edit-btn').addEventListener('click', () => {
    window.open('/edit-student', '_blank', 'width=600,height=400');
});

document.getElementById('remove-btn').addEventListener('click', () => {
    window.open('/remove-student', '_blank', 'width=600,height=400');
});









