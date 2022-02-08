/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=92f2bfc4f07c3ec685481edf7d16a935&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeatherData = async () => {
    const zipcode = document.getElementById('zip').value;
    const url = baseUrl + zipcode + apiKey;

    await fetch(url)
    .then(async response => await response.json())
    .then(async data => {
        const feelingsToday = document.getElementById('feelings').value;
        const objData = { temperature: data.main.temp, date: newDate, feelings: feelingsToday };

        await fetch('/addToProjectData', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objData)
        })
        .then(async response => await response.json())
        .then(data => {
            const lastElement = data.length - 1;
            document.getElementById('date').innerHTML = `Date: ${data[lastElement].date}`;
            document.getElementById('temp').innerHTML = `Temperature: ${Math.round(data[lastElement].temperature)}`;
            document.getElementById('content').innerHTML = `Feeling ${data[lastElement].feelings} today`;
            document.getElementById('feelings').value = '';
            document.getElementById('zip').value = '';
        })
        .catch(error => console.log('Post Error: ', error))
    })
    .catch(error => console.log('Get Error: ', error))

};

const button = document.getElementById('generate');
button.addEventListener('click', getWeatherData); 
