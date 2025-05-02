document.addEventListener('DOMContentLoaded', function() {
    // Set current time
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('entryTime').value = timeString;

    // Form submission handler
    const form = document.getElementById('studentForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const teacherData = {
            name: document.getElementById('studentName').value,
            department: document.getElementById('department').value,
            entryTime: document.getElementById('entryTime').value
        };

        // Send data to server
        fetch('/api/teachers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacherData)
        })
        .then(response => response.json())
        .then(data => {
            const responseDiv = document.getElementById('responseMessage');
            if (data.success) {
                responseDiv.innerHTML = `<div class="success">Entry recorded successfully!</div>`;
                form.reset();
                // Update time to current time after submission
                const newTime = new Date();
                document.getElementById('entryTime').value = newTime.toLocaleTimeString();
            } else {
                responseDiv.innerHTML = `<div class="error">Error: ${data.message}</div>`;
            }
            setTimeout(() => responseDiv.innerHTML = '', 3000);
        })
        .catch(error => {
            document.getElementById('responseMessage').innerHTML = 
                `<div class="error">Network error. Please try again.</div>`;
            setTimeout(() => responseDiv.innerHTML = '', 3000);
        });
    });
});