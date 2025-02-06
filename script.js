const API_URL = 'https://darts-api.onrender.com/get-betmgm-premier-league-nights';  // Replace with your actual backend URL

// Fetch the events data from your Flask API
async function fetchPremierLeagueNights() {
    const response = await fetch(API_URL);  // No need to add the endpoint again
    if (response.ok) {
        const events = await response.json();
        populateDropdown(events);
    } else {
        console.error("Failed to fetch Premier League Nights");
    }
}

// Populate the dropdown with Premier League Nights
function populateDropdown(events) {
    const dropdown = document.getElementById('nightDropdown');
    events.forEach(event => {
        const option = document.createElement('option');
        option.value = event.idEvent;
        option.textContent = `${event.strEvent} - ${event.dateEvent}`;
        dropdown.appendChild(option);
    });
}

// Display event details when a Premier League Night is selected
async function displayEventDetails(eventId) {
    const response = await fetch(`${API_URL}/get-events`);  // Ensure this is correct based on your Flask API structure
    if (response.ok) {
        const events = await response.json();
        const event = events.find(e => e.idEvent == eventId);

        if (event) {
            const details = `
                <h2>${event.strEvent}</h2>
                <p><strong>Date:</strong> ${event.dateEvent}</p>
                <p><strong>Time:</strong> ${event.strTime || 'No time available'}</p>
                <p><strong>Location:</strong> ${event.strVenue || 'No venue information'}</p>
                <p><strong>City:</strong> ${event.strCity || 'No city information'}</p>
                <p><strong>Country:</strong> ${event.strCountry || 'No country information'}</p>
                <p><strong>Description:</strong> ${event.strDescriptionEN || 'No description available'}</p>
            `;
            document.getElementById('eventDetails').innerHTML = details;
        } else {
            document.getElementById('eventDetails').innerHTML = "<p>No details available for this night.</p>";
        }
    }
}

// Event listener for dropdown selection
document.getElementById('nightDropdown').addEventListener('change', (event) => {
    const eventId = event.target.value;
    if (eventId) {
        displayEventDetails(eventId);
    } else {
        document.getElementById('eventDetails').innerHTML = "<p>Select a Premier League Night to see the details.</p>";
    }
});

// Fetch Premier League Nights on page load
window.onload = fetchPremierLeagueNights;
