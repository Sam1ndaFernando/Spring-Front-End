document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const id = document.getElementById('studentId').value;
    const name = document.getElementById('studentName').value;
    const address = document.getElementById('studentAddress').value;
    const course = document.getElementById('studentCourse').value;

    const tableBody = document.getElementById('studentTableBody');
    const newRow = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = id;
    newRow.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    newRow.appendChild(nameCell);

    const addressCell = document.createElement('td');
    addressCell.textContent = address;
    newRow.appendChild(addressCell);

    const courseCell = document.createElement('td');
    courseCell.textContent = course;
    newRow.appendChild(courseCell);

    const actionsCell = document.createElement('td');
    actionsCell.innerHTML = `
        <button class="btn btn-warning btn-sm update-btn">Update</button>
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
    `;
    newRow.appendChild(actionsCell);

    tableBody.appendChild(newRow);

    document.getElementById('studentForm').reset();

    newRow.querySelector('.update-btn').addEventListener('click', () => updateStudent(newRow));
    newRow.querySelector('.delete-btn').addEventListener('click', () => deleteStudent(newRow));
});

function updateStudent(row) {
    const idCell = row.children[0];
    const nameCell = row.children[1];
    const addressCell = row.children[2];
    const courseCell = row.children[3];

    const newId = prompt("Enter new ID:", idCell.textContent);
    const newName = prompt("Enter new name:", nameCell.textContent);
    const newAddress = prompt("Enter new address:", addressCell.textContent);
    const newCourse = prompt("Enter new course:", courseCell.textContent);

    if (newId) idCell.textContent = newId;
    if (newName) nameCell.textContent = newName;
    if (newAddress) addressCell.textContent = newAddress;
    if (newCourse) courseCell.textContent = newCourse;
}

function deleteStudent(row) {
    row.remove();
}

document.getElementById('save-btn').addEventListener('click', function() {
    const students = [];
    const tableBody = document.getElementById('studentTableBody');

    tableBody.querySelectorAll('tr').forEach(row => {
        const id = row.children[0].textContent;
        const name = row.children[1].textContent;
        const address = row.children[2].textContent;
        const course = row.children[3].textContent;
        students.push({ id, name, address, course });
    });

    $.ajax({
        url: "your-server-endpoint", // Update with your server endpoint
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(students),
        success: function(response) {
            alert("Student data saved successfully!");
        },
        error: function(error) {
            console.error("Error saving student data:", error);
            alert("Failed to save student data.");
        }
    });
});
