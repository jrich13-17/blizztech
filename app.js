// Google API Client ID and API Key
const CLIENT_ID = "92182400022-h5mb0g8l23bf9hjk8ops7pvemqkaurds.apps.googleusercontent.com";
const API_KEY = "YOUR_API_KEY"; // Replace with actual API key

// Google Calendar API settings
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// Initialize Google API Client
function handleClientLoad() {
    gapi.load("client:auth2", initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            gapi.auth2.getAuthInstance().signIn();
        }
    }).catch(error => {
        console.error("Error during client initialization", error);
    });
}

// Load the client
handleClientLoad();

// Function to Break Down Goal
function breakDownGoal() {
    const goal = document.getElementById("goal").value;
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);

    const timeDiff = endDate - startDate;
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (days <= 0 || isNaN(days)) {
        document.getElementById("task-output").innerText = "Please choose a valid time frame.";
        return;
    }

    const totalHours = parseFloat(prompt("How many hours do you think the whole goal will take to complete?"));
    const dailyHours = parseFloat(prompt("How many hours per day can you work on this goal?"));
    const dailyTasks = Math.ceil(totalHours / dailyHours);

    document.getElementById("task-output").innerHTML = `
        <h2>Goal Breakdown</h2>
        <p>Goal: ${goal}</p>
        <p>Duration: ${days} days</p>
        <p>Daily Workload: ${dailyTasks} tasks per day</p>
    `;

    divideGoalIntoTasks(goal, days, dailyTasks, startDate);
}

// Function to Add Events to Google Calendar
function addToGoogleCalendar(taskName, taskDate) {
    const event = {
        summary: taskName,
        start: {
            dateTime: taskDate.toISOString(),
            timeZone: 'America/New_York'
        },
        end: {
            dateTime: new Date(taskDate.getTime() + 60 * 60 * 1000).toISOString(),
            timeZone: 'America/New_York'
        },
    };

    gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
    }).then(response => {
        console.log('Event created:', response);
    }).catch(error => console.log('Error creating event:', error));
}

// Example task division logic (customize as needed)
function divideGoalIntoTasks(goal, days, dailyTasks, startDate) {
    for (let i = 1; i <= days; i++) {
        const taskDate = new Date(startDate);
        taskDate.setDate(taskDate.getDate() + i - 1);

        const taskName = `Day ${i}: ${goal}`;

        addToGoogleCalendar(taskName, taskDate);

        document.getElementById("task-output").innerHTML += `<p>${taskName} on ${taskDate.toDateString()}</p>`;
    }
}
