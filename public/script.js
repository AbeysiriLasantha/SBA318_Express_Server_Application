const studentsBtn = document.getElementById('students-btn');
const studentInfoDiv = document.getElementById('student-info');
const addBtn = document.getElementById('add-btn');
const editBtn = document.getElementById('edit-del-btn');


// Call to '/api/students' API and fetch data
studentsBtn.addEventListener('click', () => {
fetch('/api/students') // 
    .then(response => response.json())
    .then(data => {
        studentInfoDiv.innerHTML = ''; // Clear previous content

        // Create a table element
        const table = document.createElement('table');
        table.className = 'student-table';

        // Create the table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Select</th>
                <th>Student ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Academic Year</th>
                <th>Registered Year</th>
            </tr>
        `;
        table.appendChild(thead);
        // Create the table body
        const tbody = document.createElement('tbody');

        data.forEach(student => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><input type="checkbox" value="${student.student_id}"></td>
                <td>${student.student_id}</td>
                <td>${student.fname}</td>
                <td>${student.lname}</td>
                <td>${student.academic_year}</td>
                <td>${student.registered_year}</td>
            `;

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        studentInfoDiv.appendChild(table); // Append the table to the studentInfoDiv
    });
});



addBtn.addEventListener('click', () => {
    window.open('/studentAdd.html', '_blank', 'width=600,height=400');
});

editBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
        const row = checkbox.closest('tr'); 
        const student_id = row.children[1].textContent.trim();
        const fname = row.children[2].textContent.trim();
        const lname = row.children[3].textContent.trim();
        const academic_year = row.children[4].textContent.trim();
        const registered_year = row.children[5].textContent.trim();

        // Create a query string with the data
        const queryString = `student_id=${encodeURIComponent(student_id)}&fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}&academic_year=${encodeURIComponent(academic_year)}&registered_year=${encodeURIComponent(registered_year)}`;

        // Open a new window with the query string
        window.open(`/studentUpdateDelete.html?${queryString}`, 'Delete Student', 'width=600,height=400');
    });
});




// Center window

// function openCenteredWindow(url, width, height) {
//     // Calculate the center position
//     const left = (window.innerWidth - width) / 2 + window.screenX;
//     const top = (window.innerHeight - height) / 2 + window.screenY;

//     // Open the window with the specified dimensions and centered position
//     window.open(url, 'AddStudentWindow', `width=${width},height=${height},left=${left},top=${top}`);
// }





