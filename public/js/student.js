document.addEventListener('DOMContentLoaded', () => {
    // Auto-fill time on page load
    document.getElementById('entryTime').value = new Date().toLocaleString();
});

document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const department = document.getElementById('department').value;
    const entryType = document.getElementById('entryType').value;
    const entryTime = document.getElementById('entryTime').value;

    console.log("Submitting:", { studentId, studentName, department, entryType, entryTime }); // Debug log

    try {
        const response = await fetch('http://localhost:3000/save-student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, studentName, department, entryType, entryTime }),
        });
    
        const result = await response.json();
        
        // Show alert
        alert(result.message);
    
        // Show response in a visible element too
        document.getElementById('responseMessage').textContent = result.message;
        document.getElementById('responseMessage').style.color = result.success ? 'green' : 'red';
    
        // Reset the form
        e.target.reset();
    } catch (error) {
        const errorMsg = "Error: " + error.message;
        alert(errorMsg); // Alert error message too
        document.getElementById('responseMessage').textContent = errorMsg;
        document.getElementById('responseMessage').style.color = 'red';
    }
});    