document.addEventListener('DOMContentLoaded', () => {
    // Auto-fill current time when page loads
    document.getElementById('entryTime').value = new Date().toLocaleString();
});

document.getElementById('visitorForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const visitorName = document.getElementById('visitorName').value;
    const visitorContact = document.getElementById('visitorContact').value;
    const purpose = document.getElementById('purpose').value;
    const meetingWith = document.getElementById('meetingWith').value;
    const entryType = document.getElementById('entryType').value;
    const entryTime = new Date().toLocaleString(); // Current timestamp

    try {
        // Send data to server
        const response = await fetch('http://localhost:3000/save-visitor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                visitorName,
                visitorContact,
                purpose,
                meetingWith,
                entryType,
                entryTime
            }),
        });

        const result = await response.json();
        const responseElement = document.getElementById('responseMessage');

        if (result.success) {
            responseElement.textContent = 'Visitor data saved successfully!';
            responseElement.style.color = 'green';
            alert(result.message); // <-- Show success alert
            e.target.reset();
            // Update time after submission
            document.getElementById('entryTime').value = new Date().toLocaleString();
        } else {
            throw new Error(result.message); // Will be caught below
        }
        
    } catch (error) {
        const errorMessage = 'Error: ' + error.message;
        document.getElementById('responseMessage').textContent = errorMessage;
        document.getElementById('responseMessage').style.color = 'red';
        alert(errorMessage); // <-- Show error alert
    }
    
}); 