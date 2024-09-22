let editIndex = -1; // To track which student is being edited

// Function to add or update student record
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let name = document.getElementById('name').value;
    let studentId = document.getElementById('studentId').value;
    let email = document.getElementById('email').value;
    let contact = document.getElementById('contact').value;
    
    if (!name || !studentId || !email || !contact) {
        alert('Please fill in all fields.');
        return;
    }

    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Check if editing an existing student or adding a new one
    if (editIndex === -1) {
        // Add new student
        students.push({ name, studentId, email, contact });
    } else {
        // Update existing student
        students[editIndex] = { name, studentId, email, contact };
        editIndex = -1; // Reset edit index
    }

    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    document.getElementById('registrationForm').reset();
});

// Function to display students
function displayStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = '';
    
    students.forEach((student, index) => {
        let row = `<tr>
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})"><i class="fa-solid fa-file-pen"></i></button>
                <button onclick="deleteStudent(${index})"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>`;
        studentTableBody.innerHTML += row;
    });
}

// Function to edit student record
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    
    // Load student data into the form
    document.getElementById('name').value = students[index].name;
    document.getElementById('studentId').value = students[index].studentId;
    document.getElementById('email').value = students[index].email;
    document.getElementById('contact').value = students[index].contact;

    // Set the global editIndex to the selected student's index
    editIndex = index;
}

// Function to delete student record
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

// Initial call to display students when the page loads
document.addEventListener('DOMContentLoaded', displayStudents);
