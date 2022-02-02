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
const { timeStamp } = require('console');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
const server = app.listen(port, () => {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
});

app.get('/', (req, res) => res.send(projectData));

app.post('/add', (req, res) => {
    const data = req.body;
    const objData = { temperature: data.temperature, date: data.date, userResponse: data.userResponse };
    return projectData.push(objData);
});
