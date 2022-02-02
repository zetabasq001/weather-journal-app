const { get } = require("http");

/* Global Variables */
const baseUrl = 'api.openweathermap.org'

// Personal API Key for OpenWeatherMap API
const apiKey = '92f2bfc4f07c3ec685481edf7d16a935&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getTemperature = async url => {
    await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'applications/json',
        },
        body: JSON.stringify(data)
    })
    .then()
    
}

let zipcode = document.getElementById('zip').value;
let fullUrl = baseUrl + zipcode + apiKey;

const button = document.getElementById('generate');
button.addEventListener('click', getTemperature(fullUrl)); 