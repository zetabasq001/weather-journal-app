/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=92f2bfc4f07c3ec685481edf7d16a935&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// get weather data promise chain: fetch, response, post, get and update UI
const getWeatherData = async () => {
    // obtain zip code from user to build full url
    const zipcode = document.getElementById('zip').value;
    const url = baseUrl + zipcode + apiKey;

    // fetch web data, then wait for response
    await fetch(url)
    .then(async response => await response.json())
    .then(async data => {
        // get user data and format project data
        const feelingsToday = document.getElementById('feelings').value;
        const objData = { temperature: data.main.temp, date: newDate, feelings: feelingsToday };

        // then post web data to server
        await fetch('/addToProjectData', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objData)
        })
        .then(updateUI())
        .catch(error => console.log('POST Error: ', error))
    })
    .catch(error => {
        console.log('GET Error: ', error);
        // zip code value empty, then alert user 
        if(zipcode === ''){
            alert('Enter zip code');
        }
    })
    .finally(() => document.getElementById('feelings').value = '');
};

// update UI by fetching project data from server, wait for response, and adding to DOM
const updateUI = async () => await fetch('/getProjectData')
.then(async response => await response.json())
.then(data => {
    document.getElementById('date').innerHTML = `Date: ${data.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(data.temperature)} degrees`;
    document.getElementById('content').innerHTML = `Feeling today: ${data.feelings}`;
})
.catch(error => console.log('UI Error: ', error))
.finally(() => {
    document.getElementById('feelings').value = '';
    document.getElementById('zip').value = '';
});

// event listener responds when generate button is clicked
const button = document.getElementById('generate');
button.addEventListener('click', getWeatherData); 
