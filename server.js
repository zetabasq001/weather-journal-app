// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
app.listen(port, () => {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
});

// server get route handler
app.get('/getProjectData', (req, res) => {
    res.send(projectData);
});

// server post route handler
app.post('/addToProjectData', (req, res) => {
    const data = req.body;
    
    // put project data in global endpoint
    projectData.temperature = data.temperature;
    projectData.date = data.date;
    projectData.feelings = data.feelings;
    
});
