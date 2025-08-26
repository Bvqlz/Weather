const searchInput = document.querySelector(`input[type="text"]`);
const searchButton = document.querySelector('button');

async function findCity() {
    const cityInput = searchInput.value;
    const valid = validateCity(cityInput);

    if(!valid.isValid) {
        console.log(valid.error);
        return;
    }

    const city = valid.city;

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&key=TEBHLZ3JC98BNFH4R775VVRUM&contentType=json`;

    try {
        const response = await fetch(url, {mode: 'cors'});

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        getWeather(data);
    } catch(error) {
        console.error(error);
    }
}

function getWeather(data) {
    console.log("Location: ", data.resolvedAddress);

    data.days.forEach(function(day, index) {

        const formattedDate = formatDate(day.datetime, data.timezone);
        console.log(`Date: ${formattedDate}`);
        console.log("Description:", day.description);
        console.log("Temperature:", day.temp);
        console.log("Wind Speed:", day.windspeed);
        console.log("Precipitation Chance:", day.precipprob);
        console.log("Humidity:", day.humidity);
        console.log("");
    })
}

function formatDate(date, time) {
    const dateObject = new Date(date + 'T12:00:00');
    return dateObject.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: time
    });
}

function validateCity(city) {
    const trimCity = city.trim();

    if (!trimCity) {
        return {isValid: false, error: 'Please enter a city name'}
    }

    const cityRegex = /^[a-zA-Z\s\-'\.]+$/;
    if(!cityRegex.test(city)) {
        return {isValid: false, error: 'Please enter valid city'}
    }

    return {isValid: true, city: trimCity};
}

searchButton.addEventListener('click', findCity);

//findCity();
