document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const department = document.getElementById('department').value;
    const entryType = document.getElementById('entryType').value;
    
    const data = {
        student_id: studentId,
        name: studentName,
        department: department,
        entry_type: entryType,
        timestamp: new Date().toISOString()
    };
    
    // Send data to Django backend
    fetch('http://127.0.0.1:8000/api/student-entry/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    .then(response => response.json())
    .then(data => {
        const responseDiv = document.getElementById('responseMessage');
        responseDiv.className = 'success';
        responseDiv.textContent = 'Student entry recorded successfully!';
        document.getElementById('studentForm').reset();
    })
    .catch((error) => {
        const responseDiv = document.getElementById('responseMessage');
        responseDiv.className = 'error';
        responseDiv.textContent = 'Error recording student entry. Please try again.';
    });
});