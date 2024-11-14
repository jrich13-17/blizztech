function breakDownGoal() {
    // Get the goal and date inputs
    const goal = document.getElementById("goal").value;
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    
    // Calculate the number of days between start and end date
    const timeDiff = endDate - startDate;
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    // Check if dates are valid
    if (days <= 0 || isNaN(days)) {
        document.getElementById("task-output").innerText = "Please choose a valid time frame.";
        return;
    }

    // Display the result
    document.getElementById("task-output").innerHTML = `
        <h2>Your Goal: ${goal}</h2>
        <p>Time frame: ${days} days</p>
        <p>We'll divide this goal into daily tasks soon!</p>
    `;

    // Placeholder for task breakdown logic
    divideGoalIntoTasks(goal, days);
}

function breakDownGoal() {
    // Capture user inputs
    const goal = document.getElementById("goal").value;
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    const totalHours = parseFloat(prompt("How many hours do you think the whole goal will take to complete?"));
    const dailyHours = parseFloat(prompt("How many hours per day can you work on this goal?"));

    const timeDiff = endDate - startDate;
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 

    if (days <= 0 || isNaN(days)) {
        document.getElementById("task-output").innerText = "Please choose a valid time frame.";
        return;
    }

    // Calculate daily workload based on user input
    const dailyTasks = Math.ceil(totalHours / dailyHours);

    document.getElementById("task-output").innerHTML = `
        <h2>Goal Breakdown</h2>
        <p>Goal: ${goal}</p>
        <p>Duration: ${days} days</p>
        <p>Daily Workload: ${dailyTasks} tasks per day</p>
    `;

    divideGoalIntoTasks(goal, days, dailyTasks, startDate);
}

async function addToGoogleCalendar(taskName, taskDate) {
    // Define the event details
    const event = {
        summary: taskName,
        start: {
            dateTime: taskDate.toISOString(),
            timeZone: 'America/New_York' // Adjust based on your timezone
        },
        end: {
            dateTime: new Date(taskDate.getTime() + 60 * 60 * 1000).toISOString(), // Assume 1-hour tasks
            timeZone: 'America/New_York'
        },
    };

    // Google Calendar API request (You’ll need to authenticate)
    gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
    }).then(response => {
        console.log('Event created:', response);
    }).catch(error => console.log('Error creating event:', error));
}
function showInterest() {
    alert("Thank you for your interest! The calendar integration feature is coming soon.");
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'));
}
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <WebView source={{ uri: 'https://yourwebsite.com' }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
// Replace with your actual client ID and API key
const CLIENT_ID = "92182400022-h5mb0g8l23bf9hjk8ops7pvemqkaurds.apps.googleusercontent.com";
const API_KEY = "YOUR_API_KEY"; // Note: Create an API key in Google Console if not done

// Authorization scopes for Google Calendar
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// Initialize Google API client with your client_id
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
        // Check sign-in status
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            gapi.auth2.getAuthInstance().signIn();
        }
    }).catch(error => {
        console.error("Error during client initialization", error);
    });
}

// Load the client
handleClientLoad();
function addToGoogleCalendar(taskName, taskDate) {
    // Define the event details
    const event = {
        summary: taskName,
        start: {
            dateTime: taskDate.toISOString(),
            timeZone: 'America/New_York' // Replace with user's timezone as needed
        },
        end: {
            dateTime: new Date(taskDate.getTime() + 60 * 60 * 1000).toISOString(), // Example: 1-hour event
            timeZone: 'America/New_York'
        },
    };

    // Insert event into the user's primary calendar
    gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
    }).then(response => {
        console.log('Event created:', response);
    }).catch(error => console.log('Error creating event:', error));
}


