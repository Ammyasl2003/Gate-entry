document.addEventListener('DOMContentLoaded', () => {
    // Auto-fill time on page load
    document.getElementById('entryTime').value = new Date().toLocaleString();
});

document.getElementById('vehicleForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const vehicleNumber = document.getElementById('vehicleNumber').value;
    const vehicleType = document.getElementById('vehicleType').value;
    const driverName = document.getElementById('driverName').value;
    const entryType = document.getElementById('entryType').value;
    const entryTime = document.getElementById('entryTime').value;

    console.log("Submitting:", { vehicleNumber, vehicleType, driverName, entryType, entryTime });

    try {
        const response = await fetch('http://localhost:3000/save-vehicle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vehicleNumber, vehicleType, driverName, entryType, entryTime }),
        });

        const result = await response.json();

        alert(result.message);  // ✅ Show alert message

        document.getElementById('responseMessage').textContent = result.message;
        document.getElementById('responseMessage').style.color = result.success ? 'green' : 'red';

        if (result.success) {
            e.target.reset();
            document.getElementById('entryTime').value = new Date().toLocaleString();
        }
    } catch (error) {
        const errorMessage = "Error: " + error.message;
        alert(errorMessage);  // ❌ Show error alert
        document.getElementById('responseMessage').textContent = errorMessage;
        document.getElementById('responseMessage').style.color = 'red';
    }
});
