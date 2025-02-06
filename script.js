const API_URL = 'https://darts-api.onrender.com/get-betmgm-premier-league-nights';  // Correct backend URL

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
    const response = await fetch(API_URL);  // Fetch the list of events again for the details
    if (response.ok) {
        const events = await response.json();
        const event = events.find(e => e.idEvent == eventId);

        if (event) {
            const details = `
                <h2>${event.strEvent}</h2>
                <p><strong>Date:</strong> ${event.dateEvent}</p>
                <p><strong>Time:</strong> ${event.strTime || 'No time available'}</p>
                <p><strong>Venue:</strong> ${event.strVenue || 'No venue information'}</p>
                <p><strong>City:</strong> ${event.strCity || 'No city information'}</p>
                <p><strong>Country:</strong> ${event.strCountry || 'No country information'}</p>
                <p><strong>Description:</strong> ${event.strDescriptionEN || 'No description available'}</p>
                <p><strong>Results:</strong> ${event.strResult || 'No results available yet'}</p>
                <div>
                    <strong>Posters:</strong><br>
                    <img src="${event.strPoster || 'https://via.placeholder.com/150'}" alt="Event Poster" style="width: 200px;"><br>
                    <strong>Thumb:</strong><br>
                    <img src="${event.strThumb || 'https://via.placeholder.com/150'}" alt="Event Thumbnail" style="width: 150px;">
                </div>
            `;
            document.getElementById('eventDetails').innerHTML = details;
        } else {
            document.getElementById('eventDetails').innerHTML = "<p>No details available for this night.</p>";
        }
    } else {
        console.error("Failed to fetch event details");
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
